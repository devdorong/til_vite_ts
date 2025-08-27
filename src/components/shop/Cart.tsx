import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

const Cart = () => {
  const { goods, balance, cart, removeCartOne, resetCart, clearCart, buyAll } = useShop();
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <span>제품명 : (생략)</span>
            <span>구매수 : {item.qty}</span>
            <button onClick={() => removeCartOne(item.id)}>빼기</button>
            <button onClick={() => clearCart(item.id)}>전체 빼기</button>
          </li>
        ))}
      </ul>
      <button onClick={buyAll}>전체 구매하기</button>
      <button onClick={resetCart}>전체 빼기</button>
    </div>
  );
};

export default Cart;
