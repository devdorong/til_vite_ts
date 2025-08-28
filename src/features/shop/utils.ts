import type { CartType, GoodType } from './types';

export function calcTotal(cart: CartType[], goods: GoodType[]): number {
  return cart.reduce((sum, c) => {
    const good = goods.find(g => g.id === c.id);
    return good ? sum + good.price * c.qty : sum;
  }, 0);
}
