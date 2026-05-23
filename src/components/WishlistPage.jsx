import React from "react";

export default function WishlistPage({ pageClass, wishlist, renderProductCard, showPage }) {
  return (
    <div className={pageClass('wishlist')}>
      <div className="wishlist-page">
        <div className="breadcrumb"><span onClick={() => showPage('home')}>Home</span><span className="sep">›</span><span>Wishlist</span></div>
        <h1 style={{ marginBottom: '2rem' }}>My Wishlist 🤍</h1>
        <div className="products-grid" id="wishlist-products">
          {wishlist.length ? wishlist.map(renderProductCard) : null}
        </div>
        {!wishlist.length ? (
          <div id="wishlist-empty" className="empty-state">
            <div className="empty-icon">🤍</div>
            <h3>Your wishlist is empty</h3>
            <p>Save your favourite items to buy later</p>
            <button className="btn btn-primary" onClick={() => showPage('catalog')}>Start Shopping</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
