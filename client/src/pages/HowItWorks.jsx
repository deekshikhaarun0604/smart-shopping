import React, { useState } from 'react';
import {
  Brain,
  Network,
  Users,
  Package,
  Folder,
  Sparkles,
  GitCommit,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sliders,
  Layers,
  ShoppingBag,
  Laptop,
  Check,
  Compass,
  Zap,
  Info
} from 'lucide-react';

const HowItWorks = ({ setCurrentPage }) => {
  // Interactive Step State for Section 7
  const [activeStep, setActiveStep] = useState(3);

  const stepsData = [
    {
      step: 1,
      title: 'Target Customer Identified',
      entity: 'Customer (Alex Rivera)',
      badge: 'Customer Node',
      badgeClass: 'badge-indigo',
      desc: 'The system retrieves Alex Rivera\'s profile: interests in Remote Work & Productivity and preferred category Computing & Productivity.',
      details: 'Nodes active: Customer (Alex) • Interests: [Remote Work] • Category: {Computing}'
    },
    {
      step: 2,
      title: 'Analyze Purchase History',
      entity: 'Alex PURCHASED Laptop',
      badge: 'PURCHASED Edge (+5 context)',
      badgeClass: 'badge-emerald',
      desc: 'The graph queries outgoing PURCHASED edges from Alex. It identifies that Alex already owns the ProBook Ultra 16 Laptop.',
      details: 'Graph Traversal 1-Hop: Customer (Alex) ──[PURCHASED]──> Product (Laptop)'
    },
    {
      step: 3,
      title: 'Traverse Semantic Edges to Accessories',
      entity: 'Laptop HAS_ACCESSORY Laptop Stand',
      badge: 'HAS_ACCESSORY (+5 pts)',
      badgeClass: 'badge-purple',
      desc: 'From the owned Laptop node, the engine explores HAS_ACCESSORY relationships and reaches the AeroStand Aluminum Laptop Stand.',
      details: 'Graph Traversal 2-Hop: Laptop ──[HAS_ACCESSORY]──> Laptop Stand'
    },
    {
      step: 4,
      title: 'Multi-Factor Scoring & Synergy',
      entity: 'Laptop Stand Score = 10 Pts',
      badge: 'Rank #1 Recommendation',
      badgeClass: 'badge-amber',
      desc: 'Points combined: +5 for being an accessory of owned Laptop, +3 for matching Remote Work interest, +2 for belonging to preferred Computing category.',
      details: 'Final Score Breakdown: 5 (Accessory) + 3 (Interest) + 2 (Category) = 10 Points'
    }
  ];

  return (
    <div className="page-container" style={{ maxWidth: '1100px' }}>
      {/* College Activity Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          color: '#ffffff',
          marginBottom: '2.5rem',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#c7d2fe', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          <Brain size={14} /> College Knowledge to Intelligence Activity
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
          How Knowledge Graphs Transform Information into Intelligent Solutions
        </h1>
        <p style={{ fontSize: '1rem', color: '#e0e7ff', lineHeight: 1.6, maxWidth: '820px' }}>
          Explore the principles of semantic knowledge representation, multi-hop graph traversal, and deterministic rule-based scoring that power SmartShop's explainable recommendations.
        </p>
      </div>

      {/* 1. What is a Knowledge Graph? */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 1</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            What is a Knowledge Graph?
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
          A <strong>Knowledge Graph</strong> is a structured representation of real-world facts consisting of <strong>nodes (entities)</strong> and <strong>edges (semantic relationships)</strong>. Unlike traditional tabular relational databases that store isolated rows, a Knowledge Graph preserves the rich semantic context of how entities relate to one another.
        </p>
        <div style={{ backgroundColor: '#f8fafc', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.875rem', color: 'var(--slate-700)', lineHeight: 1.6 }}>
          <strong>Core Principle:</strong> Information is transformed into intelligence by modeling semantic triples:
          <code style={{ display: 'block', padding: '0.5rem 0.75rem', background: '#ffffff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', margin: '0.5rem 0', fontWeight: 700, color: 'var(--primary-700)' }}>
            &lt;Subject Entity&gt; ───[Predicate / Relationship]───&gt; &lt;Object Entity&gt;
          </code>
          Example: <code>&lt;Customer: Alex&gt; ──[PURCHASED]──&gt; &lt;Product: Laptop&gt;</code>
        </div>
      </div>

      {/* 2. Knowledge Graph Entities */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 2</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Knowledge Graph Entities (Nodes)
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
          SmartShop models four distinct ontological entity types across the e-commerce domain:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {/* Customer */}
          <div style={{ border: '2px solid #6366f1', borderRadius: 'var(--radius-md)', padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#4f46e5' }}>
              <Users size={20} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Customer</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: 1.4 }}>
              The shopper persona. Stores profile data, purchase history, preferred categories, and lifestyle interests.
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: '#4f46e5', fontWeight: 600 }}>
              Nodes in Demo: 8 Customers
            </div>
          </div>

          {/* Product */}
          <div style={{ border: '2px solid #10b981', borderRadius: 'var(--radius-md)', padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#059669' }}>
              <Package size={20} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Product</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: 1.4 }}>
              Catalog items with pricing, category classification, specifications, accessories, and ratings.
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: '#059669', fontWeight: 600 }}>
              Nodes in Demo: 24 Products
            </div>
          </div>

          {/* Category */}
          <div style={{ border: '2px solid #8b5cf6', borderRadius: 'var(--radius-md)', padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#7c3aed' }}>
              <Folder size={20} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Category</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: 1.4 }}>
              Domain taxonomy organizing products into hierarchical business areas (e.g., Computing, Audio, IoT).
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: '#7c3aed', fontWeight: 600 }}>
              Nodes in Demo: 6 Categories
            </div>
          </div>

          {/* Interest */}
          <div style={{ border: '2px solid #f59e0b', borderRadius: 'var(--radius-md)', padding: '1.25rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#d97706' }}>
              <Sparkles size={20} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Interest</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate-600)', lineHeight: 1.4 }}>
              Lifestyle affinity tags (e.g., Remote Work, High-Fidelity Audio, Competitive Gaming) connecting shoppers to gear.
            </p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.725rem', color: '#d97706', fontWeight: 600 }}>
              Nodes in Demo: 8 Interests
            </div>
          </div>
        </div>
      </div>

      {/* 3. Relationships Between Entities */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 3</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Semantic Relationships (Edges)
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
          Entities are connected via directed, typed edges that specify the semantic nature of their association:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                <th style={{ padding: '0.65rem' }}>Relationship</th>
                <th style={{ padding: '0.65rem' }}>From Entity</th>
                <th style={{ padding: '0.65rem' }}>To Entity</th>
                <th style={{ padding: '0.65rem' }}>Weight</th>
                <th style={{ padding: '0.65rem' }}>Semantic Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#059669' }}>PURCHASED</td>
                <td style={{ padding: '0.65rem' }}>Customer</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>+5</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Customer has previously purchased this product</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#4f46e5' }}>HAS_ACCESSORY</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>+5</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Target product is an official accessory for source product</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#7c3aed' }}>RELATED_TO</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>+4</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Complementary peer product often used together</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#d97706' }}>INTERESTED_IN</td>
                <td style={{ padding: '0.65rem' }}>Customer</td>
                <td style={{ padding: '0.65rem' }}>Interest</td>
                <td style={{ padding: '0.65rem' }}>+3</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Customer expresses passion for this lifestyle topic</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#0e7490' }}>PREFERS</td>
                <td style={{ padding: '0.65rem' }}>Customer</td>
                <td style={{ padding: '0.65rem' }}>Category</td>
                <td style={{ padding: '0.65rem' }}>+2</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Customer prefers browsing this product category</td>
              </tr>
              <tr>
                <td style={{ padding: '0.65rem', fontWeight: 700, color: '#64748b' }}>BELONGS_TO</td>
                <td style={{ padding: '0.65rem' }}>Product</td>
                <td style={{ padding: '0.65rem' }}>Category</td>
                <td style={{ padding: '0.65rem' }}>Taxonomy</td>
                <td style={{ padding: '0.65rem', color: 'var(--slate-600)' }}>Product belongs to this category taxonomy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Conversion of Purchase History into Graph Relationships */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 4</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Converting Customer Purchase History into Graph Relationships
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
          Whenever a purchase is simulated in the Shop catalog, SmartShop does not simply update a flat SQL column. Instead, it dynamically ingests the transaction into the Knowledge Graph:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-emerald">Step 1</span>
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--slate-800)' }}>Transaction Processing:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                Product is recorded in the customer's <code>purchaseHistory</code> array with timestamp and price.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-indigo">Step 2</span>
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--slate-800)' }}>Dynamic Edge Insertion:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                A new semantic relationship document is written to MongoDB:
                <code>&#123; fromId: customerId, fromType: 'Customer', toId: productId, toType: 'Product', relationshipType: 'PURCHASED' &#125;</code>.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.85rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-purple">Step 3</span>
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--slate-800)' }}>Topology Activation:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-600)' }}>
                The newly purchased product is instantly excluded from future candidate lists, while simultaneously unlocking new 2-hop <code>HAS_ACCESSORY</code> and <code>RELATED_TO</code> recommendation pathways!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. How Graph Traversal Discovers Relevant Products */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 5</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            How Graph Traversal Discovers Relevant Products
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Rather than relying on opaque vector math, the recommendation engine starts at the target customer node and traverses outward through 1-hop and 2-hop paths:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-700)', marginBottom: '0.35rem' }}>
              Path A: Accessory Traversal (2-Hop)
            </div>
            <code style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', color: 'var(--slate-700)' }}>
              (Customer) ──[PURCHASED]──&gt; (Product A) ──[HAS_ACCESSORY]──&gt; (Product B)
            </code>
            <p style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>
              Finds products engineered specifically to enhance what the customer already owns.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#7c3aed', marginBottom: '0.35rem' }}>
              Path B: Related Traversal (2-Hop)
            </div>
            <code style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', color: 'var(--slate-700)' }}>
              (Customer) ──[PURCHASED]──&gt; (Product A) ──[RELATED_TO]──&gt; (Product C)
            </code>
            <p style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>
              Finds complementary goods frequently used in the same context.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#d97706', marginBottom: '0.35rem' }}>
              Path C: Interest Traversal (2-Hop)
            </div>
            <code style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', color: 'var(--slate-700)' }}>
              (Customer) ──[INTERESTED_IN]──&gt; (Interest) &lt;──[MATCHES_INTEREST]── (Product D)
            </code>
            <p style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>
              Connects customer hobbies directly to products tailored for that pursuit.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0e7490', marginBottom: '0.35rem' }}>
              Path D: Preferred Category (2-Hop)
            </div>
            <code style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem', color: 'var(--slate-700)' }}>
              (Customer) ──[PREFERS]──&gt; (Category) &lt;──[BELONGS_TO]── (Product E)
            </code>
            <p style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>
              Ensures high-relevance items from the shopper's preferred shopping departments.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Recommendation Scoring and Ranking */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 6</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Recommendation Scoring and Ranking Formula
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
          Scores accumulate deterministically when multiple graph paths lead to the same candidate product:
        </p>

        <div style={{ backgroundColor: '#1e293b', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)', fontFamily: 'JetBrains Mono', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          <strong>Total_Score(Candidate) =</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;+ 5 × (if HAS_ACCESSORY of any previously purchased item)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;+ 4 × (if RELATED_TO any previously purchased item)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;+ 3 × ∑ (for each customer interest matching candidate)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;+ 2 × (if candidate belongs to customer's preferred category)
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--slate-700)', lineHeight: 1.6 }}>
          <strong>Deterministic Guarantee:</strong> If two products have the same numerical score, the tie is broken alphabetically by product name. This ensures that identical input always produces identical, reproducible results.
        </div>
      </div>

      {/* 7. Interactive Visual Example: Laptop -> Laptop Stand */}
      <div className="card" style={{ marginBottom: '2rem', border: '2px solid var(--primary-300)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-indigo">Section 7</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Interactive Visual Walkthrough
            </h2>
          </div>
          <span className="badge badge-emerald">Live Educational Simulator</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem' }}>
          Step through how the Knowledge Graph recommends a <strong>Laptop Stand</strong> to <strong>Alex Rivera</strong>:
        </p>

        {/* Interactive Step Switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {stepsData.map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`btn btn-sm ${activeStep === s.step ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              Step {s.step}: {s.title}
            </button>
          ))}
        </div>

        {/* Visual Path Diagram */}
        <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
            {/* Customer Node */}
            <span className={`path-node customer ${activeStep >= 1 ? 'active-highlight' : ''}`} style={{ padding: '0.4rem 0.8rem' }}>
              <Users size={14} />
              <span>Customer: Alex Rivera</span>
            </span>

            <ArrowRight size={14} style={{ color: activeStep >= 2 ? '#059669' : '#cbd5e1' }} />

            {/* PURCHASED Edge */}
            <span className={`path-edge PURCHASED ${activeStep >= 2 ? 'active-highlight' : ''}`} style={{ padding: '0.3rem 0.6rem' }}>
              PURCHASED
            </span>

            <ArrowRight size={14} style={{ color: activeStep >= 2 ? '#059669' : '#cbd5e1' }} />

            {/* Product Node */}
            <span className={`path-node product ${activeStep >= 2 ? 'active-highlight' : ''}`} style={{ padding: '0.4rem 0.8rem' }}>
              <Laptop size={14} />
              <span>ProBook Ultra 16 Laptop</span>
            </span>

            <ArrowRight size={14} style={{ color: activeStep >= 3 ? '#4f46e5' : '#cbd5e1' }} />

            {/* HAS_ACCESSORY Edge */}
            <span className={`path-edge HAS_ACCESSORY ${activeStep >= 3 ? 'active-highlight' : ''}`} style={{ padding: '0.3rem 0.6rem' }}>
              HAS_ACCESSORY (+5 pts)
            </span>

            <ArrowRight size={14} style={{ color: activeStep >= 3 ? '#4f46e5' : '#cbd5e1' }} />

            {/* Recommended Product Node */}
            <span className={`path-node product ${activeStep >= 4 ? 'active-highlight' : ''}`} style={{ padding: '0.4rem 0.8rem', backgroundColor: activeStep >= 4 ? '#fef3c7' : '#ffffff', borderColor: activeStep >= 4 ? '#f59e0b' : '#e2e8f0' }}>
              <Sparkles size={14} style={{ color: '#d97706' }} />
              <strong>AeroStand Aluminum Stand</strong>
            </span>
          </div>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
              <span className={`badge ${stepsData[activeStep - 1].badgeClass}`}>
                {stepsData[activeStep - 1].badge}
              </span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>
                {stepsData[activeStep - 1].title}
              </strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              {stepsData[activeStep - 1].desc}
            </p>
            <div style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono', color: 'var(--slate-500)', background: '#ffffff', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              {stepsData[activeStep - 1].details}
            </div>
          </div>
        </div>
      </div>

      {/* 8. Why the Product Was Recommended */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 8</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Why Was the Product Recommended? (Explainability & Trust)
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
          Traditional AI recommenders output raw probability numbers with no verifiable provenance. In SmartShop, every single recommendation is backed by a verifiable reasoning path:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#ecfdf5', borderRadius: 'var(--radius-md)', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#065f46', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
              <CheckCircle2 size={16} /> 100% Auditability
            </div>
            <p style={{ fontSize: '0.8rem', color: '#065f46', lineHeight: 1.4 }}>
              Both the business evaluator and the consumer can inspect the exact sequence of edges that triggered the suggestion.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#eef2ff', borderRadius: 'var(--radius-md)', border: '1px solid #c7d2fe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3730a3', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
              <Zap size={16} /> Solves Cold-Start
            </div>
            <p style={{ fontSize: '0.8rem', color: '#3730a3', lineHeight: 1.4 }}>
              Brand new accessories can be recommended immediately through ontology links even before receiving a single customer review.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#fffbeb', borderRadius: 'var(--radius-md)', border: '1px solid #fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#92400e', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
              <Compass size={16} /> Contextual Utility
            </div>
            <p style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.4 }}>
              Suggesting a stand for an owned laptop provides immediate physical utility, driving higher customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* 9. The Complete Workflow from Customer Data to Intelligent Recommendation */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Section 9</span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            The Complete End-to-End Intelligence Pipeline
          </h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          The entire flow of transforming raw customer information into intelligent recommendations follows five unified stages:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--primary-600)', width: '28px', height: '28px', borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.875rem' }}>Raw Data Ingest:</strong>
              <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>Captures catalog specifications, customer sign-ups, and store transactions.</div>
            </div>
            <span className="badge badge-slate">Data Layer</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--primary-600)', width: '28px', height: '28px', borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.875rem' }}>Semantic Ontology Construction:</strong>
              <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>Translates entities into Knowledge Graph nodes and typed predicates (BELONGS_TO, HAS_ACCESSORY).</div>
            </div>
            <span className="badge badge-purple">Knowledge Layer</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--primary-600)', width: '28px', height: '28px', borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.875rem' }}>Multi-Hop Traversal Execution:</strong>
              <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>Finds reachable candidate items through 1-hop and 2-hop edges stemming from customer nodes.</div>
            </div>
            <span className="badge badge-indigo">Graph Engine</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontWeight: 800, color: 'var(--primary-600)', width: '28px', height: '28px', borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.875rem' }}>Deterministic Scoring & Exclusion:</strong>
              <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)' }}>Excludes already-purchased products, sums path weights (+5, +4, +3, +2), and sorts deterministically.</div>
            </div>
            <span className="badge badge-emerald">Decision Matrix</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', backgroundColor: '#ecfdf5', borderRadius: 'var(--radius-md)', border: '1px solid #a7f3d0' }}>
            <span style={{ fontWeight: 800, color: '#059669', width: '28px', height: '28px', borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>5</span>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.875rem', color: '#065f46' }}>Explainable Intelligent Delivery:</strong>
              <div style={{ fontSize: '0.775rem', color: '#065f46' }}>Renders ranked recommendations with visible visual graph path flows and plain-language reasoning.</div>
            </div>
            <span className="badge badge-emerald">Intelligence Solution</span>
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div style={{ textAlign: 'center', padding: '1.75rem', background: '#f8fafc', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Explore the Live System Now
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginBottom: '1.25rem' }}>
          Inspect the interactive Knowledge Graph or generate explainable recommendations for any demo customer.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
          <button onClick={() => setCurrentPage('recommendations')} className="btn btn-primary">
            <Sparkles size={16} />
            <span>Open Recommendations Engine</span>
          </button>
          <button onClick={() => setCurrentPage('graph')} className="btn btn-secondary">
            <Network size={16} />
            <span>Open Knowledge Graph Explorer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
