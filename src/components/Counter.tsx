import { useState } from 'react';
type CounterProps = {
  children?: React.ReactNode;
};
type VoidFun = () => void;

const Counter = ({}: CounterProps): JSX.Element => {
  const [count, setCount] = useState<number>(0);
  const add: VoidFun = () => {
    setCount(count + 1);
  };
  const minus: VoidFun = () => {
    setCount(count - 1);
  };
  const reset: VoidFun = () => {
    setCount(0);
  };
  return (
    <div>
      <h2>Counter : {count}</h2>
      <button onClick={add}>증가</button>
      <button onClick={minus}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
};

export default Counter;
