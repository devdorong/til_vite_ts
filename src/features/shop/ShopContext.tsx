import React, { createContext, useReducer } from 'react';
import type { ShopProviderProps, ShopValueType } from './types';
import { ShopActionType } from './types';
import { shopInitialState } from './state';
import { shopReducer } from './reducer';

// 3. 컨텍스트 생성
export const ShopContext = createContext<null | ShopValueType>(null);

// 4. 프로바이더
export const ShopProvider = ({ children }: ShopProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(shopReducer, shopInitialState);

  // dispatch 용 함수 표현식
  const addCart = (id: number): void => {
    dispatch({ type: ShopActionType.ADD_CART, payload: { id } });
  };
  const removeCartOne = (id: number): void => {
    dispatch({ type: ShopActionType.REMOVE_CART_ONE, payload: { id } });
  };
  const clearCart = (id: number): void => {
    dispatch({ type: ShopActionType.CLEAR_CART_ITEM, payload: { id } });
  };
  const buyAll = (): void => {
    dispatch({ type: ShopActionType.BUY_ALL });
  };
  const resetCart = (): void => {
    dispatch({ type: ShopActionType.RESET });
  };
  const addMoney = (): void => {
    dispatch({ type: ShopActionType.ADD_MONEY });
  };

  const value: ShopValueType = {
    cart: state.cart,
    goods: state.goods,
    balance: state.balance,
    addCart,
    removeCartOne,
    clearCart,
    buyAll,
    resetCart,
    addMoney,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
