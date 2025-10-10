import React from 'react';
import Wallet from '../components/shop/Wallet';
import { box } from '../components/shop/Cart';

function WalletPage() {
  return (
    <div>
      <h2>내 지갑</h2>
      <div style={box}>
        <Wallet />
      </div>
    </div>
  );
}

export default WalletPage;
