import React from 'react';
import GoodList from '../components/shop/GoodList';
import { box } from './HomePage';

function GoodsPage() {
  return (
    <div style={box}>
      <h2>판매 제품 리스트</h2>
      <div>
        <GoodList />
      </div>
    </div>
  );
}

export default GoodsPage;
