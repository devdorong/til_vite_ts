import React from 'react';
import { useShop } from '../../features/shop';

const Wallet = () => {
  const { balance, addMoney } = useShop();
  const box: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: '#fff',
  };
  return (
    <div style={box}>
      <h2>💼 잔액 : {balance.toLocaleString()}원</h2>
      <button
        style={{
          display: 'flex',
          background: '#fff',
          border: '1px solid #ddd',
          cursor: 'pointer',
          borderRadius: 4,
          padding: 10,
        }}
        onClick={addMoney}
      >
        10만원 지급받기
      </button>
    </div>
  );
};

export default Wallet;
