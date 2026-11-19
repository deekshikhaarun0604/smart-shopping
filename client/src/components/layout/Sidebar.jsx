import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Network,
  Sparkles,
  BookOpen,
  Boxes
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/shop', label: 'Shop Catalog', icon: ShoppingBag },
    { path: '/customers', label: 'Customers', icon: Users },
    { path: '/graph', label: 'Graph Explorer', icon: Network },
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/how-it-works', label: 'How It Works', icon: BookOpen }
  ];

  const isItemActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-badge">
          <Boxes size={12} />
          <span>Knowledge to Intelligence</span>
        </div>
        <div className="brand-title">
          <div className="brand-icon">
            <Network size={20} />
          </div>
          <span>SmartShop</span>
        </div>
        <p className="brand-tagline">
          Transforming Information into Intelligent Solutions
        </p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-link ${active ? 'active' : ''}`}
            >
              <Icon className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="academic-badge">
          <strong>College Demonstration</strong>
          <span>Semantic Graph Reasoning & Multi-Factor Scoring Engine</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
