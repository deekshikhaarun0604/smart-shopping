import React from 'react';
import { GitCommit, ArrowRight, User, Package, Folder, Sparkles } from 'lucide-react';

const ReasoningPathViewer = ({ paths = [], scoreBreakdown = [] }) => {
  if (!paths || paths.length === 0) return null;

  // Helper to parse path strings like:
  // "Customer (Alex Rivera) → PURCHASED → ProBook 16 Laptop → HAS_ACCESSORY → Ergonomic Mouse"
  const parsePathTokens = (pathStr) => {
    return pathStr.split(' → ').map((token) => token.trim());
  };

  const getEntityIcon = (token) => {
    if (token.startsWith('Customer')) return <User size={12} />;
    if (token.startsWith('[') && token.endsWith(']')) return <Sparkles size={12} />;
    if (token.startsWith('{') && token.endsWith('}')) return <Folder size={12} />;
    return <Package size={12} />;
  };

  const getNodeClass = (token) => {
    if (token.startsWith('Customer')) return 'customer';
    if (token.startsWith('[') && token.endsWith(']')) return 'interest';
    if (token.startsWith('{') && token.endsWith('}')) return 'category';
    return 'product';
  };

  const isEdgeToken = (token) => {
    return [
      'PURCHASED',
      'HAS_ACCESSORY',
      'RELATED_TO',
      'INTERESTED_IN',
      'MATCHES_INTEREST',
      'PREFERS',
      'BELONGS_TO'
    ].includes(token) || token.startsWith('←') || token.startsWith('→');
  };

  return (
    <div className="reasoning-path-box">
      <div className="reasoning-path-title">
        <GitCommit size={14} />
        <span>Graph Reasoning Paths ({paths.length} Active Traversal{paths.length > 1 ? 's' : ''})</span>
      </div>

      <div className="path-steps-container">
        {paths.map((pathStr, idx) => {
          const tokens = parsePathTokens(pathStr);
          return (
            <div key={idx} className="path-chain">
              {tokens.map((token, tIdx) => {
                const cleanToken = token.replace('← ', '').replace('→ ', '');
                if (isEdgeToken(cleanToken)) {
                  return (
                    <React.Fragment key={tIdx}>
                      <span className={`path-edge ${cleanToken}`}>
                        {cleanToken}
                      </span>
                      <ArrowRight size={12} style={{ color: 'var(--slate-400)' }} />
                    </React.Fragment>
                  );
                }

                return (
                  <span key={tIdx} className={`path-node ${getNodeClass(cleanToken)}`}>
                    {getEntityIcon(cleanToken)}
                    <span>{cleanToken}</span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReasoningPathViewer;
