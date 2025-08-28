// 6. 추가 커스텀훅 : 상품 찾기

import { calcTotal } from '../utils';
import { useShop } from './useShop';

export function useShopSelects() {
  const { goods, cart } = useShop();
  // 선택한 제품 정보 찾기
  const getGood = (id: number) => goods.find(item => item.id === id);
  // 총 금액
  const total = calcTotal(cart, goods);
  return { getGood, total };
}
