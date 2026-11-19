import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ShoppingBag,
  Star,
  Check,
  Info,
  Sparkles,
  ArrowRight,
  User
} from 'lucide-react';
import { getProducts, getCategories, simulatePurchase } from '../services/api';
import { useApp } from '../context/AppContext';

const Shop = ({ setCurrentPage }) => {
  const { activeCustomer, refreshAppState, showNotification } = useApp();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [detailProduct, setDetailProduct] = useState(null);
  const [purchasingProductId, setPurchasingProductId] = useState(null);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        getProducts({
          category: selectedCategory,
          search: searchQuery,
          sort: sortBy
        }),
        getCategories()
      ]);
      setProducts(prods || []);
      setCategories(cats || []);
    } catch (err) {
      console.warn('Could not load products:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, [selectedCategory, searchQuery, sortBy]);

  const handlePurchase = async (product) => {
    if (!activeCustomer) {
      showNotification('Please select an active customer first!', 'error');
      return;
    }

    setPurchasingProductId(product._id);
    try {
      const res = await simulatePurchase(activeCustomer._id, product._id);
      showNotification(
        `Success! "${product.name}" purchased by ${activeCustomer.name}. Graph updated!`,
        'success'
      );
      await refreshAppState();
      if (detailProduct && detailProduct._id === product._id) {
        setDetailProduct(null);
      }
    } catch (err) {
      showNotification(
        err.response?.data?.message || err.message || 'Purchase failed',
        'error'
      );
    } finally {
      setPurchasingProductId(null);
    }
  };

  const isPurchasedByActiveCustomer = (productId) => {
    if (!activeCustomer || !activeCustomer.purchaseHistory) return false;
    return activeCustomer.purchaseHistory.some((p) => {
      const pId = p.product?._id ? p.product._id : p.product;
      return pId === productId;
    });
  };

  return (
    <div className="page-container">
      {/* Active Customer Shopping Banner */}
      {activeCustomer && (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'var(--shadow-sm)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img
              src={activeCustomer.avatar}
              alt={activeCustomer.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%236366f1"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>';
              }}
            />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Simulating Store as: <span style={{ color: 'var(--primary-600)' }}>{activeCustomer.name}</span> ({activeCustomer.role})
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                Purchasing any item will record a new transaction and add a <code>PURCHASED</code> relationship to the Knowledge Graph in real-time.
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('recommendations')}
            className="btn btn-secondary btn-sm"
          >
            <Sparkles size={14} style={{ color: 'var(--primary-600)' }} />
            <span>View {activeCustomer.name.split(' ')[0]}'s Recommendations</span>
          </button>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '420px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-400)' }}
          />
          <input
            type="text"
            placeholder="Search products, features, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '2.4rem' }}
          />
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Sort by:</span>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '1.75rem'
        }}
      >
        <button
          onClick={() => setSelectedCategory('All')}
          className={`graph-filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
        >
          All Categories ({products.length})
        </button>
        {categories.map((c) => (
          <button
            key={c._id}
            onClick={() => setSelectedCategory(c.name)}
            className={`graph-filter-btn ${selectedCategory === c.name ? 'active' : ''}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--slate-500)' }}>
          Loading products from database...
        </div>
      ) : products.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--slate-500)' }}>
          No products matched your search or category filter.
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
            const alreadyPurchased = isPurchasedByActiveCustomer(product._id);
            const isBuying = purchasingProductId === product._id;

            return (
              <div key={product._id} className="product-card">
                <div className="product-img-wrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e2e8f0"><rect width="24" height="24"/><text x="12" y="14" font-size="6" text-anchor="middle" fill="%2394a3b8">Product</text></svg>';
                    }}
                  />
                  {product.badge && (
                    <span className="badge badge-indigo product-badge-overlay">
                      {product.badge}
                    </span>
                  )}
                  <span className="badge badge-slate product-category-overlay">
                    {product.category}
                  </span>
                </div>

                <div className="product-card-body">
                  <h3 className="product-card-title">{product.name}</h3>
                  <p className="product-card-desc">{product.description}</p>

                  {product.features && product.features.length > 0 && (
                    <div className="product-card-features">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="feature-tag">
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="product-card-footer">
                    <div>
                      <span className="product-price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="product-price-orig">${product.originalPrice}</span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => setDetailProduct(product)}
                        className="btn btn-secondary btn-sm"
                        title="View details & graph relationships"
                      >
                        <Info size={14} />
                      </button>

                      {alreadyPurchased ? (
                        <button
                          disabled
                          className="btn btn-sm"
                          style={{
                            backgroundColor: '#ecfdf5',
                            color: '#065f46',
                            border: '1px solid #a7f3d0'
                          }}
                        >
                          <Check size={14} />
                          <span>Owned</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePurchase(product)}
                          disabled={isBuying}
                          className="btn btn-emerald btn-sm"
                        >
                          <ShoppingBag size={14} />
                          <span>{isBuying ? 'Buying...' : 'Buy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Product Details Modal */}
      {detailProduct && (
        <div className="modal-overlay" onClick={() => setDetailProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge badge-emerald">Product Specifications & Ontology</span>
              <button onClick={() => setDetailProduct(null)} style={{ color: 'var(--slate-400)' }}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <img
                  src={detailProduct.image}
                  alt={detailProduct.name}
                  style={{ width: '180px', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {detailProduct.name}
                  </h2>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: '0.25rem 0 0.5rem' }}>
                    {detailProduct.category}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#059669' }}>
                    ${detailProduct.price}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                {detailProduct.description}
              </p>

              {/* Key Features */}
              {detailProduct.features && detailProduct.features.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Key Specifications
                  </div>
                  <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                    {detailProduct.features.map((f, i) => (
                      <li key={i} style={{ marginBottom: '0.2rem' }}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Accessories Linked in Knowledge Graph */}
              {detailProduct.accessories && detailProduct.accessories.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Official Accessories (HAS_ACCESSORY +5 pts)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {detailProduct.accessories.map((acc, i) => (
                      <span key={i} className="badge badge-indigo">
                        {acc.name || acc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Interests */}
              {detailProduct.matchingInterests && detailProduct.matchingInterests.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Matching Customer Interests (MATCHES_INTEREST +3 pts)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {detailProduct.matchingInterests.map((it, i) => (
                      <span key={i} className="badge badge-amber">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setDetailProduct(null)}>
                Close
              </button>
              {isPurchasedByActiveCustomer(detailProduct._id) ? (
                <span className="badge badge-emerald">Already Owned by {activeCustomer?.name}</span>
              ) : (
                <button
                  onClick={() => handlePurchase(detailProduct)}
                  className="btn btn-emerald btn-sm"
                >
                  <ShoppingBag size={14} />
                  <span>Simulate Purchase for {activeCustomer?.name}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
