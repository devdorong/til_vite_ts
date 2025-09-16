import { useAuth } from '../../contexts/AuthContext';
import { useTodos } from '../../contexts/TodoContext';
import TodoItemBox from './TodoItemBox';

const TodoListBox = () => {
  // 유저 정보
  const { user } = useAuth();
  // 전체 할일 목록 가져오기
  const { todos } = useTodos();
  return (
    <ul className="todo-list">
      {todos.map((item, index) => (
        <TodoItemBox key={index} todo={item} index={index} />
      ))}
    </ul>
  );
};

export default TodoListBox;
