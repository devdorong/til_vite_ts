import { useEffect, useState } from 'react';
import TodosContent from '../components/todos/TodosContent';
import { useAuth } from '../contexts/AuthContext';
import { TodoProvider } from '../contexts/TodoContext';
import { getProfile } from '../lib/profile';
import type { Profile } from '../types/TodoType';

function TodosPage() {
  const { user } = useAuth();
  // 페이지 네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // 페이지 변경 함수
  const handleChagePage = (page: number) => {
    setCurrentPage(page);
  };

  const [profile, setProfile] = useState<null | Profile>(null);
  // 프로필 가져오기
  const loadProfile = async () => {
    try {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        if (!userProfile) {
          alert('탈퇴한 회원입니다. 관리자에게 문의하세요');
        }
        setProfile(userProfile);
      }
    } catch (error) {
      console.log('프로필 가져오기 Error : ', error);
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🎲할 일 관리</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 Todo 관리</p>}
      </div>
      <TodoProvider currentPage={currentPage} limit={itemsPerPage}>
        <TodosContent
          profile={profile}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handleChagePage={handleChagePage}
        />
      </TodoProvider>
    </div>
  );
}

export default TodosPage;
