import React from "react";

export default function SuccessPage({ pageClass, showPage }) {
  return (
    <div className={pageClass('success')}>
      <div className="empty-state" style={{ padding: '8rem 2rem' }}>
        <div className="empty-icon">🎉</div>
        <h3 style={{ color: 'var(--green)', fontSize: '2rem' }}>Order Placed Successfully!</h3>
        <p style={{ fontSize: '1rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
          Your order #LUXE-2025-7841 has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => showPage('dashboard')}>Track Order</button>
          <button className="btn btn-dark" onClick={() => showPage('catalog')}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
