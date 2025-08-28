import { useContext } from 'react';
import { ShopContext } from '../ShopContext';

// 5. 커스텀 훅
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('엥?');
  }
  return ctx;
}
