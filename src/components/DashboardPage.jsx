import React, { useState } from "react";
import Navbar from "./Navbar";
import { sampleOrders } from "../data/sampleOrders";

export default function DashboardPage({ pageClass, currentUser, wishlistCount, dashboardTab, setDashboardTab, doLogout, showPage, showToast, cartQuantity, isLoggedIn, mobileOpen, setMobileOpen }) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '+91 98765 43210',
    dob: currentUser.dob || '1990-01-01',
    gender: currentUser.gender || 'Male'
  });
  const [isEditingAddress, setIsEditingAddress] = useState(null);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  const handleProfileChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value });
  };

  const saveProfile = () => {
    setIsEditingProfile(false);
    showToast('✓ Profile updated successfully!');
  };

  const saveAddress = () => {
    setIsEditingAddress(null);
    showToast('✓ Address updated successfully!');
  };

  const savePayment = () => {
    setIsEditingPayment(false);
    showToast('✓ Payment method updated successfully!');
  };

  return (
    <div className={pageClass('dashboard')}>
      <Navbar
        showPage={showPage}
        wishlistCount={wishlistCount}
        cartQuantity={cartQuantity}
        isLoggedIn={isLoggedIn}
        onToggleMobile={() => setMobileOpen(prev => !prev)}
      />
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobile-menu">
        <a onClick={() => { showPage('home'); setMobileOpen(false); }}>Home</a>
        <a onClick={() => { showPage('catalog'); setMobileOpen(false); }}>Products</a>
        <a onClick={() => { showPage('catalog'); setMobileOpen(false); }}>Categories</a>
        <a onClick={() => { showPage('cart'); setMobileOpen(false); }}>Cart</a>
        <a onClick={() => { showPage('wishlist'); setMobileOpen(false); }}>Wishlist</a>
        <a onClick={() => { showPage('dashboard'); setMobileOpen(false); }}>Dashboard</a>
        <a onClick={() => { doLogout(); setMobileOpen(false); }}>Sign Out</a>
      </div>
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-user">
            <div className="user-avatar" id="dash-avatar">{(currentUser.name || 'U').charAt(0).toUpperCase()}</div>
            <div>
              <div className="user-name" id="dash-name">{currentUser.name || 'Guest User'}</div>
              <div className="user-email" id="dash-email">{currentUser.email || 'No email provided'}</div>
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
                    <th>Products</th>
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
                      <td style={{ maxWidth: '260px', wordBreak: 'break-word' }}>
                        <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: 1.5 }}>
                          {o.items.split(',').map(item => <li key={item.trim()}>{item.trim()}</li>)}
                        </ul>
                      </td>
                      <td style={{ fontWeight: 600 }}>{o.amount}</td>
                      <td><span className={`status-badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                      <td><button className="btn btn-dark btn-sm" onClick={() => showToast(`Order ${o.id}: ${o.items}`)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="dash-tab-profile" style={{ display: dashboardTab === 'profile' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>My Profile</h2>
            <div className="profile-card">
              <div className="profile-avatar-big" id="dash-avatar-big">{(editedProfile.name || 'U').charAt(0).toUpperCase()}</div>
              <div className="form-row">
                <div className="form-group"><label>First Name</label><input type="text" value={(editedProfile.name || '').split(' ')[0] || ''} id="profile-fname" onChange={(e) => { const parts = editedProfile.name.split(' '); parts[0] = e.target.value; handleProfileChange('name', parts.join(' ')); }} readOnly={!isEditingProfile} /></div>
                <div className="form-group"><label>Last Name</label><input type="text" value={(editedProfile.name || '').split(' ').slice(1).join(' ') || ''} id="profile-lname" onChange={(e) => { const parts = editedProfile.name.split(' '); parts[parts.length - 1] = e.target.value; handleProfileChange('name', parts.join(' ')); }} readOnly={!isEditingProfile} /></div>
              </div>
              <div className="form-group"><label>Email</label><input type="email" value={editedProfile.email || ''} id="profile-email" onChange={(e) => handleProfileChange('email', e.target.value)} readOnly={!isEditingProfile} /></div>
              <div className="form-group"><label>Phone</label><input type="tel" value={editedProfile.phone || ''} id="profile-phone" onChange={(e) => handleProfileChange('phone', e.target.value)} readOnly={!isEditingProfile} /></div>
              <div className="form-group"><label>Date of Birth</label><input type="date" value={editedProfile.dob || ''} id="profile-dob" onChange={(e) => handleProfileChange('dob', e.target.value)} readOnly={!isEditingProfile} /></div>
              <div className="form-group"><label>Gender</label>
                <select disabled={!isEditingProfile} value={editedProfile.gender || 'Male'} onChange={(e) => handleProfileChange('gender', e.target.value)}><option>Male</option><option>Female</option><option>Prefer not to say</option></select>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                {!isEditingProfile ? (
                  <button className="btn btn-primary" onClick={() => setIsEditingProfile(true)}>✏️ Edit Profile</button>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={saveProfile}>✓ Save Changes</button>
                    <button className="btn btn-dark" onClick={() => { setIsEditingProfile(false); setEditedProfile({ name: currentUser.name || '', email: currentUser.email || '', phone: currentUser.phone || '+91 98765 43210', dob: currentUser.dob || '1990-01-01', gender: currentUser.gender || 'Male' }); }}>✕ Cancel</button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div id="dash-tab-addresses" style={{ display: dashboardTab === 'addresses' ? 'block' : 'none' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Saved Addresses</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
              <div className="checkout-section" style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--gold)', color: 'var(--black)', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px' }}>DEFAULT</div>
                {isEditingAddress !== 'home' ? (
                  <>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏠 Home</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--gray2)', lineHeight: '1.7' }}>
                      {currentUser.name || 'John Doe'}<br />123 Main Street, Apt 4B<br />Mumbai, Maharashtra 400001<br />+91 98765 43210
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button className="btn btn-dark btn-sm" onClick={() => setIsEditingAddress('home')}>✏️ Edit</button>
                      <button className="btn btn-sm" style={{ background: 'var(--light)', border: '1px solid #DDD' }} onClick={() => showToast('Address deleted ✓')}>🗑️ Delete</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏠 Edit Home Address</div>
                    <div className="form-group"><label>Address Line 1</label><input type="text" defaultValue="123 Main Street, Apt 4B" /></div>
                    <div className="form-group"><label>City</label><input type="text" defaultValue="Mumbai" /></div>
                    <div className="form-group"><label>State</label><input type="text" defaultValue="Maharashtra" /></div>
                    <div className="form-group"><label>PIN Code</label><input type="text" defaultValue="400001" /></div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={saveAddress}>✓ Save</button>
                      <button className="btn btn-dark btn-sm" onClick={() => setIsEditingAddress(null)}>✕ Cancel</button>
                    </div>
                  </>
                )}
              </div>
              <div className="checkout-section">
                {isEditingAddress !== 'office' ? (
                  <>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>🏢 Office</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--gray2)', lineHeight: '1.7' }}>
                      {currentUser.name || 'John Doe'}<br />Tower B, BKC Complex<br />Bandra, Mumbai 400051<br />+91 98765 43210
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button className="btn btn-dark btn-sm" onClick={() => setIsEditingAddress('office')}>✏️ Edit</button>
                      <button className="btn btn-sm" style={{ background: 'var(--light)', border: '1px solid #DDD' }} onClick={() => showToast('Address deleted ✓')}>🗑️ Delete</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontWeight: 600, marginBottom: '0.75rem' }}>🏢 Edit Office Address</div>
                    <div className="form-group"><label>Address Line 1</label><input type="text" defaultValue="Tower B, BKC Complex" /></div>
                    <div className="form-group"><label>City</label><input type="text" defaultValue="Bandra, Mumbai" /></div>
                    <div className="form-group"><label>State</label><input type="text" defaultValue="Maharashtra" /></div>
                    <div className="form-group"><label>PIN Code</label><input type="text" defaultValue="400051" /></div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={saveAddress}>✓ Save</button>
                      <button className="btn btn-dark btn-sm" onClick={() => setIsEditingAddress(null)}>✕ Cancel</button>
                    </div>
                  </>
                )}
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
              {!isEditingPayment ? (
                <>
                  <div className="checkout-section" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '2rem' }}>💳</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>•••• •••• •••• 4242</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--gray2)' }}>Visa — Expires 12/26</div>
                    </div>
                    <div style={{ background: 'var(--gold)', color: 'var(--black)', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '2px' }}>DEFAULT</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-dark btn-sm" onClick={() => setIsEditingPayment(true)}>✏️ Edit</button>
                    <button className="btn btn-sm" style={{ background: 'var(--light)', border: '1px solid #DDD' }} onClick={() => showToast('Payment method deleted ✓')}>🗑️ Delete</button>
                  </div>
                  <button className="btn btn-dark" onClick={() => showToast('Add payment method ✓')}>+ Add Payment Method</button>
                </>
              ) : (
                <div className="checkout-section">
                  <h3 style={{ marginBottom: '1rem' }}>✏️ Edit Payment Method</h3>
                  <div className="form-group"><label>Card Number</label><input type="text" defaultValue="4242 4242 4242 4242" placeholder="1234 5678 9012 3456" /></div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="form-group" style={{ flex: 1 }}><label>Expiry (MM/YY)</label><input type="text" defaultValue="12/26" placeholder="MM/YY" /></div>
                    <div className="form-group" style={{ flex: 1 }}><label>CVV</label><input type="text" defaultValue="•••" placeholder="•••" /></div>
                  </div>
                  <div className="form-group"><label>Name on Card</label><input type="text" defaultValue="John Doe" placeholder="John Doe" /></div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-primary btn-sm" onClick={savePayment}>✓ Save</button>
                    <button className="btn btn-dark btn-sm" onClick={() => setIsEditingPayment(false)}>✕ Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
