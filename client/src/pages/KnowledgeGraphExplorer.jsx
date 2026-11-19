import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import {
  Network,
  RotateCcw,
  Maximize2,
  Filter,
  Users,
  Package,
  Folder,
  Sparkles,
  Info
} from 'lucide-react';

import {
  CustomerNode,
  ProductNode,
  CategoryNode,
  InterestNode
} from '../components/graph/CustomNodes';
import GraphLegend from '../components/graph/GraphLegend';
import NodeDetailModal from '../components/graph/NodeDetailModal';
import { getGraphData, simulatePurchase } from '../services/api';
import { useApp } from '../context/AppContext';

const KnowledgeGraphExplorer = ({ setCurrentPage, focusedCustomerId, setFocusedCustomerId }) => {
  const { customers, activeCustomer, switchCustomer, refreshAppState, showNotification } = useApp();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = useState(true);
  const [graphStats, setGraphStats] = useState(null);

  // Filters
  const [selectedCustomerFilter, setSelectedCustomerFilter] = useState(focusedCustomerId || '');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('');
  const [selectedNodeForModal, setSelectedNodeForModal] = useState(null);

  const nodeTypes = useMemo(
    () => ({
      customerNode: CustomerNode,
      productNode: ProductNode,
      categoryNode: CategoryNode,
      interestNode: InterestNode
    }),
    []
  );

  const loadGraph = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCustomerFilter) {
        params.customerId = selectedCustomerFilter;
      } else if (selectedTypeFilter) {
        params.entityType = selectedTypeFilter;
      }

      const res = await getGraphData(params);
      if (res.success) {
        setNodes(res.nodes || []);
        setEdges(res.edges || []);
        setGraphStats(res.stats || null);
      }
    } catch (err) {
      console.warn('Failed to load graph data:', err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCustomerFilter, selectedTypeFilter, setNodes, setEdges]);

  useEffect(() => {
    loadGraph();
  }, [loadGraph]);

  const handleNodeClick = (event, node) => {
    setSelectedNodeForModal(node);
  };

  const handleResetFilters = () => {
    setSelectedCustomerFilter('');
    setSelectedTypeFilter('');
    if (setFocusedCustomerId) setFocusedCustomerId('');
  };

  const handleSimulatePurchaseFromModal = async (productId) => {
    if (!activeCustomer) return;
    try {
      await simulatePurchase(activeCustomer._id, productId);
      showNotification('Purchase recorded and new graph edge inserted!', 'success');
      await refreshAppState();
      await loadGraph();
    } catch (err) {
      showNotification(err.response?.data?.message || err.message, 'error');
    }
  };

  const handleGetRecommendationsFromModal = (customerId) => {
    const cust = customers.find((c) => c._id === customerId);
    if (cust) switchCustomer(cust);
    setCurrentPage('recommendations');
  };

  return (
    <div className="page-container full-width">
      <div className="graph-page-wrapper">
        {/* Top Control Bar */}
        <div className="graph-top-bar">
          <div className="graph-filter-group">
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Filter size={14} /> Filter Subgraph:
            </span>

            {/* Customer Focus Filter */}
            <select
              value={selectedCustomerFilter}
              onChange={(e) => {
                setSelectedCustomerFilter(e.target.value);
                setSelectedTypeFilter('');
              }}
              style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
            >
              <option value="">Show Entire Knowledge Graph</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  Focus on {c.name}'s Subgraph
                </option>
              ))}
            </select>

            {/* Entity Type Filter */}
            {!selectedCustomerFilter && (
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button
                  onClick={() => setSelectedTypeFilter('')}
                  className={`graph-filter-btn ${!selectedTypeFilter ? 'active' : ''}`}
                >
                  All Entities
                </button>
                <button
                  onClick={() => setSelectedTypeFilter('Customer')}
                  className={`graph-filter-btn ${selectedTypeFilter === 'Customer' ? 'active' : ''}`}
                >
                  Customers
                </button>
                <button
                  onClick={() => setSelectedTypeFilter('Product')}
                  className={`graph-filter-btn ${selectedTypeFilter === 'Product' ? 'active' : ''}`}
                >
                  Products
                </button>
                <button
                  onClick={() => setSelectedTypeFilter('Category')}
                  className={`graph-filter-btn ${selectedTypeFilter === 'Category' ? 'active' : ''}`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setSelectedTypeFilter('Interest')}
                  className={`graph-filter-btn ${selectedTypeFilter === 'Interest' ? 'active' : ''}`}
                >
                  Interests
                </button>
              </div>
            )}

            {(selectedCustomerFilter || selectedTypeFilter) && (
              <button onClick={handleResetFilters} className="btn btn-secondary btn-sm">
                <RotateCcw size={12} />
                <span>Reset View</span>
              </button>
            )}
          </div>

          {/* Stats on Current View */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.775rem', color: 'var(--slate-600)' }}>
            <span>
              <strong>{nodes.length}</strong> Nodes Rendered
            </span>
            <span>•</span>
            <span>
              <strong>{edges.length}</strong> Semantic Edges
            </span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="react-flow-wrapper">
          {loading ? (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                zIndex: 20
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Network size={36} className="spin" style={{ color: 'var(--primary-600)', marginBottom: '0.5rem' }} />
                <div style={{ fontWeight: 600, color: 'var(--slate-700)' }}>Building Knowledge Graph Canvas...</div>
              </div>
            </div>
          ) : null}

          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            onNodeClick={handleNodeClick}
            fitView
            minZoom={0.2}
            maxZoom={1.8}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Background color="#cbd5e1" gap={20} size={1} />
            <Controls showInteractive={false} />
            <MiniMap
              nodeStrokeColor="#6366f1"
              nodeColor="#e0e7ff"
              nodeBorderRadius={4}
              style={{ background: '#ffffff', border: '1px solid var(--border-subtle)' }}
            />
          </ReactFlow>

          {/* Floating Graph Legend */}
          <GraphLegend />
        </div>
      </div>

      {/* Node Click Details Drawer/Modal */}
      {selectedNodeForModal && (
        <NodeDetailModal
          node={selectedNodeForModal}
          onClose={() => setSelectedNodeForModal(null)}
          onSimulatePurchase={handleSimulatePurchaseFromModal}
          onGetRecommendations={handleGetRecommendationsFromModal}
        />
      )}
    </div>
  );
};

export default KnowledgeGraphExplorer;
