import { Link } from 'react-router-dom';
import { useTodos } from '../../contexts/TodoContext';
import type { Todo } from '../../types/TodoType';

interface TodoItemBoxProps {
  children?: React.ReactNode;
  todo: Todo;
  index: number;
}
const TodoItemBox = ({ todo, index }: TodoItemBoxProps) => {
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
  return (
    <Link
      to={`/todos/detail/${todo.id}`}
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
    >
      {/* 출력 번호 */}
      <span className="todo-number">{globalIndex}</span>

      <div className="todo-content">
        <span
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          {todo.title}
        </span>
        <span className="todo-date">작성일 : {formatDate(todo.created_at)}</span>
      </div>
    </Link>
  );
};

export default TodoItemBox;
