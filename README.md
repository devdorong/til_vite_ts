# useState

## 기본 폴더 구조 생성

- /src/components 폴더 생성
- /src/components/Counter.jsx 생성
- 참고로 실제 프로젝트에서 tsx 가 어렵다면, jsx 로 작업 후 ai 에게 tsx 로 만들어줘. 해도 됨.

### ts 프로젝트에서 jsx 를 사용하도록 설정하기

- `tsconfig.app.json` 수정

```json
{
  "compilerOptions": {
    "composite": true, // ← 프로젝트 참조 사용 시 필요
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "allowJs": true,
    "checkJs": false,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- `.vscode/settings.json` 수정

```json
{
  "files.autoSave": "off",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "javascript.suggest.autoImports": true,
  "javascript.suggest.paths": true,

  // 워크스페이스 TS 사용(강력 권장)
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## useState 활용해 보기

```jsx
import { useState } from 'react';

const Counter = () => {
  const [number, setNumber] = useState(0);
  const add = () => {
    setNumber(number + 1);
  };
  const minus = () => {
    setNumber(number - 1);
  };
  const reset = () => {
    setNumber(0);
  };
  return (
    <div>
      <h2>Counter : {number}</h2>
      <button onClick={add}>증가</button>
      <button onClick={minus}>감소</button>
      <button onClick={reset}>리셋</button>
    </div>
  );
};

export default Counter;
```

- 위의 코드를 tsx 로 마이그레이션 진행
- 확장자를 tsx 로 변경

```tsx
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
```

- 사용자 이름 편집 기능 예제
- /src/components/NameEditor.jsx

```jsx
import { useState } from 'react';

function NameEditor() {
  const [name, setName] = useState('');
  const handleChange = e => {
    const temp = e.target.value;
    setName(temp);
  };
  const handleClick = () => {
    console.log('확인');
    setName('');
  };
  return (
    <div>
      <h1>NameEditor</h1>
      <h2>현재 이름 : {name}</h2>
      <input type="text" value={name} onChange={e => handleChange(e)} />
      <button onClick={handleClick}>수정</button>
    </div>
  );
}

export default NameEditor;
```

- tsx 로 마이그레이션

```tsx
import { useState } from 'react';
type NameEditorProps = {
  children?: React.ReactNode;
};
function NameEditor({}: NameEditorProps): JSX.Element {
  const [name, setName] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const temp = e.target.value;
    setName(temp);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter 입력함.');
      handleClick();
    }
  };
  const handleClick = (): void => {
    console.log('확인');
    setName('');
  };
  return (
    <div>
      <h1>NameEditor</h1>
      <h2>현재 이름 : {name}</h2>
      <input
        type="text"
        value={name}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleKeyDown(e)}
      />
      <button onClick={handleClick}>수정</button>
    </div>
  );
}

export default NameEditor;
```

- /src/components/User.jsx 생성

```jsx
import { useState } from 'react';

const User = () => {
  const [user, setUser] = useState({ name: '홍길동', age: 10 });
  const handleClick = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  return (
    <div>
      <h2>
        User : {user.name}님의 나이는 {user.age}살 입니다.
      </h2>
      <div>
        <button onClick={handleClick}>나이 증가</button>
      </div>
    </div>
  );
};

export default User;
```

- tsx 로 마이그레이션

```tsx
import { useEffect, useState } from 'react';

type UserProps = {
  name: string;
  age: number;
  children?: React.ReactNode;
};
export type UserType = {
  name: string;
  age: number;
};

const User = ({ name, age }: UserProps): JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);
  const handleClick = (): void => {
    if (user) {
      setUser({ ...user, age: user.age + 1 });
    }
  };
  useEffect(() => {
    setUser({ name, age });
  }, []);
  return (
    <div>
      {user ? (
        <>
          <h2>
            User : {user.name}님의 나이는 {user.age}살 입니다.
          </h2>
        </>
      ) : (
        <>
          <div>사용자 정보가 없습니다.</div>
        </>
      )}

      <div>
        <button onClick={handleClick}>나이 증가</button>
      </div>
    </div>
  );
};

export default User;
```

- 최종 App.tsx

```tsx
import Counter from './components/Counter';
import NameEditor from './components/NameEditor';
import User from './components/User';

function App() {
  return (
    <div>
      <h1>예제</h1>
      <Counter />
      <NameEditor />
      <User name={'홍길동'} age={10} />
    </div>
  );
}

export default App;
```

## 실습 todos 만들기

### 1. 파일 구조

- /src/components/todos 폴더 생성
- /src/components/todos/TodoList.jsx 파일 생성

```jsx
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleTodo, editTodo, deleteTodo }) => {
  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map(item => (
          <TodoItem
            key={item.id}
            todo={item}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

- /src/components/todos/TodoWrite.jsx 파일 생성

```jsx
import { useState } from 'react';

const TodoWrite = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const handleChange = e => {
    setTitle(e.target.value);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      // 저장하기
      handleSave();
    }
  };
  const handleSave = () => {
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

- /src/components/todos/TodoItem.jsx 파일 생성

```jsx
import { useState } from 'react';

const TodoItem = ({ todo, toggleTodo, editTodo, deleteTodo }) => {
  // js
  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const handleChangeTitle = e => {
    const temp = e.target.value;
    setEditTitle(temp);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      // 타이틀
    }
  };
  const handleEditSave = () => {
    if (editTitle.trim()) {
      editTodo(todo.id, editTitle);
      setEditTitle('');
      setIsEdit(false);
    }
  };
  const handleEditCancel = () => {
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

- App.jsx

```jsx
import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 초기값
const initialTodos = [
  { id: '1', title: '할일 1', completed: false },
  { id: '2', title: '할일 2', completed: true },
  { id: '3', title: '할일 3', completed: false },
];

function App() {
  // ts
  const [todos, setTodos] = useState(initialTodos);
  // todos 업데이트하기
  const addTodo = newTodo => {
    setTodos([newTodo, ...todos]);
  };
  // todo 토글하기
  const toggleTodo = id => {
    const arr = todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    setTodos(arr);
  };
  // todo 삭제하기
  const deleteTodo = id => {
    const arr = todos.filter(item => item.id !== id);
    setTodos(arr);
  };
  // todo 수정하기
  const editTodo = (id, editTitle) => {
    const arr = todos.map(item => (item.id === id ? { ...item, title: editTitle } : item));
    setTodos(arr);
  };
  // tsx
  return (
    <div>
      <h1>할일 웹 서비스</h1>
      <div>
        <TodoWrite addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
```

### 2. ts 마이그레이션

- /src/types 폴더 생성
- /src/types/TodoType.ts 파일 생성

```ts
export type TodoType = { id: string; title: string; completed: boolean };
```

- App.tsx 로 변경

```tsx
import { useState } from 'react';
import TodoWrite from './components/todos/TodoWrite';
import type { TodoType } from './types/TodoType';
import TodoList from './components/todos/TodoList';

// type
// export type TodoType = { id: string; title: string; completed: boolean };

// 초기값
const initialTodos: TodoType[] = [
  { id: '1', title: '할일 1', completed: false },
  { id: '2', title: '할일 2', completed: true },
  { id: '3', title: '할일 3', completed: false },
];

function App(): JSX.Element {
  // ts
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  // todos 업데이트하기
  const addTodo = (newTodo: TodoType): void => {
    setTodos([newTodo, ...todos]);
  };
  // todo 토글하기
  const toggleTodo = (id: string): void => {
    const arr = todos.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );
    setTodos(arr);
  };
  // todo 삭제하기
  const deleteTodo = (id: string): void => {
    const arr = todos.filter(item => item.id !== id);
    setTodos(arr);
  };
  // todo 수정하기
  const editTodo = (id: string, editTitle: string): void => {
    const arr = todos.map(item => (item.id === id ? { ...item, title: editTitle } : item));
    setTodos(arr);
  };
  // tsx
  return (
    <div>
      <h1>할일 웹 서비스</h1>
      <div>
        <TodoWrite addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
```

- TodoWrite.tsx 변경

```tsx
import { useState } from 'react';
import type { TodoType } from '../../types/TodoType';

type TodoWriteProps = {
  children?: React.ReactNode;
  addTodo: (newTodo: TodoType) => void;
};

const TodoWrite = ({ addTodo }: TodoWriteProps): JSX.Element => {
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
import type { TodoType } from '../../types/TodoType';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: TodoType[];
  toggleTodo: (id: string) => void;
  editTodo: (id: string, editTitle: string) => void;
  deleteTodo: (id: string) => void;
};

const TodoList = ({ todos, toggleTodo, editTodo, deleteTodo }: TodoListProps): JSX.Element => {
  return (
    <div>
      <h2>TodoList</h2>
      <ul>
        {todos.map((item: TodoType) => (
          <TodoItem
            key={item.id}
            todo={item}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
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

type TodoItemProps = {
  children?: React.ReactNode;
  todo: TodoType;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, editTitle: string) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem = ({ todo, toggleTodo, editTodo, deleteTodo }: TodoItemProps): JSX.Element => {
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
    }
  };
  const handleEditSave = (): void => {
    if (editTitle.trim()) {
      editTodo(todo.id, editTitle);
      setEditTitle('');
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
