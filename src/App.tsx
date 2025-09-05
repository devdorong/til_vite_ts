import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthCallback from './pages/AuthCallback';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SigninPage from './pages/SigninPage';
import TodosPage from './pages/TodosPage';
import Protected from './components/Protected';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

const TopBar = () => {
  const { signOut, user } = useAuth();
  // 관리자인 경우 메뉴 추가로 출력하기
  // isAdmin 에는 true/false
  const isAdmin = user?.email === 'dev.dorong@gmail.com';

  return (
    <nav
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: '0 auto',
        padding: '20px',
      }}
    >
      <Link to={'/'}>홈</Link>

      {user ? (
        <>
          <Link to={'/todos'}>할일</Link>
          <Link to={'/profile'}>프로필</Link>
          <button onClick={signOut}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to={'/signup'}>회원가입</Link>
          <Link to={'/signin'}>로그인</Link>
        </>
      )}
      {isAdmin && <Link to={'/admin'}>관리자</Link>}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <div>
        <h1>Todo Service</h1>
        <Router>
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/todos"
              element={
                <Protected>
                  <TodosPage />
                </Protected>
              }
            />

            <Route
              path="/profile"
              element={
                <Protected>
                  <ProfilePage />
                </Protected>
              }
            />
            <Route
              path="/admin"
              element={
                <Protected>
                  <AdminPage />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
