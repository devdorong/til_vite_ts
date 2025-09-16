import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type PropsWithChildren,
} from 'react';

import type { Todo } from '../types/TodoType';
// 전체 DB 가져오기
import { getTodosPaginated } from '../services/todoService';

// 1. 초기값
type TodosState = { todos: Todo[]; totalCount: number; totalPages: number; currentPage: number };
const initialState: TodosState = {
  todos: [],
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
};

// 2. 리듀서
// action 은 {type:"문자열", payload: 재료} 형태
enum TodoActionType {
  ADD = 'ADD',
  TOGGLE = 'TOGGLE',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  // Supabase todos 의 목록읽기
  SET_TODOS = 'SET_TODOS',
}
type ADDAction = { type: TodoActionType.ADD; payload: { todo: Todo } };
type TOGGLEAction = { type: TodoActionType.TOGGLE; payload: { id: number } };
type DELETEAction = { type: TodoActionType.DELETE; payload: { id: number } };
type EDITAction = { type: TodoActionType.EDIT; payload: { id: number; title: string } };
// Supabase 목록으로 state.todos 배열을 를 채워라.
type SetTodosAction = {
  type: TodoActionType.SET_TODOS;
  payload: { todos: Todo[]; totalCount: number; totalPages: number; currentPage: number };
};
type ActionType = ADDAction | TOGGLEAction | DELETEAction | EDITAction | SetTodosAction;

function reducer(state: TodosState, action: ActionType) {
  switch (action.type) {
    case TodoActionType.ADD: {
      const { todo } = action.payload;
      return { ...state, todos: [todo, ...state.todos], totalCount: state.totalCount + 1 };
    }
    case TodoActionType.TOGGLE: {
      const { id } = action.payload;
      const arr = state.todos.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      );
      return { ...state, todos: arr };
    }
    case TodoActionType.DELETE: {
      const { id } = action.payload;
      const arr = state.todos.filter(item => item.id !== id);
      return { ...state, todos: arr, totalCount: Math.max(0, state.totalCount - 1) };
    }
    case TodoActionType.EDIT: {
      const { id, title } = action.payload;
      const arr = state.todos.map(item => (item.id === id ? { ...item, title } : item));
      return { ...state, todos: arr };
    }
    // Supabase 에 목록 읽기
    case TodoActionType.SET_TODOS: {
      const { todos, totalCount, totalPages, currentPage } = action.payload;
      return { ...state, todos, totalCount, totalPages, currentPage };
    }
    default:
      return state;
  }
}
// 3. context 생성
type TodoContextvalue = {
  todos: Todo[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
  itmesPerPage: number;
  addTodo: (newTodo: Todo) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, editTitle: string) => void;
  loadTodos: (page: number, limit: number) => void;
};
const TodoContext = createContext<null | TodoContextvalue>(null);
// 4. provider 생성

// 1. props 정의하기
// interface TodoProviderProps {
//   children?: React.ReactNode;
//   currentPage?: number;
//   limit?: number;
// }

// 2. 상속받아서 업데이트하기
interface TodoProviderProps extends PropsWithChildren {
  currentPage?: number;
  limit?: number;
}

export const TodoProvider = ({
  children,
  currentPage = 1,
  limit = 10,
}: TodoProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // dispatch 를 이한 함수 표현식 모음
  const addTodo = (newTodo: Todo) => {
    dispatch({ type: TodoActionType.ADD, payload: { todo: newTodo } });
  };
  const toggleTodo = (id: number) => {
    dispatch({ type: TodoActionType.TOGGLE, payload: { id } });
  };
  const deleteTodo = (id: number) => {
    dispatch({ type: TodoActionType.DELETE, payload: { id } });
  };
  const editTodo = (id: number, editTitle: string) => {
    dispatch({ type: TodoActionType.EDIT, payload: { id, title: editTitle } });
  };
  // 실행시 state {todos} 를 업데이트함.
  // reducer 함수를 실행함.
  const setTodos = (todos: Todo[], totalCount: number, totalPages: number, currentPage: number) => {
    dispatch({
      type: TodoActionType.SET_TODOS,
      payload: { todos, totalCount, totalPages, currentPage },
    });
  };
  // Supabase 의 목록 읽기 함수 표현식
  // 비동기 데이터베이스 접근
  // const loadTodos = async (): Promise<void> => {
  // try {
  //   const result = await getTodos();
  //   setTodos(result);
  // } catch (error) {
  //   console.log(error);
  // }
  // };
  const loadTodos = async (page: number, limit: number): Promise<void> => {
    try {
      const result = await getTodosPaginated(page, limit);
      // 현재 페이지가 비어있고 첫 페이지가 아니라면
      if (result.todos.length === 0 && result.totalPages > 0 && page === 1) {
        const prevPageResult = await getTodosPaginated(page - 1, limit);
        setTodos(
          prevPageResult.todos,
          prevPageResult.totalCount,
          prevPageResult.totalPages,
          prevPageResult.currentPage,
        );
      } else {
        setTodos(result.todos, result.totalCount, result.totalPages, result.currentPage);
      }
    } catch (error) {
      console.log(`목록 가져오기 오류 : ${error}`);
    }
  };

  // 페이지가 바뀌면 다시 실행하도록 해야 한다.
  useEffect(() => {
    loadTodos(currentPage, limit);
  }, [currentPage, limit]);
  // value 전달할 값
  const value: TodoContextvalue = {
    todos: state.todos,
    totalPages: state.totalPages,
    totalCount: state.totalCount,
    currentPage: state.currentPage,
    itmesPerPage: limit,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    loadTodos,
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
