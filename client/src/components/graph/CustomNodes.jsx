import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { User, Package, Folder, Sparkles } from 'lucide-react';

export const CustomerNode = memo(({ data }) => {
  return (
    <div className="custom-node node-customer">
      <Handle type="target" position={Position.Left} style={{ background: '#6366f1' }} />
      <div className="node-header">
        <div className="node-icon-badge">
          <User size={14} />
        </div>
        <div>
          <div className="node-type-label">Customer</div>
          <div className="node-title" title={data.name}>{data.name}</div>
        </div>
      </div>
      <div className="node-subtitle">{data.role || 'Shopper'}</div>
      <div className="node-meta">
        <span style={{ color: '#4f46e5' }}>{data.purchaseCount || 0} Purchases</span>
        <span style={{ color: '#64748b' }}>{data.interests?.length || 0} Interests</span>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#6366f1' }} />
    </div>
  );
});

export const ProductNode = memo(({ data }) => {
  return (
    <div className="custom-node node-product">
      <Handle type="target" position={Position.Left} style={{ background: '#10b981' }} />
      <div className="node-header">
        <div className="node-icon-badge">
          <Package size={14} />
        </div>
        <div>
          <div className="node-type-label">Product</div>
          <div className="node-title" title={data.name}>{data.name}</div>
        </div>
      </div>
      <div className="node-subtitle">{data.category}</div>
      <div className="node-meta">
        <span style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 800 }}>${data.price}</span>
        <span style={{ color: '#d97706' }}>★ {data.rating || '4.5'}</span>
      </div>
      <Handle type="source" position={Position.Right} style={{ background: '#10b981' }} />
    </div>
  );
});

export const CategoryNode = memo(({ data }) => {
  return (
    <div className="custom-node node-category">
      <Handle type="target" position={Position.Left} style={{ background: '#8b5cf6' }} />
      <div className="node-header">
        <div className="node-icon-badge">
          <Folder size={14} />
        </div>
        <div>
          <div className="node-type-label">Category</div>
          <div className="node-title" title={data.name}>{data.name}</div>
        </div>
      </div>
      <div className="node-subtitle" style={{ fontSize: '0.7rem' }}>Domain Taxonomy</div>
      <Handle type="source" position={Position.Right} style={{ background: '#8b5cf6' }} />
    </div>
  );
});

export const InterestNode = memo(({ data }) => {
  return (
    <div className="custom-node node-interest">
      <Handle type="target" position={Position.Left} style={{ background: '#f59e0b' }} />
      <div className="node-header">
        <div className="node-icon-badge">
          <Sparkles size={14} />
        </div>
        <div>
          <div className="node-type-label">Interest</div>
          <div className="node-title" title={data.name}>{data.name}</div>
        </div>
      </div>
      <div className="node-subtitle">{data.categoryHint || 'Lifestyle Affinity'}</div>
      <Handle type="source" position={Position.Right} style={{ background: '#f59e0b' }} />
    </div>
  );
});
