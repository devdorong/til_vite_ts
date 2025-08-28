// 장바구니 아이템 타입
export type CartType = { id: number; qty: number };
// 제품 아이템 타입
export type GoodType = {
  id: number;
  name: string;
  price: number;
};
// Shop State 타입
export type ShopStateType = {
  balance: number;
  cart: CartType[];
  goods: GoodType[];
};

export enum ShopActionType {
  ADD_CART = 'ADD_CART',
  REMOVE_CART_ONE = 'REMOVE_CART',
  CLEAR_CART_ITEM = 'CLEAR_CART',
  BUY_ALL = 'BUY_ALL',
  RESET = 'RESET',
  ADD_MONEY = 'ADD_MONEY',
}

export type ShopActionAddCart = { type: ShopActionType.ADD_CART; payload: { id: number } };
export type ShopActionRemoveCart = {
  type: ShopActionType.REMOVE_CART_ONE;
  payload: { id: number };
};
export type ShopActionClearCart = { type: ShopActionType.CLEAR_CART_ITEM; payload: { id: number } };
export type ShopActionBuyAll = { type: ShopActionType.BUY_ALL };
export type ShopActionReset = { type: ShopActionType.RESET };
export type ShopActionAddMoney = { type: ShopActionType.ADD_MONEY };

export type ShopAction =
  | ShopActionAddCart
  | ShopActionRemoveCart
  | ShopActionClearCart
  | ShopActionBuyAll
  | ShopActionReset
  | ShopActionAddMoney;

// Provider 의 Value 타입
export type ShopValueType = {
  cart: CartType[];
  goods: GoodType[];
  balance: number;
  addCart: (id: number) => void;
  removeCartOne: (id: number) => void;
  clearCart: (id: number) => void;
  buyAll: () => void;
  resetCart: () => void;
  addMoney: () => void;
};

export type ShopProviderProps = {
  children?: React.ReactNode;
};
