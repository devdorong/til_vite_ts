import { useTodos } from '../../contexts/TodoContext';
import Pagination from '../Pagination';
import TodoList from './TodoList';
import TodoWrite from './TodoWrite';

interface TodoContextProps {
  currentPage: number;
  itemsPerPage: number;
  handleChagePage: (page: number) => void;
}
const TodosContent = ({
  currentPage,
  itemsPerPage,
  handleChagePage,
}: TodoContextProps): JSX.Element => {
  // ts

  const { totalCount, totalPages } = useTodos();

  //tsx
  return (
    <div>
      <div>
        {/* 새글 등록시 1페이지로 이동 후 목록 새로고침 */}
        <TodoWrite handleChagePage={handleChagePage} />
      </div>
      <div>
        <TodoList />
      </div>
      <div>
        <Pagination
          totalCount={totalCount}
          totalPages={totalPages}
          currentPage={currentPage}
          itmesPerPage={itemsPerPage}
          handleChagePage={handleChagePage}
        />
      </div>
    </div>
  );
};

export default TodosContent;
