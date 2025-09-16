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
  index: number;
};

const TodoItem = ({ todo, index }: TodoItemProps): JSX.Element => {
  // Context 사용
  const { toggleTodo, editTodo, deleteTodo, currentPage, itmesPerPage, totalCount } = useTodos();
  // 순서 번호 매기기
  const globalIndex = totalCount - ((currentPage - 1) * itmesPerPage + index);

  // 작성 날짜 포맷팅
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '날짜 없음';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  // js
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(todo.title);

  // 개별 액션 로딩 상태 (편집 중인지, 토글 중인지, 삭제 중인지)
  const [actionLoading, setActionLoading] = useState<{
    edit: boolean;
    toggle: boolean;
    delete: boolean;
  }>({ edit: false, toggle: false, delete: false });

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
      // 수정 진행 중
      setActionLoading({ ...actionLoading, edit: true });
      // DB 의 내용 업데이트
      const result = await updateTodoService(todo.id, { title: editTitle });
      if (result) {
        // context 의 state.todos 업데이트
        editTodo(todo.id, editTitle);
        setIsEdit(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading({ ...actionLoading, edit: false });
    }
  };
  const handleEditCancel = (): void => {
    setEditTitle(todo.title);
    setIsEdit(false);
  };

  // 비동기 통신으로 toggle 업데이트
  const handleToggle = async (): Promise<void> => {
    try {
      // toggle 진행 중
      setActionLoading({ ...actionLoading, toggle: true });
      // DB 의 completed 가 업데이트 성공시 Todo 타입 리턴
      const result = await toggleTodoService(todo.id, !todo.completed);
      if (result) {
        // context 의 state.todos 의 1개 항목 completed 업데이트
        toggleTodo(todo.id);
      }
    } catch (error) {
      console.log('데이터베이스 Toggle 이 실패하였어요.', error);
    } finally {
      // toggle 진행 중
      setActionLoading({ ...actionLoading, toggle: false });
    }
  };
  // DB 의 데이터 delete
  const handleDelete = async (): Promise<void> => {
    try {
      // 삭제 진행됨.
      setActionLoading({ ...actionLoading, delete: true });
      // db 데이터 삭제
      await deleteTodoService(todo.id);
      // state 데이터 삭제
      deleteTodo(todo.id);
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading({ ...actionLoading, delete: false });
    }
  };

  // jsx
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* 출력 번호 */}
      <span className="todo-number">{globalIndex}</span>
      {isEdit ? (
        <>
          <div className="todo-content">
            <input
              type="text"
              value={editTitle}
              onChange={e => handleChangeTitle(e)}
              onKeyDown={e => handleKeyDown(e)}
              className="form-input"
              style={{ fontSize: '14px', padding: 'var(--space-2)', width: '100%' }}
            />
            <span className="todo-date">작성일 : {formatDate(todo.created_at)}</span>
          </div>
          <div className="todo-actions">
            <button
              className="btn btn-success btn-sm"
              onClick={handleEditSave}
              disabled={actionLoading.edit}
            >
              {actionLoading.edit ? '⏳ 저장 중...' : '저장'}
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleEditCancel}
              disabled={actionLoading.edit}
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            disabled={actionLoading.toggle}
            style={{
              cursor: actionLoading.toggle ? 'not-allowed' : 'pointer',
              opacity: actionLoading.toggle ? 0.6 : 1,
            }}
          />
          <div className="todo-content">
            <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
            <span className="todo-date">작성일 : {formatDate(todo.created_at)}</span>
          </div>
          <div className="todo-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsEdit(true)}
              disabled={actionLoading.toggle || actionLoading.delete}
            >
              수정
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleDelete}
              disabled={actionLoading.toggle || actionLoading.delete}
            >
              {actionLoading.delete ? '⏳ 삭제 중...' : '삭제'}
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
