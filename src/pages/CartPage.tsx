import React from 'react';
import Cart from '../components/shop/Cart';
import { box } from './HomePage';

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
