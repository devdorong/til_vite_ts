import React from 'react';
import Wallet from '../components/shop/Wallet';
import { box } from './HomePage';

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
