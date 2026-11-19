import React, { useState, useEffect } from 'react';
import {
  Package,
  Users,
  Folder,
  Network,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { getDashboardStats } from '../services/api';
import { useApp } from '../context/AppContext';

const Dashboard = ({ setCurrentPage }) => {
  const { activeCustomer, switchCustomer, dbStatus, handleSeed, isSeeding } = useApp();
  const [stats, setStats] = useState(null);
  const [popularProducts, setPopularProducts] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        if (data.success) {
          setStats(data.stats);
          setPopularProducts(data.popularProducts || []);
          setRecentPurchases(data.recentPurchases || []);
        }
      } catch (err) {
        console.warn('Could not load dashboard stats:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="page-container">
      {/* Database Connection Notice if degraded */}
      {!dbStatus.isConnected && (
        <div
          style={{
            backgroundColor: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '1.75rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <AlertCircle size={22} style={{ color: '#e11d48', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#9f1239', marginBottom: '0.25rem' }}>
              MongoDB Server Offline or Unreachable
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#be123c', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              {dbStatus.setupInstructions || 'Start your local MongoDB service (e.g. `mongod --dbpath ./data/db`), then click Seed Database below.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSeed}
                disabled={isSeeding}
                className="btn btn-sm btn-primary"
              >
                {isSeeding ? 'Connecting & Seeding...' : 'Retry & Seed Database'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* College Activity Hero Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.25rem',
          color: '#ffffff',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(4px)',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={13} />
            College Knowledge to Intelligence Activity
          </div>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
            Transforming Information into Intelligent Solutions
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#e0e7ff', lineHeight: 1.5, marginBottom: '1.5rem' }}>
            SmartShop demonstrates how knowledge representation through a Knowledge Graph connects customer demographics, interests, purchase history, and product ontology to generate transparent, explainable recommendations.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <button
              onClick={() => setCurrentPage('recommendations')}
              className="btn btn-emerald"
            >
              <Sparkles size={16} />
              <span>Generate Recommendations</span>
            </button>
            <button
              onClick={() => setCurrentPage('graph')}
              className="btn btn-secondary"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)', color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.25)' }}
            >
              <Network size={16} />
              <span>Explore Knowledge Graph</span>
            </button>
            <button
              onClick={() => setCurrentPage('how-it-works')}
              className="btn btn-secondary"
              style={{ backgroundColor: 'transparent', color: '#ffffff', borderColor: 'transparent' }}
            >
              <HelpCircle size={16} />
              <span>Algorithm Walkthrough</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
            <Package size={24} />
          </div>
          <div>
            <div className="stat-val">{stats?.totalProducts ?? 24}</div>
            <div className="stat-label">Catalog Products</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#059669' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="stat-val">{stats?.totalCustomers ?? 8}</div>
            <div className="stat-label">Demo Customers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#f5f3ff', color: '#7c3aed' }}>
            <Folder size={24} />
          </div>
          <div>
            <div className="stat-val">{stats?.totalCategories ?? 6}</div>
            <div className="stat-label">Product Categories</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            <Network size={24} />
          </div>
          <div>
            <div className="stat-val">{stats?.totalRelationships ?? 84}</div>
            <div className="stat-label">Graph Semantic Edges</div>
          </div>
        </div>
      </div>

      {/* Workflow Process Cards */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <div>
            <h3 className="card-title">Recommendation Engine Process Overview</h3>
            <p className="card-subtitle">
              How raw e-commerce information is converted into intelligent, explainable decisions
            </p>
          </div>
          <span className="badge badge-indigo">Multi-Hop Traversal</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.35rem' }}>STEP 1</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>Customer Context</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: 1.4 }}>
              System identifies the customer node, past purchases, preferred categories, and lifestyle interests.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.35rem' }}>STEP 2</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>Graph Traversal</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: 1.4 }}>
              Explores 1-hop and 2-hop paths: accessories of purchased items, related products, and category affinities.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.35rem' }}>STEP 3</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>Deterministic Scoring</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: 1.4 }}>
              Evaluates candidates using weighted rules (+5 accessory, +4 related, +3 interest, +2 category) and excludes owned items.
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-600)', marginBottom: '0.35rem' }}>STEP 4</div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.35rem' }}>Explainable Delivery</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', lineHeight: 1.4 }}>
              Presents ranked recommendations with human-readable visual reasoning paths tracing back to the customer.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Popular Products & Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {/* Popular Products */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Graph Nodes (Popular Products)</h3>
              <p className="card-subtitle">Highest connectivity and customer ratings</p>
            </div>
            <button onClick={() => setCurrentPage('shop')} className="btn btn-secondary btn-sm">
              <span>View All</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {popularProducts.map((p) => (
              <div
                key={p._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '0.6rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cbd5e1"><rect width="24" height="24"/></svg>';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    {p.category}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                    ${p.price}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#d97706', fontWeight: 600 }}>
                    ★ {p.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Purchases & Simulated Activities */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Recent Graph Activities</h3>
              <p className="card-subtitle">Simulated purchases and new semantic links</p>
            </div>
            <span className="badge badge-emerald">Live Stream</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {recentPurchases.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--slate-400)', fontSize: '0.875rem' }}>
                No purchases simulated yet. Go to Shop Catalog to simulate customer purchases!
              </div>
            ) : (
              recentPurchases.map((pur) => (
                <div
                  key={pur._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: '0.6rem',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#ecfdf5',
                      color: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <ShoppingBag size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.825rem' }}>
                      <strong>{pur.customerName}</strong> purchased <em>{pur.productName}</em>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>
                      {new Date(pur.purchaseDate).toLocaleDateString()} • PURCHASED edge added to graph
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#059669' }}>
                    +${pur.price}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
