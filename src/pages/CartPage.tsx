import React from 'react';
import Cart, { box } from '../components/shop/Cart';

function CartPage() {
  return (
    <div style={box}>
      <h2>장바구니</h2>
      <div>
        <Cart />
      </div>
    </div>
  );
}

export default CartPage;
