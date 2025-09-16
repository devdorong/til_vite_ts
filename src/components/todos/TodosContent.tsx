import { useTodos } from '../../contexts/TodoContext';
import type { Profile } from '../../types/TodoType';
import Pagination from '../Pagination';
import TodoList from './TodoList';
import TodoListBox from './TodoListBox';
import TodoWrite from './TodoWrite';
import TodoWriteBox from './TodoWriteBox';

interface TodoContextProps {
  currentPage: number;
  itemsPerPage: number;
  handleChagePage: (page: number) => void;
  profile: Profile | null;
}
const TodosContent = ({
  currentPage,
  itemsPerPage,
  handleChagePage,
  profile,
}: TodoContextProps): JSX.Element => {
  // ts

  const { totalCount, totalPages } = useTodos();

  //tsx
  return (
    <div>
      <div>
        {/* 새글 등록시 1페이지로 이동 후 목록 새로고침 */}
        <TodoWriteBox profile={profile} />
      </div>
      <div>
        <TodoListBox />
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
