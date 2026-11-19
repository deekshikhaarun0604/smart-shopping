import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import Customers from './pages/Customers';
import KnowledgeGraphExplorer from './pages/KnowledgeGraphExplorer';
import Recommendations from './pages/Recommendations';
import HowItWorks from './pages/HowItWorks';

import { CheckCircle2, AlertCircle, Info, RefreshCw } from 'lucide-react';

// Error Boundary Component to prevent full blank screen crashes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[SmartShop UI Error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-container" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <AlertCircle size={48} style={{ color: '#e11d48', margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#9f1239', marginBottom: '0.75rem' }}>
              Something went wrong loading this view
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#be123c', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="btn btn-primary"
            >
              <RefreshCw size={16} />
              <span>Reload Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const MainApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [focusedCustomerId, setFocusedCustomerId] = useState('');
  const { notification } = useApp();

  const getPageMeta = () => {
    const path = location.pathname.toLowerCase();
    if (path === '/' || path === '/dashboard') {
      return {
        title: 'System Dashboard',
        subtitle: 'Knowledge Graph metrics, popular product nodes, and recommendation engine activities'
      };
    }
    if (path.startsWith('/shop')) {
      return {
        title: 'SmartShop Catalog',
        subtitle: 'Simulate customer product purchases and observe real-time graph evolution'
      };
    }
    if (path.startsWith('/customers')) {
      return {
        title: 'Demo Customer Directory',
        subtitle: 'Demographics, preferred categories, interests, and individual purchase logs'
      };
    }
    if (path.startsWith('/graph')) {
      return {
        title: 'Knowledge Graph Explorer',
        subtitle: 'Interactive React Flow visualization of nodes, semantic predicates, and multi-hop paths'
      };
    }
    if (path.startsWith('/recommendations')) {
      return {
        title: 'Intelligent Recommendations',
        subtitle: 'Rule-based traversal, candidate scoring matrix, and visual reasoning paths'
      };
    }
    if (path.startsWith('/how-it-works')) {
      return {
        title: 'Academic Walkthrough: Information into Intelligence',
        subtitle: 'Educational principles of semantic knowledge representation and graph decision systems'
      };
    }
    return {
      title: 'SmartShop',
      subtitle: 'Knowledge Graph-Based Product Recommendation System'
    };
  };

  const { title, subtitle } = getPageMeta();

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 9999,
            backgroundColor:
              notification.type === 'success'
                ? '#ecfdf5'
                : notification.type === 'error'
                ? '#fff1f2'
                : '#eef2ff',
            color:
              notification.type === 'success'
                ? '#065f46'
                : notification.type === 'error'
                ? '#9f1239'
                : '#3730a3',
            border: `1px solid ${
              notification.type === 'success'
                ? '#a7f3d0'
                : notification.type === 'error'
                ? '#fecdd3'
                : '#c7d2fe'
            }`,
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.15rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          {notification.type === 'success' && <CheckCircle2 size={18} />}
          {notification.type === 'error' && <AlertCircle size={18} />}
          {notification.type === 'info' && <Info size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="main-wrapper">
        <Header pageTitle={title} pageSubtitle={subtitle} />

        <main style={{ flex: 1 }}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Dashboard setCurrentPage={(p) => navigate(p === 'dashboard' ? '/' : `/${p}`)} />} />
              <Route path="/dashboard" element={<Dashboard setCurrentPage={(p) => navigate(p === 'dashboard' ? '/' : `/${p}`)} />} />
              <Route path="/shop" element={<Shop setCurrentPage={(p) => navigate(`/${p}`)} />} />
              <Route
                path="/customers"
                element={
                  <Customers
                    setCurrentPage={(p) => navigate(`/${p}`)}
                    setFocusedCustomerId={setFocusedCustomerId}
                  />
                }
              />
              <Route
                path="/graph"
                element={
                  <KnowledgeGraphExplorer
                    setCurrentPage={(p) => navigate(`/${p}`)}
                    focusedCustomerId={focusedCustomerId}
                    setFocusedCustomerId={setFocusedCustomerId}
                  />
                }
              />
              <Route path="/recommendations" element={<Recommendations setCurrentPage={(p) => navigate(`/${p}`)} />} />
              <Route path="/how-it-works" element={<HowItWorks setCurrentPage={(p) => navigate(`/${p}`)} />} />
              {/* Catch-all route redirects to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;
