import React, { type CSSProperties } from 'react';
import { ShopProvider } from './features/shop';
import GoodList from './components/shop/GoodList';
import Cart from './components/shop/Cart';
import Wallet from './components/shop/Wallet';
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GoodsPage from './pages/GoodsPage';
import CartPage from './pages/CartPage';
import WalletPage from './pages/WalletPage';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar';

function App() {
  // ts
  const page: React.CSSProperties = {
    maxWidth: 960,
    margin: '0 auto',
    padding: 24,
    background: '#fff',
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 20,
    alignItems: 'start',
  };
  const menu: React.CSSProperties = {
    display: 'flex',
    gap: 12,
    padding: 16,
    borderBottom: '1px solid #e5e7eb',
  };
  const link: CSSProperties = {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #eee',
    textDecoration: 'none',
  };
  const active: CSSProperties = {
    fontWeight: 700,
    textDecoration: 'underline',
  };
  // tsx
  return (
    <Router>
      <div style={page}>
        <nav style={menu}>
          <NavLink to={'/'} style={link}>
            {({ isActive }) => <span style={isActive ? active : undefined}>홈</span>}
          </NavLink>
          <NavLink to={'/goods'} style={link}>
            {({ isActive }) => <span style={isActive ? active : undefined}>제품목록</span>}
          </NavLink>
          <NavLink to={'/cart'} style={link}>
            {({ isActive }) => <span style={isActive ? active : undefined}>장바구니</span>}
          </NavLink>
          <NavLink to={'/wallet'} style={link}>
            {({ isActive }) => <span style={isActive ? active : undefined}>내 지갑</span>}
          </NavLink>
        </nav>
        <h1 style={{ textAlign: 'center', marginBottom: 20 }}> 🎁 Dorong's Shop</h1>
        <Calendar />
        <ShopProvider>
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/goods" element={<GoodsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </div>
          {/* <div style={grid}>
            <div>
              <GoodList />
            </div>
            <div>
              <Cart />
              <Wallet />
            </div>
          </div> */}
        </ShopProvider>
      </div>
    </Router>
  );
}

export default App;
