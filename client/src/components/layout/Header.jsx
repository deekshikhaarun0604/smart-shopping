import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Database, RefreshCw, ChevronDown, CheckCircle, AlertTriangle } from 'lucide-react';

const Header = ({ pageTitle, pageSubtitle }) => {
  const {
    customers,
    activeCustomer,
    switchCustomer,
    dbStatus,
    isSeeding,
    handleSeed
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="top-header">
      <div className="header-left">
        <div className="page-title-group">
          <h1>{pageTitle}</h1>
          <p>{pageSubtitle}</p>
        </div>
      </div>

      <div className="header-right">
        {/* DB Status Badge */}
        <div
          className={`db-status-badge ${dbStatus.isConnected ? 'connected' : 'disconnected'}`}
          title={dbStatus.isConnected ? 'MongoDB Connected' : dbStatus.setupInstructions}
        >
          <span className="pulse-dot" />
          <span>{dbStatus.isConnected ? 'MongoDB Active' : 'MongoDB Offline'}</span>
        </div>

        {/* Reseed Button */}
        <button
          onClick={handleSeed}
          disabled={isSeeding}
          className="btn btn-secondary btn-sm"
          title="Reset and repopulate demo Knowledge Graph data"
        >
          <RefreshCw size={14} className={isSeeding ? 'spin' : ''} />
          <span>{isSeeding ? 'Seeding...' : 'Reset Data'}</span>
        </button>

        {/* Active Customer Selector */}
        {activeCustomer && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="customer-selector-pill"
            >
              <img
                src={activeCustomer.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={activeCustomer.name}
                className="customer-avatar-sm"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
                }}
              />
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--slate-900)' }}>
                  {activeCustomer.name}
                </div>
                <div style={{ fontSize: '0.675rem', color: 'var(--slate-500)' }}>
                  Active Shopper
                </div>
              </div>
              <ChevronDown size={14} style={{ color: 'var(--slate-400)' }} />
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  width: '240px',
                  zIndex: 50,
                  padding: '0.5rem',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              >
                <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.725rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase' }}>
                  Switch Shopper Persona
                </div>
                {customers.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => {
                      switchCustomer(c);
                      setDropdownOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      width: '100%',
                      padding: '0.5rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: c._id === activeCustomer._id ? 'var(--primary-50)' : 'transparent',
                      color: c._id === activeCustomer._id ? 'var(--primary-700)' : 'var(--slate-700)',
                      textAlign: 'left'
                    }}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.8rem' }}>{c.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)' }}>{c.role}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
