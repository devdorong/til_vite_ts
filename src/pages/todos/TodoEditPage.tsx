import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import type { Profile, Todo } from '../../types/TodoType';
import { getProfile } from '../../lib/profile';
import { getTodoById } from '../../services/todoService';
import Loading from '../../components/Loading';

function TodoEditPage() {
  //ts
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTItle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  // 연속 처리 방지
  const [saving, setSaving] = useState(false);
  // 토글 처리
  const [toggleLoading, setToggleLoading] = useState(false);

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

  // 사용자 정보 가져오기
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProfile();
  }, [user?.id]);

  // Todo 정보 가져오기
  useEffect(() => {
    const loadTodo = async () => {
      if (!id) {
        navigate('/todos');
        return;
      }
      try {
        setLoading(true);
        const result = await getTodoById(parseInt(id));
        if (!result) {
          alert('해당 할 일을 찾을 수 없습니다.');
          navigate('/todos');
          return;
        }

        // 본인의 Todo 인지 확인
        if (result.user_id !== user?.id) {
          alert('수정 권한이 없습니다.');
          navigate('/todos');
          return;
        }
        setTodo(result);
        setTItle(result.title);
        if (result?.content) {
          setContent(result.content);
        }
      } catch (error) {
        console.log(`Todo 로드 실패 : ${error}`);
        alert(`할 일을 불러오는데 실패했습니다.`);
        navigate('/todos');
      } finally {
        setLoading(false);
      }
    };
    loadTodo();
  }, [id, user?.id, navigate]);

  if (loading) {
    return <Loading message="할 일 정보를 불러오는 중 ..." size="lg" />;
  }
  if (!todo) {
    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <h3>할 일을 찾을 수 없습니다.</h3>
        <button className="btn bt-primary" onClick={() => navigate('/todos')}>
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  //tsx
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title"> 할 일 수정하기</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 할 일</p>}
      </div>
      <div className="card">
        <div className="form-group">
          <label className="form-label">완료 상태</label>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              disabled={toggleLoading || saving}
              style={{
                cursor: toggleLoading || saving ? 'not-allowed' : 'pointer',
                transform: 'scale(1.3)',
                opacity: toggleLoading || saving ? 0.6 : 1,
              }}
            />
            <span>{todo.completed ? '✅ 완료됨' : '⏳ 진행 중'}</span>
            {toggleLoading && (
              <span style={{ color: 'var(--gray-500)', fontSize: '14px' }}>처리 중...</span>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            className="form-input"
            type="text"
            value={title}
            disabled={saving}
            placeholder="할일을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label">상세 내용</label>
          <textarea
            className="form-input"
            value={content}
            rows={6}
            placeholder="상세 내용을 입력하세요. (선택하세요)"
            disabled={saving}
          />
        </div>
        {/* 추가정보 출력 */}
        <div
          style={{
            padding: 'var(--space-4)',
            backgroundColor: 'var(--gray-50)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <h4 style={{ margin: '0 0 var(--space-3) 0', color: 'var(--gray-700)' }}>할일 정보</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>작성일 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {formatDate(todo.created_at)}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>수정일 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {formatDate(todo.updated_at)}
              </div>
            </div>
            <div>
              <span style={{ fontWeight: '500', color: 'var(--gray-600)' }}>작성자 :</span>
              <div style={{ color: 'var(--gray-600)', marginTop: 'var(--space-1)' }}>
                {profile?.nickname || user?.email}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'end' }}>
          <button className="btn btn-primary" disabled={saving || toggleLoading}>
            {saving ? '⏳ 수정 중...' : '수정'}
          </button>
          <button
            className="btn btn-secondary"
            disabled={saving || toggleLoading}
            onClick={() => navigate(`/todos/detail/${id}`)}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoEditPage;
