import React from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './contexts/TodoContext';
// type
// export type TodoType = { id: string; title: string; completed: boolean };

// 초기값
function App(): JSX.Element {
  // ts
  // tsx
  return (
    <div>
      <h1>할일 웹 서비스</h1>
      <TodoProvider>
        <div>
          <TodoWrite />
          <TodoList />
        </div>
      </TodoProvider>
    </div>
  );
}

export default App;
