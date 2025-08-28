import React from 'react';
import { useShop, useShopSelects } from '../../features/shop';

const Cart = () => {
  // ts 자리
  const { balance, cart, removeCartOne, resetCart, clearCart, buyAll, addCart } = useShop();
  const { getGood, total } = useShopSelects();

  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: '#fff',
  };
  const boxrow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
  };
  const buttonStyle: React.CSSProperties = {
    padding: 10,
  };
  // tsx 자리
  return (
    <div style={box}>
      <h2>🛒 장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비었습니다.</p>
      ) : (
        <ul>
          {cart.map(item => {
            const good = getGood(item.id);
            return (
              <li key={item.id} style={boxrow}>
                <div>
                  <strong>{good?.name}</strong> x {item.qty}
                  <div>
                    {good?.price.toLocaleString()} x {item.qty} ={' '}
                    {(good!.price * item.qty).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={buttonStyle} onClick={() => addCart(item.id)}>
                    ➕
                  </button>
                  <button style={buttonStyle} onClick={() => removeCartOne(item.id)}>
                    ➖
                  </button>
                  <button style={buttonStyle} onClick={() => clearCart(item.id)}>
                    ❌
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>총액 :{total.toLocaleString()}</strong>
      </div>
      <button onClick={buyAll}>구매하기</button>
      <button onClick={resetCart}>장바구니 비우기</button>
    </div>
  );
};

export default Cart;
