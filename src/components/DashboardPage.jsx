import React from "react";
import { sampleOrders } from "../data/sampleOrders";

export default function DashboardPage({ pageClass, currentUser, wishlistCount, dashboardTab, setDashboardTab, doLogout, showPage, showToast }) {
  return (
    <div className={pageClass('dashboard')}>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-user">
            <div className="user-avatar" id="dash-avatar">{currentUser.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="user-name" id="dash-name">{currentUser.name}</div>
              <div className="user-email" id="dash-email">{currentUser.email}</div>
            </div>
          </div>
          <ul className="sidebar-nav">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'orders', label: '📦 My Orders' },
              { id: 'profile', label: '👤 Profile' },
              { id: 'addresses', label: '📍 Addresses' },
              { id: 'payment', label: '💳 Payment Methods' },
            ].map(item => (
              <li key={item.id} className={dashboardTab === item.id ? 'active' : ''} onClick={() => setDashboardTab(item.id)}>{item.label}</li>
            ))}
            <li onClick={() => showPage('wishlist')}>🤍 Wishlist</li>
            <li onClick={doLogout} style={{ marginTop: 'auto', color: 'rgba(255,100,100,0.7)' }}>🚪 Sign Out</li>
          </ul>
        </aside>
        <div className="dash-content">
          <div id="dash-tab-overview" style={{ display: dashboardTab === 'overview' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Welcome back! 👋</h2>
            <div className="dash-stats">
              <div className="dash-stat-card">
                <div className="dash-stat-label">Total Orders</div>
                <div className="dash-stat-value">24</div>
                <div className="dash-stat-sub">↑ 3 this month</div>
              </div>
              <div className="dash-stat-card">
                <div className="dash-stat-label">Total Spent</div>
                <div className="dash-stat-value">₹48,200</div>
                <div className="dash-stat-sub">↑ ₹3,800 this month</div>
              </div>
              <div className="dash-stat-card">
                <div className="dash-stat-label">Wishlist Items</div>
                <div className="dash-stat-value" id="dash-wishlist-count">{wishlistCount}</div>
                <div className="dash-stat-sub">Saved for later</div>
              </div>
              <div className="dash-stat-card">
                <div className="dash-stat-label">LUXE Points</div>
                <div className="dash-stat-value" style={{ color: 'var(--gold)' }}>4,820</div>
                <div className="dash-stat-sub">≈ ₹482 value</div>
              </div>
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Recent Orders</h3>
            <div className="orders-table" id="orders-table-overview">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600 }}>{o.id}</td>
                      <td>{o.date}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                      <td style={{ fontWeight: 600 }}>{o.amount}</td>
                      <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                      <td><button className="btn btn-dark btn-sm" onClick={() => showToast(`Viewing order ${o.id}`)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="dash-tab-orders" style={{ display: dashboardTab === 'orders' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>My Orders</h2>
            <div className="orders-table" id="orders-table-full">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map(o => (
                    <tr key={o.id}>
                      <td style={{ fontWeight: 600 }}>{o.id}</td>
                      <td>{o.date}</td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.items}</td>
                      <td style={{ fontWeight: 600 }}>{o.amount}</td>
                      <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                      <td><button className="btn btn-dark btn-sm" onClick={() => showToast(`Viewing order ${o.id}`)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="dash-tab-profile" style={{ display: dashboardTab === 'profile' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>My Profile</h2>
            <div className="profile-card">
              <div className="profile-avatar-big" id="dash-avatar-big">{currentUser.name.charAt(0).toUpperCase()}</div>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input type="text" value="John" id="profile-fname" readOnly /></div>
                <div className="form-group"><label>Last Name</label><input type="text" value="Doe" readOnly /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" value="john.doe@email.com" id="profile-email" readOnly /></div>
              <div className="form-group"><label>Phone</label><input type="tel" value="+91 98765 43210" readOnly /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" value="1990-01-01" readOnly /></div>
              <div className="form-group"><label>Gender</label>
                <select disabled><option>Male</option><option>Female</option><option>Prefer not to say</option></select>
              </div>
              <button className="btn btn-primary" onClick={() => showToast('Profile updated successfully! ✓')}>Save Changes</button>
            </div>
          </div>

          <div id="dash-tab-addresses" style={{ display: dashboardTab === 'addresses' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Saved Addresses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
              <div className="checkout-section" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--gold)', color: 'var(--black)', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px' }}>DEFAULT</div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏠 Home</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--gray2)', lineHeight: '1.7' }}>
                  John Doe<br />123 Main Street, Apt 4B<br />Mumbai, Maharashtra 400001<br />+91 98765 43210
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button className="btn btn-dark btn-sm">Edit</button>
                  <button className="btn btn-sm" style={{ background: 'var(--light)', border: '1px solid #DDD' }}>Delete</button>
                </div>
              </div>
              <div className="checkout-section">
                <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏢 Office</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--gray2)', lineHeight: '1.7' }}>
                  John Doe<br />Tower B, BKC Complex<br />Bandra, Mumbai 400051<br />+91 98765 43210
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <button className="btn btn-dark btn-sm">Edit</button>
                  <button className="btn btn-sm" style={{ background: 'var(--light)', border: '1px solid #DDD' }}>Delete</button>
                </div>
              </div>
              <div className="checkout-section" style={{ border: '2px dashed #DDD', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '160px', cursor: 'pointer', background: 'transparent' }} onClick={() => showToast('Add address form opened ✓')}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>+</div>
                <div style={{ fontSize: '0.88rem', color: 'var(--gray2)' }}>Add New Address</div>
              </div>
            </div>
          </div>

          <div id="dash-tab-payment" style={{ display: dashboardTab === 'payment' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Payment Methods</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
              <div className="checkout-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem' }}>💳</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>•••• •••• •••• 4242</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gray2)' }}>Visa — Expires 12/26</div>
                </div>
                <div style={{ background: 'var(--gold)', color: 'var(--black)', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px' }}>DEFAULT</div>
              </div>
              <button className="btn btn-dark" onClick={() => showToast('Add payment method ✓')}>+ Add Payment Method</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
