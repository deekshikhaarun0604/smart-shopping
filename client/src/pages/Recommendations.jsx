import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { generateRecommendations, simulatePurchase } from '../services/api';
import { useApp } from '../context/AppContext';
import ReasoningPathViewer from '../components/recommendations/ReasoningPathViewer';
import ScoreBreakdown from '../components/recommendations/ScoreBreakdown';

const Recommendations = ({ setCurrentPage }) => {
  const { customers, activeCustomer, switchCustomer, refreshAppState, showNotification } = useApp();

  const [recommendationResult, setRecommendationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [purchasingProductId, setPurchasingProductId] = useState(null);

  // Algorithm weights tuning
  const [showWeightTuner, setShowWeightTuner] = useState(false);
  const [weights, setWeights] = useState({
    accessory: 5,
    related: 4,
    interest: 3,
    category: 2
  });

  const fetchRecommendations = async (customerId, currentWeights = weights) => {
    if (!customerId) return;
    try {
      setLoading(true);
      const res = await generateRecommendations(customerId, currentWeights);
      setRecommendationResult(res);
    } catch (err) {
      console.warn('Recommendation generation failed:', err.message);
      showNotification(
        err.response?.data?.message || err.message || 'Could not generate recommendations',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCustomer) {
      fetchRecommendations(activeCustomer._id, weights);
    }
  }, [activeCustomer]);

  const handleWeightChange = (key, val) => {
    const updated = { ...weights, [key]: Number(val) };
    setWeights(updated);
    if (activeCustomer) {
      fetchRecommendations(activeCustomer._id, updated);
    }
  };

  const handleResetWeights = () => {
    const defaults = { accessory: 5, related: 4, interest: 3, category: 2 };
    setWeights(defaults);
    if (activeCustomer) {
      fetchRecommendations(activeCustomer._id, defaults);
    }
  };

  const handlePurchase = async (product) => {
    if (!activeCustomer) return;
    setPurchasingProductId(product._id);
    try {
      await simulatePurchase(activeCustomer._id, product._id);
      showNotification(
        `Purchased "${product.name}"! Recommendations recalculated dynamically.`,
        'success'
      );
      await refreshAppState();
      // Recalculate recommendations
      await fetchRecommendations(activeCustomer._id, weights);
    } catch (err) {
      showNotification(err.response?.data?.message || err.message, 'error');
    } finally {
      setPurchasingProductId(null);
    }
  };

  return (
    <div className="page-container">
      {/* Customer Selector & Generation Header */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          marginBottom: '1.75rem',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Intelligent Product Recommendations
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
              Select any customer below to execute graph traversal algorithms and generate explainable suggestions.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button
              onClick={() => setShowWeightTuner(!showWeightTuner)}
              className="btn btn-secondary btn-sm"
              title="Tune traversal scoring weights"
            >
              <Sliders size={14} />
              <span>{showWeightTuner ? 'Hide Weights' : 'Tune Scoring Weights'}</span>
              {showWeightTuner ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            <button
              onClick={() => fetchRecommendations(activeCustomer?._id, weights)}
              disabled={loading || !activeCustomer}
              className="btn btn-primary btn-sm"
            >
              <Sparkles size={14} />
              <span>{loading ? 'Traversing Graph...' : 'Re-run Engine'}</span>
            </button>
          </div>
        </div>

        {/* Customer Selector Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)' }}>
            Select Customer:
          </span>
          {customers.map((c) => {
            const isSelected = activeCustomer && activeCustomer._id === c._id;
            return (
              <button
                key={c._id}
                onClick={() => switchCustomer(c)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.775rem',
                  fontWeight: 600,
                  backgroundColor: isSelected ? 'var(--primary-600)' : 'var(--slate-100)',
                  color: isSelected ? '#ffffff' : 'var(--slate-700)',
                  border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.15s ease'
                }}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/></svg>';
                  }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Algorithm Weights Tuning Panel */}
        {showWeightTuner && (
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: '#f8fafc',
              borderRadius: 'var(--radius-md)',
              padding: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-800)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Algorithm Scoring Matrix (Rule Weights)
              </div>
              <button onClick={handleResetWeights} className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }}>
                <RotateCcw size={12} />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: '0.3rem' }}>
                  HAS_ACCESSORY (Pts: {weights.accessory})
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.accessory}
                  onChange={(e) => handleWeightChange('accessory', e.target.value)}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Accessories of purchased items</span>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: '0.3rem' }}>
                  RELATED_TO (Pts: {weights.related})
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.related}
                  onChange={(e) => handleWeightChange('related', e.target.value)}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Complementary related products</span>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: '0.3rem' }}>
                  INTERESTED_IN (Pts: {weights.interest})
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.interest}
                  onChange={(e) => handleWeightChange('interest', e.target.value)}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>Matches customer interest tags</span>
              </div>

              <div>
                <label style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--slate-700)', display: 'block', marginBottom: '0.3rem' }}>
                  PREFERS Category (Pts: {weights.category})
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={weights.category}
                  onChange={(e) => handleWeightChange('category', e.target.value)}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>In customer preferred category</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer Context Status Bar */}
      {recommendationResult && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            padding: '0.75rem 1rem',
            backgroundColor: '#f1f5f9',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.825rem',
            color: 'var(--slate-700)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div>
            Generated <strong>{recommendationResult.totalRecommendations}</strong> ranked candidate products for{' '}
            <strong style={{ color: 'var(--primary-700)' }}>{recommendationResult.customer.name}</strong>.
          </div>
          <div style={{ color: 'var(--slate-500)', fontSize: '0.775rem' }}>
            {recommendationResult.customer.purchasedProductsCount} previously purchased product(s) strictly excluded from recommendations.
          </div>
        </div>
      )}

      {/* Recommendations List */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--slate-500)' }}>
          <Sparkles size={32} className="spin" style={{ color: 'var(--primary-600)', marginBottom: '0.75rem' }} />
          <div style={{ fontWeight: 600 }}>Executing Graph Traversal and Path Scoring...</div>
        </div>
      ) : !recommendationResult || recommendationResult.recommendations.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--slate-500)' }}>
          No recommendations found. Try adjusting the scoring rules or adding interests.
        </div>
      ) : (
        <div>
          {recommendationResult.recommendations.map((rec) => {
            const isBuying = purchasingProductId === rec.product._id;

            return (
              <div key={rec.product._id} className="rec-card">
                <div className="rec-header-row">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span className="rec-rank-badge">#{rec.rank}</span>
                    <img
                      src={rec.product.image}
                      alt={rec.product.name}
                      style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cbd5e1"><rect width="24" height="24"/></svg>';
                      }}
                    />
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                        {rec.product.name}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                        {rec.product.category} • <strong style={{ color: '#059669' }}>${rec.product.price}</strong>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="rec-score-pill">
                      <TrendingUp size={16} />
                      <span>{rec.totalScore} Points</span>
                    </div>

                    <button
                      onClick={() => handlePurchase(rec.product)}
                      disabled={isBuying}
                      className="btn btn-emerald btn-sm"
                    >
                      <ShoppingBag size={14} />
                      <span>{isBuying ? 'Simulating...' : 'Buy Product'}</span>
                    </button>
                  </div>
                </div>

                {/* Plain-language Summary Reason */}
                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--slate-700)', fontWeight: 500 }}>
                  💡 <strong>Reason for recommendation:</strong> {rec.summaryReason}
                </div>

                {/* Score Breakdown Tags */}
                <ScoreBreakdown
                  scoreBreakdown={rec.scoreBreakdown}
                  totalScore={rec.totalScore}
                />

                {/* Visual Graph Reasoning Paths */}
                <ReasoningPathViewer
                  paths={rec.reasoningPaths}
                  scoreBreakdown={rec.scoreBreakdown}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
