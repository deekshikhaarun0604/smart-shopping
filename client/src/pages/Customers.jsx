import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Network,
  ShoppingBag,
  Heart,
  Folder,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Customers = ({ setCurrentPage, setFocusedCustomerId }) => {
  const { customers, activeCustomer, switchCustomer } = useApp();

  return (
    <div className="page-container">
      {/* Intro Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', maxWidth: '800px' }}>
          Select any of the 8 demo personas to inspect their semantic profile, past purchases, preferred categories, and interests. Each customer's unique profile triggers different graph traversal paths and recommendations.
        </p>
      </div>

      <div className="customers-grid">
        {customers.map((c) => {
          const isActive = activeCustomer && activeCustomer._id === c._id;
          const purchaseCount = c.purchaseHistory?.length || 0;

          return (
            <div
              key={c._id}
              className="customer-card"
              style={{
                border: isActive ? '2px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                backgroundColor: isActive ? '#ffffff' : '#ffffff',
                boxShadow: isActive ? '0 8px 24px rgba(99, 102, 241, 0.15)' : 'var(--shadow-sm)'
              }}
            >
              <div className="customer-card-header">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="customer-card-avatar"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'space-between' }}>
                    <h3 className="customer-card-name">{c.name}</h3>
                    {isActive && (
                      <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                        Active Shopper
                      </span>
                    )}
                  </div>
                  <div className="customer-card-role">{c.role}</div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--slate-400)' }}>{c.email}</div>
                </div>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.4 }}>
                {c.bio}
              </p>

              {/* Preferred Categories */}
              <div style={{ marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Preferred Categories (PREFERS +2)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {c.preferredCategories?.map((cat, i) => (
                    <span key={i} className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customer Interests */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Interests (INTERESTED_IN +3)
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {c.interests?.map((it, i) => (
                    <span key={i} className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>

              {/* Purchase History */}
              <div style={{ marginBottom: '1.25rem', flex: 1 }}>
                <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Purchase History ({purchaseCount} Item{purchaseCount === 1 ? '' : 's'})
                </div>
                {purchaseCount === 0 ? (
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontStyle: 'italic' }}>
                    No purchases yet. Simulate purchase in Shop.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {c.purchaseHistory.map((p, pIdx) => (
                      <div
                        key={pIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.4rem 0.6rem',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#f8fafc',
                          fontSize: '0.775rem'
                        }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--slate-700)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.productName || p.product?.name || 'Product'}
                        </span>
                        <span style={{ fontWeight: 700, color: '#059669', flexShrink: 0 }}>
                          ${p.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      switchCustomer(c);
                    }}
                    className={`btn btn-sm ${isActive ? 'btn-secondary' : 'btn-primary'}`}
                    style={{ flex: 1 }}
                  >
                    {isActive ? 'Current Shopper' : 'Select Shopper'}
                  </button>

                  <button
                    onClick={() => {
                      switchCustomer(c);
                      if (setFocusedCustomerId) setFocusedCustomerId(c._id);
                      setCurrentPage('graph');
                    }}
                    className="btn btn-secondary btn-sm"
                    title="View this customer's subgraph"
                  >
                    <Network size={14} />
                    <span>Graph</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    switchCustomer(c);
                    setCurrentPage('recommendations');
                  }}
                  className="btn btn-emerald btn-sm"
                  style={{ width: '100%' }}
                >
                  <Sparkles size={14} />
                  <span>Generate Recommendations</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Customers;
