import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthCallback from './pages/AuthCallback';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SigninPage from './pages/SignInPage';
import TodosPage from './pages/TodosPage';
import Protected from './components/Protected';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import TodosInfinitePage from './pages/TodosInfinitePage';
import TodoList from './components/todos/TodoList';
import TodoListPage from './pages/todos/TodoListPage';
import TodoWritePage from './pages/todos/TodoWritePage';
import TodoEditPage from './pages/todos/TodoEditPage';
import TodoDetailPage from './pages/todos/TodoDetailPage';
import DirectChatPage from './pages/chat/DirectChatPage';
// 1:1 채팅 관련 css
import './components/chat/chat.css';

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
      className="nav"
    >
      <Link to={'/'} className="nav-link">
        홈
      </Link>

      {user ? (
        <>
          <Link className="nav-link" to={'/todos'}>
            할일
          </Link>
          <Link className="nav-link" to={'/todos-infinite'}>
            무한스크롤 할일
          </Link>
          <Link className="nav-link" to={'/chat'}>
            1 : 1 채팅
          </Link>
          <Link className="nav-link" to={'/profile'}>
            프로필
          </Link>
          <button onClick={signOut} className="btn btn-secondary btn-sm">
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Link className="nav-link" to={'/signup'}>
            회원가입
          </Link>
          <Link className="nav-link" to={'/signin'}>
            로그인
          </Link>
        </>
      )}
      {isAdmin && (
        <Link className="nav-link" to={'/admin'}>
          관리자
        </Link>
      )}
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">📕Todo Service</h1>
        </div>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
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
                  <TodoListPage />
                </Protected>
              }
            />
            <Route
              path="/todos/write"
              element={
                <Protected>
                  <TodoWritePage />
                </Protected>
              }
            />
            <Route
              path="/todos/edit/:id"
              element={
                <Protected>
                  <TodoEditPage />
                </Protected>
              }
            />
            <Route
              path="/todos/detail/:id"
              element={
                <Protected>
                  <TodoDetailPage />
                </Protected>
              }
            />
            <Route
              path="/todos-infinite"
              element={
                <Protected>
                  <TodosInfinitePage />
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
            {/* 1 : 1 채팅 */}
            <Route
              path="/chat"
              element={
                <Protected>
                  <DirectChatPage />
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
