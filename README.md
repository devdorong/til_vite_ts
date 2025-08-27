# Context API 와 useReducer

- useState 를 대체하고, props 를 줄여보자.

## 1. 기본폴더 구성 및 파일구조

- /src/contexts 폴더 생성
- /src/contexts/TodoContext.jsx 생성

```jsx
// 1. 초기값

import { createContext, useContext, useReducer } from 'react';

const initialState = {
  todos: [],
};

// 2. 리듀서
// action 은 {type:"문자열", payload: 재료} 형태
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { todo } = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    }
    case 'TOGGLE': {
      const { id } = action.payload;
      const arr = state.todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      return { ...state, todos: arr };
    }
    case 'DELETE': {
      const { id } = action.payload;
      const arr = state.todos.filter(item => item.id !== id);
      return { ...state, todos: arr };
    }
    case 'EDIT': {
      const { id, title } = action.payload;
      const arr = state.todos.map(item => (item.id === id ? { ...item, title } : item));
      return { ...state, todos: arr };
    }
    default:
      return state;
  }
}

// 3. context 생성
const TodoContext = createContext();
// 4. provider 생성
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // dispatch 를 이한 함수 표현식 모음
  const addTodo = newTodo => {
    dispatch({ type: 'ADD', payload: { todo: newTodo } });
  };
  const toggleTodo = id => {
    dispatch({ type: 'TOGGLE', payload: { id } });
  };
  const deleteTodo = id => {
    dispatch({ type: 'DELETE', payload: { id } });
  };
  const editTodo = (id, editTitle) => {
    dispatch({ type: 'EDIT', payload: { id, title: editTitle } });
  };
  // value 전달할 값
  const value = {
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
// 5. custom hook 생성
export function useTodos() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('컨텍스트가 없어요.');
  }
  return ctx;
}
```

- App.tsx 변경

```tsx
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
```

- TodoWrite.tsx 변경

```tsx
import { useState } from 'react';
import { useTodos } from '../../contexts/TodoContext';

type TodoWriteProps = {
  children?: React.ReactNode;
};

const TodoWrite = ({}: TodoWriteProps): JSX.Element => {
  // Context 를 사용함.
  const { addTodo } = useTodos();
  const [title, setTitle] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      // 저장하기
      handleSave();
    }
  };
  const handleSave = (): void => {
    if (title.trim()) {
      // 업데이트 시키기
      const newTodo = { id: Date.now().toString(), title: title, completed: false };
      addTodo(newTodo);
      setTitle('');
    }
  };
  return (
    <div>
      <h2>할일 작성</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <button onClick={handleSave}>등록</button>
      </div>
    </div>
  );
};

export default TodoWrite;
```

- TodoList.tsx 변경

```tsx
import { useTodos } from '../../contexts/TodoContext';
import type { TodoType } from '../../types/TodoType';
import TodoItem from './TodoItem';

type TodoListProps = {};

const TodoList = ({}: TodoListProps): JSX.Element => {
  // Context 를 사용함
  const { todos } = useTodos();
  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map((item: TodoType) => (
          <TodoItem key={item.id} todo={item} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

- TodoItem.tsx 변경

```tsx
import { useState } from 'react';
import type { TodoType } from '../../types/TodoType';
import { useTodos } from '../../contexts/TodoContext';

type TodoItemProps = {
  children?: React.ReactNode;
  todo: TodoType;
};

const TodoItem = ({ todo }: TodoItemProps): JSX.Element => {
  // Context 사용
  const { toggleTodo, editTodo, deleteTodo } = useTodos();
  // js
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const temp = e.target.value;
    setEditTitle(temp);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      // 타이틀
      handleEditSave();
    }
  };
  const handleEditSave = (): void => {
    if (editTitle.trim()) {
      editTodo(todo.id, editTitle);
      // setEditTitle('');
      setIsEdit(false);
    }
  };
  const handleEditCancel = (): void => {
    setEditTitle(todo.title);
    setIsEdit(false);
  };

  // jsx
  return (
    <li>
      {isEdit ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={e => handleChangeTitle(e)}
            onKeyDown={e => handleKeyDown(e)}
          />
          <button onClick={handleEditSave}>저장</button>
          <button onClick={handleEditCancel}>취소</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
          <span>{todo.title}</span>
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
```

## 2. TodoContext.jsx 마이그레이션

- 확장자 `tsx`로 변경

```tsx
import React, { createContext, useContext, useReducer, type PropsWithChildren } from 'react';
import type { TodoType } from '../types/TodoType';

// 1. 초기값
type TodosState = { todos: TodoType[] };
const initialState: TodosState = {
  todos: [],
};

// 2. 리듀서
// action 은 {type:"문자열", payload: 재료} 형태
enum TodoActionType {
  ADD = 'ADD',
  TOGGLE = 'TOGGLE',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
}
type ADDActionType = { type: TodoActionType.ADD; payload: { todo: TodoType } };
type TOGGLEActionType = { type: TodoActionType.TOGGLE; payload: { id: string } };
type DELETEActionType = { type: TodoActionType.DELETE; payload: { id: string } };
type EDITActionType = { type: TodoActionType.EDIT; payload: { id: string; title: string } };
type ActionType = ADDActionType | TOGGLEActionType | DELETEActionType | EDITActionType;

function reducer(state: TodosState, action: ActionType) {
  switch (action.type) {
    case TodoActionType.ADD: {
      const { todo } = action.payload;
      return { ...state, todos: [todo, ...state.todos] };
    }
    case TodoActionType.TOGGLE: {
      const { id } = action.payload;
      const arr = state.todos.map((item: TodoType) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      return { ...state, todos: arr };
    }
    case TodoActionType.DELETE: {
      const { id } = action.payload;
      const arr = state.todos.filter((item: TodoType) => item.id !== id);
      return { ...state, todos: arr };
    }
    case TodoActionType.EDIT: {
      const { id, title } = action.payload;
      const arr = state.todos.map((item: TodoType) => (item.id === id ? { ...item, title } : item));
      return { ...state, todos: arr };
    }
    default:
      return state;
  }
}
// 3. context 생성
type TodoContextvalue = {
  todos: TodoType[];
  addTodo: (newTodo: TodoType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, editTitle: string) => void;
};
const TodoContext = createContext<null | TodoContextvalue>(null);
// 4. provider 생성
type TodoProviderProps = {
  children?: React.ReactNode;
};
export const TodoProvider = ({ children }: TodoProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // dispatch 를 이한 함수 표현식 모음
  const addTodo = (newTodo: TodoType) => {
    dispatch({ type: TodoActionType.ADD, payload: { todo: newTodo } });
  };
  const toggleTodo = (id: string) => {
    dispatch({ type: TodoActionType.TOGGLE, payload: { id } });
  };
  const deleteTodo = (id: string) => {
    dispatch({ type: TodoActionType.DELETE, payload: { id } });
  };
  const editTodo = (id: string, editTitle: string) => {
    dispatch({ type: TodoActionType.EDIT, payload: { id, title: editTitle } });
  };
  // value 전달할 값
  const value = {
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
// 5. custom hook 생성
export function useTodos(): TodoContextvalue {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error('컨텍스트가 없어요.');
  }
  return ctx;
}
```
