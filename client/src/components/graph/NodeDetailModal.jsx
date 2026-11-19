import React from 'react';
import { X, ExternalLink, ShoppingBag, Sparkles, User, Package, Folder, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NodeDetailModal = ({ node, onClose, onFocusNode, onSimulatePurchase, onGetRecommendations }) => {
  if (!node) return null;
  const { switchCustomer } = useApp();
  const { data } = node;

  const entityType = data.entityType;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span
              className={`badge ${
                entityType === 'Customer'
                  ? 'badge-indigo'
                  : entityType === 'Product'
                  ? 'badge-emerald'
                  : entityType === 'Category'
                  ? 'badge-purple'
                  : 'badge-amber'
              }`}
            >
              {entityType} Node
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>ID: {data.id}</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--slate-400)' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
            {data.name}
          </h2>

          {/* Customer Specific Details */}
          {entityType === 'Customer' && (
            <div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                <img
                  src={data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                  alt={data.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
                  }}
                />
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{data.role}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>{data.email}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--primary-600)', marginTop: '0.2rem' }}>
                    {data.purchaseCount || 0} Total Purchases Recorded
                  </div>
                </div>
              </div>

              {data.preferredCategories && data.preferredCategories.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Preferred Categories (PREFERS +2 pts)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {data.preferredCategories.map((c, i) => (
                      <span key={i} className="badge badge-purple">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {data.interests && data.interests.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                    Customer Interests (INTERESTED_IN +3 pts)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {data.interests.map((it, i) => (
                      <span key={i} className="badge badge-amber">{it}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Product Specific Details */}
          {entityType === 'Product' && (
            <div>
              {data.image && (
                <img
                  src={data.image}
                  alt={data.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span className="badge badge-slate">{data.category}</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  ${data.price}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                {data.description || 'High-performance smart product integrated into the Knowledge Graph.'}
              </p>
            </div>
          )}

          {/* Category Details */}
          {entityType === 'Category' && (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                {data.description}
              </p>
              <div className="badge badge-purple">Slug: {data.slug}</div>
            </div>
          )}

          {/* Interest Details */}
          {entityType === 'Interest' && (
            <div>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem' }}>
                {data.description}
              </p>
              <div className="badge badge-amber">Affinity Domain: {data.categoryHint}</div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {entityType === 'Customer' && (
            <>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  switchCustomer(data);
                  onClose();
                }}
              >
                Set as Active Shopper
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  if (onGetRecommendations) onGetRecommendations(data.id);
                  onClose();
                }}
              >
                <Sparkles size={14} />
                <span>Generate Recommendations</span>
              </button>
            </>
          )}

          {entityType === 'Product' && (
            <button
              className="btn btn-emerald btn-sm"
              onClick={() => {
                if (onSimulatePurchase) onSimulatePurchase(data.id);
                onClose();
              }}
            >
              <ShoppingBag size={14} />
              <span>Simulate Purchase</span>
            </button>
          )}

          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NodeDetailModal;
