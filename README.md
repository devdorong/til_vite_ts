# Context API 와 useReduce 예제

- 시나리오
  - 쇼핑몰 장바구니, 잔고 관리

## 1. 폴더 및 파일 구조

- /src/contexts/shop 폴더 생성
- /src/contexts/shop/ShopContext.tsx 파일 생성

```tsx
import React, { createContext, useContext, useReducer } from 'react';

// 1. 초기값
type CartType = { id: number; qty: number };
type GoodType = {
  id: number;
  name: string;
  price: number;
};
type ShopStateType = {
  balance: number;
  cart: CartType[];
  goods: GoodType[];
};
const initialState: ShopStateType = {
  balance: 100000,
  cart: [],
  goods: [
    { id: 1, name: '사과', price: 1000 },
    { id: 2, name: '딸기', price: 30000 },
    { id: 3, name: '바나나', price: 500 },
    { id: 4, name: '초콜릿', price: 8000 },
  ],
};

// 2. 리듀서
enum ShopActionType {
  ADD_CART = 'ADD_CART',
  REMOVE_CART_ONE = 'REMOVE_CART',
  CLEAR_CART_ITEM = 'CLEAR_CART',
  BUY_ALL = 'BUY_ALL',
  RESET = 'RESET',
  ADD_MONEY = 'ADD_MONEY',
}
type ShopActionAddCart = { type: ShopActionType.ADD_CART; payload: { id: number } };
type ShopActionRemoveCart = { type: ShopActionType.REMOVE_CART_ONE; payload: { id: number } };
type ShopActionClearCart = { type: ShopActionType.CLEAR_CART_ITEM; payload: { id: number } };
type ShopActionBuyAll = { type: ShopActionType.BUY_ALL };
type ShopActionReset = { type: ShopActionType.RESET };
type ShopActionAddMoney = { type: ShopActionType.ADD_MONEY };
type ShopAction =
  | ShopActionAddCart
  | ShopActionRemoveCart
  | ShopActionClearCart
  | ShopActionBuyAll
  | ShopActionReset
  | ShopActionAddMoney;
// 장바구니 전체 금액 계산하기
function calcCart(nowState: ShopStateType): number {
  const total = nowState.cart.reduce((sum, cartItem) => {
    const good = nowState.goods.find(g => g.id === cartItem.id);
    if (!good) return sum;
    return sum + good.price * cartItem.qty;
  }, 0);
  return total;
}

function reducer(state: ShopStateType, action: ShopAction) {
  switch (action.type) {
    case ShopActionType.ADD_CART: {
      const { id } = action.payload; // 제품의 ID
      // id 제품이 배열에 있는가? qty 가 있는가?
      const existGood = state.cart.find(item => item.id === id);
      let arr: CartType[] = [];
      if (existGood) {
        // qty 증가
        arr = state.cart.map(item => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      } else {
        // state.cart 에 새 제품 추가, qty 는 1개
        arr = [...state.cart, { id, qty: 1 }];
      }
      return { ...state, cart: arr };
    }
    case ShopActionType.REMOVE_CART_ONE: {
      const { id } = action.payload;
      // id 제품이 배열에 있는가? qty 가 있는가?
      const existGood = state.cart.find(item => item.id === id);
      let arr: CartType[] = [];
      if (!existGood) {
        // 제품이 없다면?
        return state;
      } else {
        if (existGood.qty > 1) {
          // 제품이 1개 이상이면
          arr = state.cart.map(item => (item.id === id ? { ...item, qty: item.qty - 1 } : item));
        } else {
          // 제품이 1개 담겼어요.
          arr = state.cart.filter(item => item.id !== id);
        }
      }
      return { ...state, cart: arr };
    }
    case ShopActionType.CLEAR_CART_ITEM: {
      // 담겨진 제품 중에 장바구니에서 제거하기
      const { id } = action.payload;
      const arr = state.cart.filter(item => item.id !== id);
      return { ...state, cart: arr };
    }
    case ShopActionType.BUY_ALL: {
      // 총 금액 계산
      const total = calcCart(state);
      if (total > state.balance) {
        alert('돈이 부족합니다. 장바구니를 줄이세요');
        return state;
      }
      return { ...state, balance: state.balance - total, cart: [] };
    }
    case ShopActionType.RESET:
      return { ...state, cart: [] };
    default:
      return state;
  }
}
// 3. 컨텍스트 생성
type ShopValueType = {
  cart: CartType[];
  goods: GoodType[];
  balance: number;
  addCart: (id: number) => void;
  removeCartOne: (id: number) => void;
  clearCart: (id: number) => void;
  buyAll: () => void;
  resetCart: () => void;
};
const ShopContext = createContext<null | ShopValueType>(null);
// 4. 프로바이더
type ShopProviderProps = {
  children?: React.ReactNode;
};
export const ShopProvider = ({ children }: ShopProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const value: ShopValueType = {
    cart: state.cart,
    goods: state.goods,
    balance: state.balance,
    addCart,
    removeCartOne,
    clearCart,
    buyAll,
    resetCart,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
// 5. 커스텀 훅
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error('엥?');
  }
  return ctx;
}
```

- /src/components/shop 폴더 생성
- /src/components/shop/GoodList.tsx 파일 생성

```tsx
import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

const GoodList = () => {
  const { goods, addCart } = useShop();
  return (
    <div>
      <h2>GoodList</h2>
      <ul>
        {goods.map(item => (
          <li key={item.id}>
            <span>제품명 : {item.name}</span>
            <span>가격 : {item.price}</span>
            <button onClick={() => addCart(item.id)}>담기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoodList;
```

- /src/components/shop/Cart.tsx 파일 생성

```tsx
import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

const Cart = () => {
  const { goods, balance, cart, removeCartOne, resetCart, clearCart, buyAll } = useShop();
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <span>제품명 : (생략)</span>
            <span>구매수 : {item.qty}</span>
            <button onClick={() => removeCartOne(item.id)}>빼기</button>
            <button onClick={() => clearCart(item.id)}>전체 빼기</button>
          </li>
        ))}
      </ul>
      <button onClick={buyAll}>전체 구매하기</button>
      <button onClick={resetCart}>전체 빼기</button>
    </div>
  );
};

export default Cart;
```

- /src/components/shop/Wallet.tsx 파일 생성

```tsx
import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

const Wallet = () => {
  const { balance } = useShop();
  return <div>Wallet : {balance}</div>;
};

export default Wallet;
```

### 스타일 수정

- App.tsx

```tsx
import React from 'react';
import GoodList from './components/shop/GoodList';
import Wallet from './components/shop/Wallet';
import Cart from './components/shop/Cart';
import { ShopProvider } from './contexts/shop/ShopContext';

function App() {
  // ts
  const page: React.CSSProperties = {
    maxWidth: 960,
    margin: '0 auto',
    padding: 24,
    background: '#eaeaea',
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 20,
    alignItems: 'start',
  };
  // tsx
  return (
    <div style={page}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}> 🎁 Dorong's Shop</h1>
      <ShopProvider>
        <div style={grid}>
          <div>
            <GoodList />
          </div>
          <div>
            <Cart />
            <Wallet />
          </div>
        </div>
      </ShopProvider>
    </div>
  );
}

export default App;
```

- GoodList.tsx

```tsx
import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

const GoodList = () => {
  const { goods, addCart } = useShop();
  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    background: '#fff',
    minHeight: 558,
  };
  const boxrow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  };
  return (
    <div style={box}>
      <h2>📝 GoodList</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {goods.map(item => (
          <li key={item.id} style={boxrow}>
            <span>
              <strong>{item.name} </strong> {item.price.toLocaleString()} 원
            </span>
            <button onClick={() => addCart(item.id)}>담기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoodList;
```

- Cart.tsx

```tsx
import React from 'react';
import { useShop, useShopSelects } from '../../contexts/shop/ShopContext';

const Cart = () => {
  // ts 자리
  const { balance, cart, removeCartOne, resetCart, clearCart, buyAll, addCart } = useShop();
  const { getGood, total } = useShopSelects();

  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: '#fff',
  };
  const boxrow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
  };
  const buttonStyle: React.CSSProperties = {
    padding: 10,
  };
  // tsx 자리
  return (
    <div style={box}>
      <h2>🛒 장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비었습니다.</p>
      ) : (
        <ul>
          {cart.map(item => {
            const good = getGood(item.id);
            return (
              <li key={item.id} style={boxrow}>
                <div>
                  <strong>{good?.name}</strong> x {item.qty}
                  <div>
                    {good?.price.toLocaleString()} x {item.qty} ={' '}
                    {(good!.price * item.qty).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={buttonStyle} onClick={() => addCart(item.id)}>
                    ➕
                  </button>
                  <button style={buttonStyle} onClick={() => removeCartOne(item.id)}>
                    ➖
                  </button>
                  <button style={buttonStyle} onClick={() => clearCart(item.id)}>
                    ❌
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>총액 :{total.toLocaleString()}</strong>
      </div>
      <button onClick={buyAll}>구매하기</button>
      <button onClick={resetCart}>장바구니 비우기</button>
    </div>
  );
};

export default Cart;
```

- Wallet.tsx

```tsx
import React from 'react';
import { useShop } from '../../contexts/shop/ShopContext';

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
```

## 2. 실전 파일 분리하기

### 2.1. 폴더 및 파일 구조

- 기능별로 분리한다면 contexts 말고 `features` 폴더로

- `/src/features` 폴더 생성
- `/src/features/shop` 폴더 생성
- `/src/features/shop/types.ts 파일` 생성

```ts
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
```

- `/src/features/shop/state.ts 파일` 생성

```ts
import type { ShopStateType } from './types';

// 1. 초기값
export const initialState: ShopStateType = {
  balance: 100000,
  cart: [],
  goods: [
    { id: 1, name: '🍎 사과', price: 1000 },
    { id: 2, name: '🍓 딸기', price: 30000 },
    { id: 3, name: '🍌 바나나', price: 500 },
    { id: 4, name: '🍫 초콜릿', price: 8000 },
  ],
};
```

- `/src/features/shop/utils.ts 파일` 생성

```ts
import type { CartType, GoodType } from './types';

export function calcTotal(cart: CartType[], goods: GoodType[]): number {
  return cart.reduce((sum, c) => {
    const good = goods.find(g => g.id === c.id);
    return good ? sum + good.price * c.qty : sum;
  }, 0);
}
```

- `/src/features/shop/reducer.ts 파일` 생성

```ts
// 2. 리듀서

import type { CartType, ShopAction, ShopStateType } from './types';
import { ShopActionType } from './types';
import { calcTotal } from './utils';

export function reducer(state: ShopStateType, action: ShopAction) {
  switch (action.type) {
    case ShopActionType.ADD_CART: {
      const { id } = action.payload; // 제품의 ID
      // id 제품이 배열에 있는가? qty 가 있는가?
      const existGood = state.cart.find(item => item.id === id);
      let arr: CartType[] = [];
      if (existGood) {
        // qty 증가
        arr = state.cart.map(item => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      } else {
        // state.cart 에 새 제품 추가, qty 는 1개
        arr = [...state.cart, { id, qty: 1 }];
      }
      return { ...state, cart: arr };
    }
    case ShopActionType.REMOVE_CART_ONE: {
      const { id } = action.payload;
      // id 제품이 배열에 있는가? qty 가 있는가?
      const existGood = state.cart.find(item => item.id === id);
      let arr: CartType[] = [];
      if (!existGood) {
        // 제품이 없다면?
        return state;
      } else {
        if (existGood.qty > 1) {
          // 제품이 1개 이상이면
          arr = state.cart.map(item => (item.id === id ? { ...item, qty: item.qty - 1 } : item));
        } else {
          // 제품이 1개 담겼어요.
          arr = state.cart.filter(item => item.id !== id);
        }
      }
      return { ...state, cart: arr };
    }
    case ShopActionType.CLEAR_CART_ITEM: {
      // 담겨진 제품 중에 장바구니에서 제거하기
      const { id } = action.payload;
      const arr = state.cart.filter(item => item.id !== id);
      return { ...state, cart: arr };
    }
    case ShopActionType.BUY_ALL: {
      // 총 금액 계산
      const total = calcTotal(state.cart, state.goods);
      if (total > state.balance) {
        alert('돈이 부족합니다. 장바구니를 줄이세요');
        return state;
      }
      return { ...state, balance: state.balance - total, cart: [] };
    }
    case ShopActionType.RESET: {
      return { ...state, cart: [] };
    }
    case ShopActionType.ADD_MONEY: {
      const total = 100000;
      return { ...state, balance: state.balance + total };
    }
    default:
      return state;
  }
}
```

- `/src/features/shop/ShopContext.tsx 파일` 생성

```tsx
import React, { createContext, useReducer } from 'react';
import type { ShopProviderProps, ShopValueType } from './types';
import { ShopActionType } from './types';
import { reducer } from './reducer';
import { initialState } from './state';

// 3. 컨텍스트 생성
export const ShopContext = createContext<null | ShopValueType>(null);

// 4. 프로바이더
export const ShopProvider = ({ children }: ShopProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
```

- `/src/features/shop/hooks` 폴더 생성
- `/src/features/shop/hooks/useShop.ts 파일` 생성

```ts
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
```

- `/src/features/shop/hooks/useShopSelectors.ts 파일` 생성

```ts
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
```

- 이후 작업한 모든곳에서 다시 import 해주기

### 2.2. `배럴(Barrel) 파일` 활용하기

- 여러 모듈에서 내보낸 것들을 모아서 하나의 파일에서 다시 내보내는 패턴
- 주로 `index.js` 나 `index.ts` 로 파일명을 정한다.
- 즉 `대표 파일` 이라고 한다.
- `/src/features/shop/index.ts 파일` 생성

```ts
export * from './types';
export { shopInitialState } from './state';
export { calcTotal } from './utils';
export { shopReducer } from './reducer';
export { ShopContext, ShopProvider } from './ShopContext';
export { useShop } from './hooks/useShop';
export { useShopSelects } from './hooks/useShopSelectors';
```

- App.tsx

```tsx
import React from 'react';
import { ShopProvider } from './features/shop';
import GoodList from './components/shop/GoodList';
import Cart from './components/shop/Cart';
import Wallet from './components/shop/Wallet';

function App() {
  // ts
  const page: React.CSSProperties = {
    maxWidth: 960,
    margin: '0 auto',
    padding: 24,
    background: '#eaeaea',
  };
  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: 20,
    alignItems: 'start',
  };
  // tsx
  return (
    <div style={page}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}> 🎁 Dorong's Shop</h1>
      <ShopProvider>
        <div style={grid}>
          <div>
            <GoodList />
          </div>
          <div>
            <Cart />
            <Wallet />
          </div>
        </div>
      </ShopProvider>
    </div>
  );
}

export default App;
```

- GoodList.tsx

```tsx
import React from 'react';
import { useShop } from '../../features/shop';
const GoodList = () => {
  const { goods, addCart } = useShop();
  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    background: '#fff',
    minHeight: 558,
  };
  const boxrow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  };
  return (
    <div style={box}>
      <h2>📝 GoodList</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {goods.map(item => (
          <li key={item.id} style={boxrow}>
            <span>
              <strong>{item.name} </strong> {item.price.toLocaleString()} 원
            </span>
            <button onClick={() => addCart(item.id)}>담기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoodList;
```

- Cart.tsx

```tsx
import React from 'react';
import { useShop, useShopSelects } from '../../features/shop';

const Cart = () => {
  // ts 자리
  const { balance, cart, removeCartOne, resetCart, clearCart, buyAll, addCart } = useShop();
  const { getGood, total } = useShopSelects();

  const box: React.CSSProperties = {
    border: '2px solid #eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    background: '#fff',
  };
  const boxrow: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px dashed #eee',
  };
  const buttonStyle: React.CSSProperties = {
    padding: 10,
  };
  // tsx 자리
  return (
    <div style={box}>
      <h2>🛒 장바구니</h2>
      {cart.length === 0 ? (
        <p>장바구니가 비었습니다.</p>
      ) : (
        <ul>
          {cart.map(item => {
            const good = getGood(item.id);
            return (
              <li key={item.id} style={boxrow}>
                <div>
                  <strong>{good?.name}</strong> x {item.qty}
                  <div>
                    {good?.price.toLocaleString()} x {item.qty} ={' '}
                    {(good!.price * item.qty).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={buttonStyle} onClick={() => addCart(item.id)}>
                    ➕
                  </button>
                  <button style={buttonStyle} onClick={() => removeCartOne(item.id)}>
                    ➖
                  </button>
                  <button style={buttonStyle} onClick={() => clearCart(item.id)}>
                    ❌
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>총액 :{total.toLocaleString()}</strong>
      </div>
      <button onClick={buyAll}>구매하기</button>
      <button onClick={resetCart}>장바구니 비우기</button>
    </div>
  );
};

export default Cart;
```

- Wallet.tsx

```tsx
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
```
