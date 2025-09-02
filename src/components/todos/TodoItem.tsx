import React, { useState } from 'react';
import type { Todo } from '../../types/TodoType';
import { useTodos } from '../../contexts/TodoContext';
import {
  updateTodo as updateTodoService,
  toggleTodo as toggleTodoService,
  deleteTodo as deleteTodoService,
} from '../../services/todoService';

type TodoItemProps = {
  children?: React.ReactNode;
  todo: Todo;
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
  // 비동기로 DB 에 update 한다.
  const handleEditSave = async (): Promise<void> => {
    if (!editTitle.trim()) {
      return;
    }
    try {
      // DB 의 내용 업데이트
      const result = await updateTodoService(todo.id, { title: editTitle });
      if (result) {
        // context 의 state.todos 업데이트
        editTodo(todo.id, editTitle);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditCancel = (): void => {
    setEditTitle(todo.title);
    setIsEdit(false);
  };

  // 비동기 통신으로 toggle 업데이트
  const handleToggle = async (): Promise<void> => {
    try {
      // DB 의 completed 가 업데이트 성공시 Todo 타입 리턴
      const result = await toggleTodoService(todo.id, !todo.completed);
      if (result) {
        // context 의 state.todos 의 1개 항목 completed 업데이트
        toggleTodo(todo.id);
      }
    } catch (error) {
      console.log('데이터베이스 Toggle 이 실패하였어요.', error);
    }
  };
  // DB 의 데이터 delete
  const handleDelete = async (): Promise<void> => {
    try {
      // db 데이터 삭제
      await deleteTodoService(todo.id);
      // state 데이터 삭제
      deleteTodo(todo.id);
    } catch (error) {
      console.log(error);
    }
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
          <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
          <span>{todo.title}</span>
          <button onClick={() => setIsEdit(true)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
