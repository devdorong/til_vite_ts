import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Profile, TodoInsert } from '../../types/TodoType';
import { getProfile } from '../../lib/profile';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { createTodo } from '../../services/todoService';
import RichTextEditor from '../../components/RichTextEditor';

interface TodoWritePageProps {
  children?: React.ReactNode;
}
function TodoWritePage({}: TodoWritePageProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 사용자 입력 내용
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 저장상태
  const [saving, setSaving] = useState<boolean>(false);

  // 프로필 가져오기
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProfile();
  }, [user?.id]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  // const handelContentChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
  //  setTitle(e.target.value);
  // };
  const handelContentChange = (value: string) => {
    setContent(value);
  };
  const handleSave = async () => {
    // 제목은 필수 입력
    if (!title.trim()) {
      alert('제목은 필수 입니다.');
      return;
    }
    try {
      setSaving(true);
      const newTodo: TodoInsert = { user_id: user!.id, title, content };
      const result = await createTodo(newTodo);
      if (result) {
        navigate('/todos');
        alert('할일이 성공적으로 등록되었습니다.');
      } else {
        alert('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.log(error);
      alert(`데이터 추가에 실패하였습니다. ${error}`);
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    // 사용자가 실수로 취소를 할 수 있으므로 이에 대비
    if (title.trim() || content.trim()) {
      if (window.confirm('작성중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        // 목록으로
        navigate('/todos');
      } else {
        return;
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title"> ✏️ 새 할일 작성</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 새로운 할 일</p>}
      </div>
      {/* 입력창 */}
      <div className="card">
        <div className="form-group">
          <label className="form-label">제목</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={e => handleTitleChange(e)}
            placeholder="제목을 입력해주세요."
            disabled={saving}
          />
        </div>
        <div className="form-group">
          <label className="form-label">상세 내용</label>
          {/* <textarea
            className="form-input"
            value={content}
            onChange={e => handelContentChange(e)}
            placeholder="내용을 입력해주세요. (선택사항)"
            rows={6}
            disabled={saving}
            onKeyDown={e => handleKeyDown(e)}
          /> */}
          <RichTextEditor
            value={content}
            onChange={handelContentChange}
            placeholder="내용을 입력해주세요. (선택사항)"
            disabled={saving}
          />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'end' }}>
          <button disabled={saving} onClick={handleSave} className="btn btn-primary">
            {saving ? '⏳ 등록 중...' : '등록'}
          </button>
          <button disabled={saving} onClick={handleCancel} className="btn btn-secondary">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoWritePage;
