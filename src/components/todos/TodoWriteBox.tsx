import { Link } from 'react-router-dom';
import type { Profile } from '../../types/TodoType';

interface TodoWriteBoxProps {
  children?: React.ReactNode;
  profile: null | Profile;
}
const TodoWriteBox = ({ profile }: TodoWriteBoxProps) => {
  return (
    <div className="card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        <h2 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>
          ✏️ 새 할일 작성
          {profile?.nickname && (
            <span
              style={{ marginLeft: 'var(--space-2)', fontSize: '16px', color: 'var(--gray-600)' }}
            >
              {profile.nickname}
            </span>
          )}
        </h2>
        <Link to={'/todos/write'} className="btn btn-primary">
          작성하기
        </Link>
      </div>
    </div>
  );
};

export default TodoWriteBox;
