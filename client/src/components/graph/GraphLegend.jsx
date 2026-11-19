import React from 'react';

const GraphLegend = () => {
  return (
    <div className="graph-legend-panel">
      <div className="legend-title">Graph Entity Types</div>
      <div className="legend-grid" style={{ marginBottom: '0.6rem' }}>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#6366f1' }}></span>
          <span>Customer</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
          <span>Product</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#8b5cf6' }}></span>
          <span>Category</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>Interest</span>
        </div>
      </div>

      <div className="legend-title">Semantic Relationships</div>
      <div className="legend-grid">
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
          <span>PURCHASED (+5)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#6366f1' }}></span>
          <span>HAS_ACCESSORY (+5)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#8b5cf6' }}></span>
          <span>RELATED_TO (+4)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#f59e0b' }}></span>
          <span>INTERESTED_IN (+3)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#06b6d4' }}></span>
          <span>PREFERS (+2)</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ backgroundColor: '#64748b' }}></span>
          <span>BELONGS_TO</span>
        </div>
      </div>
    </div>
  );
};

export default GraphLegend;
