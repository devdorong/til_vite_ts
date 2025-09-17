# 스타일 정리

## 1. css 기본 코드

- /src/index.css 업데이트

```css
/* ===== CSS Reset & Base Styles ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}

html {
  /* 가로 스크롤은 일반적으로 x 만 가림 */
  overflow-x: hidden;
  font-size: 16px;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f8fafc;
  color: #1e293b;
  line-height: 1.6;
}

/* ===== Link Styles ===== */
a {
  text-decoration: none;
  color: #3b82f6;
  /* 중간단계에서 색상은 0.2초 동안 부드럽게 변함 */
  transition: color 0.2s ease;
}

a:hover {
  color: #1e40af;
}

a:focus {
  color: #1e40af;
  /* var 는 css 에서 변수 사용하는 경우 */
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* 버튼 클래스를 가진 링크는 색상 변경하지 않음 */
a.btn {
  /* inherit 은 상속으로서 색상을 지정된 것으로 사용한다. */
  color: inherit;
}

a.btn:hover {
  color: inherit;
}

a.btn:focus {
  color: inherit;
}

/* ===== List Styles ===== */
/* 통상 ul 은 모양없이 진행함. */
/*  ol 은 order-list로서 순서가 있는 목록 */
ul,
li {
  list-style: none;
}

/* ===== Button Base Styles ===== */
button {
  font-family: inherit;
  /* 버튼은 보통 마우스 커서를 pointer 설정 */
  cursor: pointer;
  border: none;
  border-radius: 8px;
  /* color 뿐만 아니라 모든 css 속성을 0.2s 동안 효과 */
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  /* 버튼의 마우스 커ㅓㅅ 오버시 보이는 모양 */
  cursor: not-allowed;
}

/* ===== Input Base Styles ===== */
input,
textarea {
  font-family: inherit;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 12px;
  /* 중간모션 설정에서 여러개를 조금씩 적용이 다를 때 */
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:focus,
textarea:focus {
  outline: none;
  /* css 변수 사용하기 : var(변수명) */
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* ===== Design System Variables ===== */
/* css 에서 변수 만들때 */
:root {
  /* Colors */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-300: #93c5fd;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;

  --success-50: #ecfdf5;
  --success-300: #6ee7b7;
  --success-500: #10b981;
  --success-600: #059669;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  /* Spacing */
  /* rem 은 html 의 폰트사이즈를 기준으로 배수로 계산 */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  /* 1rem 이 현재는 16px */
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

/* ===== Utility Classes ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  padding: var(--space-6);
  margin-bottom: var(--space-6);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--primary-500);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-600);
  color: white;
}

.btn-primary:focus {
  background-color: var(--primary-600);
  color: white;
  outline: 2px solid var(--primary-300);
  outline-offset: 2px;
}

.btn-success {
  background-color: var(--success-500);
  color: white;
}

.btn-success:hover {
  background-color: var(--success-600);
  color: white;
}

.btn-success:focus {
  background-color: var(--success-600);
  color: white;
  outline: 2px solid var(--success-300);
  outline-offset: 2px;
}

.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
}

.btn-secondary:hover {
  background-color: var(--gray-200);
  color: var(--gray-700);
}

.btn-secondary:focus {
  background-color: var(--gray-200);
  color: var(--gray-700);
  outline: 2px solid var(--gray-400);
  outline-offset: 2px;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
  color: white;
}

.btn-danger:focus {
  background-color: #c82333;
  color: white;
  outline: 2px solid #f5c6cb;
  outline-offset: 2px;
}

.btn-sm {
  padding: var(--space-1) var(--space-3);
  font-size: 12px;
}

.btn-lg {
  padding: var(--space-3) var(--space-6);
  font-size: 16px;
}

/* ===== Form Styles ===== */
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
  color: var(--gray-700);
}

.form-input {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: 14px;
}

.form-input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  outline: none;
}

/* ===== Layout Components ===== */
.page-header {
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
  text-align: center;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--gray-600);
}

/* ===== Todo Specific Styles ===== */
.todo-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  margin-bottom: var(--space-2);
  transition: all 0.2s ease;
}

.todo-item:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gray-300);
}

.todo-item.completed {
  opacity: 0.7;
  background-color: var(--gray-50);
}

.todo-number {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: var(--primary-600);
  font-size: 14px;
}

.todo-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-title {
  font-size: 14px;
  color: var(--gray-900);
}

.todo-title.completed {
  /* line-through 중간 취소선 */
  text-decoration: line-through;
  color: var(--gray-500);
}

.todo-date {
  font-size: 12px;
  color: var(--gray-500);
  font-style: italic;
}

.todo-actions {
  display: flex;
  gap: var(--space-2);
}

/* ===== Navigation Styles ===== */
.nav {
  display: flex;
  gap: var(--space-6);
  /* 영역의 오른쪽 끝으로 정렬할 때 */
  justify-content: flex-end;
  padding: var(--space-6) var(--space-8);
  background: white;
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-6);
}

.nav-link {
  color: var(--gray-600);
  font-weight: 500;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-800);
  background-color: var(--primary-100);
}

.nav-link:focus {
  color: var(--primary-800);
  background-color: var(--primary-100);
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* ===== Loading States ===== */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--gray-500);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  background: white;
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  min-width: 200px;
}

.loading-text {
  color: var(--gray-600);
  font-weight: 500;
  text-align: center;
}

.spinner {
  position: relative;
  border: 2px solid var(--gray-200);
  border-top: 2px solid var(--primary-500);
  border-radius: 50%;
  /* animation : 모션이름 모션시간 시간왜곡 무한루프 */
  animation: spin 1s linear infinite;
}

.spinner-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  border: 1px solid var(--primary-300);
  border-top: 1px solid var(--primary-600);
  border-radius: 50%;
  /* animation : 모션이름 모션시간 시간왜곡 무한루프 모션반대로진행 */
  animation: spin 0.5s linear infinite reverse;
}

/* Legacy loading class for backward compatibility */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);
  color: var(--gray-500);
}

/* 사용자가 애니메이션을 지정해서 진행함 */
/* https://animate.style/ 를 활용하길 권장 */
@keyframes spin {
  /* 0% : 애니메이션 시작 css */
  0% {
    transform: rotate(0deg);
  }
  /* 100% : 애니메이션 마무리 css */
  100% {
    transform: rotate(360deg);
  }
}

/* Loading skeleton for better UX */
.loading-skeleton {
  background: linear-gradient(90deg, var(--gray-200) 25%, var(--gray-100) 50%, var(--gray-200) 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Todo item loading skeleton */
.todo-skeleton {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  margin-bottom: var(--space-2);
}

.todo-skeleton .skeleton-number {
  width: 30px;
  height: 20px;
}

.todo-skeleton .skeleton-checkbox {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
}

.todo-skeleton .skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.todo-skeleton .skeleton-title {
  width: 70%;
  height: 16px;
}

.todo-skeleton .skeleton-date {
  width: 50%;
  height: 12px;
}

.todo-skeleton .skeleton-actions {
  display: flex;
  gap: var(--space-2);
}

.todo-skeleton .skeleton-button {
  width: 60px;
  height: 32px;
  border-radius: var(--radius-md);
}

/* ===== Responsive Design ===== */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-3);
  }

  .nav {
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4);
  }

  .todo-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .todo-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .page-title {
    font-size: 1.5rem;
  }
}

/* ===== Admin Page Styles ===== */
.admin-request-item {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.admin-request-item:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gray-300);
}

.admin-request-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--gray-200);
}

.admin-status-badge {
  background-color: var(--primary-100);
  color: var(--primary-700);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 500;
}

.admin-request-details {
  margin-bottom: var(--space-4);
}

.admin-detail-row {
  display: flex;
  margin-bottom: var(--space-2);
  align-items: flex-start;
}

.admin-detail-label {
  font-weight: 500;
  color: var(--gray-700);
  min-width: 100px;
  margin-right: var(--space-3);
}

.admin-detail-value {
  color: var(--gray-600);
  flex: 1;
  word-break: break-all;
}

.admin-request-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  padding-top: var(--space-3);
  border-top: 1px solid var(--gray-200);
}

/* ===== Legacy Styles (to be removed) ===== */
.sports-event {
  background-color: #f08080 !important;
  color: #fff !important;
}
.science-event {
  background-color: #4682b4 !important;
  color: #fff !important;
}
```

## 2. App.tsx css 정리

```tsx
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
import TodosInfinitePage from './pages/TodosInfinitePage';

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
```

## 3. /src/pages/HomePage.tsx 정리

```tsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function HomePage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">😜 홈</h2>
        <p className="page-subtitle">
          {user ? `${user.email}님, 환영합니다.` : 'Todo 서비스에 오신 것을 환영합니다.'}
        </p>
      </div>
      {user ? (
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>📒 할일 관리</h3>
          <p style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-600)' }}>
            ✒️ 효율적으로 할 일을 관리하고 생산성을 높여보세요.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to={'/todos'} className="btn btn-primary btn-lg">
              할 일 관리하기
            </Link>
            <Link to={'/todos-infinite'} className="btn btn-success btn-lg">
              무한 스크롤로 보기
            </Link>
          </div>
        </div>
      ) : (
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>🚀 시작하기</h3>
          <p style={{ marginBottom: 'var(--space-6)', color: 'var(--gray-600)' }}>
            ✍️ 계정을 만들고 할 일 관리를 시작해보세요.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to={'/signin'} className="btn btn-primary btn-lg">
              😘 로그인
            </Link>
            <Link to={'/signup'} className="btn btn-success btn-lg">
              💑 회원가입
            </Link>
          </div>
        </div>
      )}
      {/* 기능 소개 섹션 */}
      <div className="card">
        <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>🏷️ 주요 기능</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--sapce-2)' }}>📃</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>할 일 관리</h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              할 일을 추가, 수정, 삭제하고 완료 상태를 관리할 수 있습니다.
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--sapce-2)' }}>💎</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>
              무한 스크롤
            </h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              많은 할 일을 효율적으로 탐색할 수 있는 무한 스크롤 기능을 제공합니다.
            </p>
          </div>

          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 'var(--sapce-2)' }}>🥻</div>
            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--gray-800)' }}>
              프로필 관리
            </h4>
            <p style={{ color: 'var(--gray-800)', fontSize: '14px' }}>
              개인 정보와 아바타를 관리하고 계정을 안전하게 관리할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      {/* 추가 기능 소개 섹션 */}
      {user && (
        <>
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)', color: 'var(--gray-800)' }}>
              🎸 추가 기능
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-4)',
              }}
            >
              <Link
                to={'/profile'}
                className="btn btn-secondary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                🔑프로필 관리
              </Link>
              <Link
                to={'/profile'}
                className="btn btn-secondary"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                📆캘린더
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
```

## 4. /src/pages/SignUpPage.tsx 정리

```tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { createProfile } from '../lib/profile';
import type { ProfileInsert } from '../types/TodoType';

function SignUpPage() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [msg, setMsg] = useState<string>('');

  // 추가 정보
  const [nickName, setNickName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 웹브라우저 갱신 방지
    e.preventDefault();
    if (!email.trim()) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (!pw.trim()) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    if (pw.length < 6) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    if (!nickName.trim()) {
      alert('닉네임을 입력하세요.');
      return;
    }

    // 회원가입 하기
    const { error, data } = await supabase.auth.signUp({
      email,
      password: pw,
      options: {
        // 회원가입 후 이메일로 인증 확인시 리다이렉트 될 URL
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        // 잠시 추가정보를 보관합니다.
        // supabase 에서 auth 에는 추가적인 정보를 저장하는 객체가 존재
        // 공식적인 명칭이 metadata 라고 합니다.
        // 이메일 인증 후에 프로필 생성시에 사용하려고 보관
        data: { nickName: nickName },
      },
    });
    if (error) {
      setMsg(`회원가입 오류 : ${error}`);
    } else {
      // 회원가입 성공했으므로 profiles 도 채워준다.
      setMsg(
        '회원가입이 성공했습니다. 이메일 인증 링크를 확인해주세요. 인증 완료후 프로필이 자동으로 생성됩니다.',
      );

      // if (data.user?.id) {
      //   // 프로필을 추가한다
      //   const newUser: ProfileInsert = { id: data.user.id, nickname: nickName };
      //   const result = await createProfile(newUser);
      //   if (result) {
      //     // 프로필 추가가 성공한 경우
      //     setMsg('회원가입 및 프로필 생성 성공했습니다. 이메일 인증 링크를 확인해 주세요');
      //   } else {
      //     setMsg(`회원가입은 성공, 하지만, 프로필 생성 실패했습니다`);
      //   }
      // }
      // setMsg(`회원가입 성공했습니다. 이메일 인증 링크를 확인해 주세요`);
    }
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">회원가입</h2>
        <p className="page-subtitle">새 계정을 만들어 보세요.</p>
      </div>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>{' '}
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호를 입력해주세요 (최소 6자)"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">닉네임</label>{' '}
            <input
              type="text"
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              placeholder="닉네임을 입력해주세요"
              className="form-input"
              required
            />
          </div>

          <button type="submit" style={{ width: '100%' }} className="btn btn-success btn-lg">
            회원가입
          </button>
        </form>
        {/* 메시지 출력 */}
        {msg && (
          <p
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: msg.includes('성공') ? 'var(--success-50)' : '#fef2f2',
              color: msg.includes('성공') ? 'var(--success-600)' : '#dc2626',
              border: `1px solid ${msg.includes('성공') ? 'var(--success-600)' : '#dc2626'}`,
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
```

## 5. /src/pages/SignInPage.tsx 정리

```tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function SigninPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await signIn(email, pw);
    if (error) {
      setMsg(`로그인 오류 : ${error}`);
    } else {
      setMsg('로그인 성공');
      navigate('/todos');
    }
  };
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">🔒로그인 페이지</h2>
        <p className="page-subtitle">계정에 로그인하세요.</p>
      </div>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <button style={{ width: '100%' }} type="submit" className="btn btn-primary btn-lg">
            로그인
          </button>
        </form>
        {/* 메시지 출력 */}
        {msg && (
          <p
            style={{
              marginTop: 'var(--space-4)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: msg.includes('성공') ? 'var(--success-50)' : '#fef2f2',
              color: msg.includes('성공') ? 'var(--success-600)' : '#dc2626',
              border: `1px solid ${msg.includes('성공') ? 'var(--success-600)' : '#dc2626'}`,
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default SigninPage;
```

## 6. /src/pages/TodosPage.tsx 정리

```tsx
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
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          handleChagePage={handleChagePage}
        />
      </TodoProvider>
    </div>
  );
}

export default TodosPage;
```

## 7. /src/pages/TodoInfinitePage.tsx 정리

```tsx
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../contexts/AuthContext';
import { InfiniteScrollProvider, useInfiniteScroll } from '../contexts/InfiniteScrollContext';
import { getProfile } from '../lib/profile';
import type { Profile } from '../types/TodoType';
// 용서하세요. 입력창 컴포넌트
const InfiniteTodoWrite = () => {
  const { addTodo, loadingInitialTodos } = useInfiniteScroll();

  const [title, setTitle] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  const handleSave = async (): Promise<void> => {
    if (!title.trim()) {
      alert('제목을 입력하세요');
      return;
    }
    try {
      // 새할일 추가
      await addTodo(title);
      // 다시 데이터를 로딩한다.
      await loadingInitialTodos();
      setTitle('');
    } catch (error) {
      console.log('등록에 오류가 발생 : ', error);
      alert(`등록에 오류가 발생 : ${error}`);
    }
  };
  return (
    <div className="card">
      <h3
        style={{
          margin: '0 0 15px 0',
          color: 'var(--gray-900)',
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        ✏️ 할일 작성
      </h3>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={title}
          onChange={e => handleChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="할일을 입력하세요."
          className="form-input"
          style={{ flex: 1 }}
        />
        <button onClick={handleSave} className="btn btn-primary">
          등록
        </button>
      </div>
    </div>
  );
};

// 용서하세요. 목록 컴포넌트
const InfiniteTodoList = () => {
  const {
    loading,
    loadingMore,
    hasMore,
    loadMoreTodos,
    todos,
    totalCount,
    editTodo,
    toggleTodo,
    deleteTodo,
    loadingInitialTodos,
  } = useInfiniteScroll();
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  // 사용자 프로필 가져오기
  useEffect(() => {
    const loadProifle = async () => {
      if (user?.id) {
        const userProfile = await getProfile(user.id);
        setProfile(userProfile);
      }
    };
    loadProifle();
  }, [user?.id]);

  // 번호 계산 함수 (최신글이 높은 번호가지도록 )
  const getGlobalIndex = (index: number) => {
    // 무한스크롤시에 계산 해서 번호 출력
    const globalIndex = totalCount - index;
    // console.log(
    //   `번호 계산 - index : ${index}, totalCount : ${totalCount}, globalIndex: ${globalIndex}`,
    // );
    return globalIndex;
  };

  // 날짜 포맷팅 함수
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

  // 수정 상태 관리
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  // 개별 액션 로딩 상태 관리
  const [actionLoading, setActionLoading] = useState<{
    [key: number]: {
      edit: boolean;
      toggle: boolean;
      delete: boolean;
    };
  }>({});

  // 수정 시작
  const handleEditStart = (todo: any) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  const handleEditSave = async (id: number) => {
    if (!editingTitle.trim()) {
      alert('제목을 입력하세요.');
      return;
    }

    try {
      // 수정 진행 중
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], edit: true },
      }));

      await editTodo(id, editingTitle);
      setEditingId(null);
      setEditingTitle('');
    } catch (error) {
      console.log('수정 실패:', error);
      alert('수정에 실패했습니다.');
    } finally {
      // 수정 완료
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], edit: false },
      }));
    }
  };

  const handleToggle = async (id: number) => {
    try {
      // 토글 진행 중
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], toggle: true },
      }));

      await toggleTodo(id);
    } catch (error) {
      console.log('토글 실패:', error);
      alert('상태 변경에 실패하였습니다.');
    } finally {
      // 토글 완료
      setActionLoading(prev => ({
        ...prev,
        [id]: { ...prev[id], toggle: false },
      }));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // 삭제 진행 중
        setActionLoading(prev => ({
          ...prev,
          [id]: { ...prev[id], delete: true },
        }));

        await deleteTodo(id);
        // 삭제 이후에 번호를 갱신해서 정리해줌
        await loadingInitialTodos();
      } catch (error) {
        console.log('삭제 실패:', error);
        alert('삭제에 실패하였습니다.');
      } finally {
        // 삭제 완료
        setActionLoading(prev => ({
          ...prev,
          [id]: { ...prev[id], delete: false },
        }));
      }
    }
  };

  if (loading) {
    return <div className="loading-container">데이터 로딩중 ...</div>;
  }

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid var(--gray-200)',
          backgroundColor: 'var(--gray-50)',
        }}
      >
        <h3
          style={{
            margin: '0',
            color: 'var(--gray-900)',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          📋 TodoList(무한 스크롤)
          {profile?.nickname && (
            <span
              style={{
                marginLeft: '8px',
                fontSize: '14px',
                color: 'var(--gray-600)',
                fontWeight: '400',
              }}
            >
              {profile.nickname}님의 할일
            </span>
          )}
        </h3>
      </div>

      {todos.length === 0 ? (
        <div className="loading-container">등록된 할일이 없습니다.</div>
      ) : (
        // 무한 스크롤 라이브러리 적용
        <div style={{ height: '500px', overflow: 'auto' }}>
          <InfiniteScroll
            dataLength={todos.length}
            next={loadMoreTodos}
            hasMore={hasMore}
            height={500}
            loader={<div className="loading-container">데이터를 불러오는 중...</div>}
            endMessage={
              <div
                style={{
                  textAlign: 'center',
                  padding: '20px',
                  color: 'var(--success-500)',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                모든 데이터를 불러왔습니다.
              </div>
            }
          >
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {todos.map((item, index) => {
                const itemLoading = actionLoading[item.id] || {
                  edit: false,
                  toggle: false,
                  delete: false,
                };

                return (
                  <li
                    key={item.id}
                    className={`todo-item ${item.completed ? 'completed' : ''}`}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : 'var(--gray-50)',
                      opacity: itemLoading.edit || itemLoading.delete ? 0.7 : 1,
                    }}
                  >
                    {/* 번호표시 */}
                    <span className="todo-number">{getGlobalIndex(index)}</span>

                    {editingId === item.id ? (
                      <>
                        {/* 수정 모드 */}
                        <div className="todo-content">
                          <input
                            type="text"
                            value={editingTitle}
                            onChange={e => setEditingTitle(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                handleEditSave(item.id);
                              } else if (e.key === 'Escape') {
                                handleEditCancel();
                              }
                            }}
                            className="form-input"
                            style={{
                              fontSize: '14px',
                              padding: 'var(--space-2)',
                              width: '100%',
                              marginBottom: '4px',
                            }}
                            disabled={itemLoading.edit}
                            autoFocus
                          />
                          <span className="todo-date">작성일: {formatDate(item.created_at)}</span>
                        </div>

                        <div className="todo-actions">
                          <button
                            onClick={() => handleEditSave(item.id)}
                            className="btn btn-success btn-sm"
                            disabled={itemLoading.edit}
                          >
                            {itemLoading.edit ? '⏳ 저장 중...' : '✅ 저장'}
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="btn btn-secondary btn-sm"
                            disabled={itemLoading.edit}
                          >
                            ❌ 취소
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* 일반 모드 */}
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggle(item.id)}
                          disabled={itemLoading.toggle}
                          style={{
                            transform: 'scale(1.2)',
                            cursor: itemLoading.toggle ? 'not-allowed' : 'pointer',
                            opacity: itemLoading.toggle ? 0.6 : 1,
                          }}
                        />

                        <div className="todo-content">
                          <span className={`todo-title ${item.completed ? 'completed' : ''}`}>
                            {item.title}
                          </span>
                          <span className="todo-date">작성일: {formatDate(item.created_at)}</span>
                        </div>

                        <div className="todo-actions">
                          <button
                            onClick={() => handleEditStart(item)}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: '#ffc107',
                              color: '#212529',
                            }}
                            disabled={itemLoading.toggle || itemLoading.delete}
                          >
                            ✏️ 수정
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="btn btn-danger btn-sm"
                            disabled={itemLoading.toggle || itemLoading.delete}
                          >
                            {itemLoading.delete ? '⏳ 삭제 중...' : '🗑️ 삭제'}
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

function TodosInfinitePage() {
  return (
    <InfiniteScrollProvider itemsPerPage={10}>
      <div>
        <div className="page-header">
          <h2 className="page-title">🔄 무한 스크롤 Todo 목록</h2>
          <p className="page-subtitle">스크롤하여 더 많은 할일을 확인하세요</p>
        </div>

        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <InfiniteTodoWrite />
          </div>

          <div>
            <InfiniteTodoList />
          </div>
        </div>
      </div>
    </InfiniteScrollProvider>
  );
}

export default TodosInfinitePage;
```

# 라우터 정리(할일을 별도 페이지로)

## 1. 할일 목록 페이지

- /src/pages/TodoListPage.tsx

```tsx
import { useEffect, useState } from 'react';
import TodosContent from '../../components/todos/TodosContent';
import { useAuth } from '../../contexts/AuthContext';
import { TodoProvider } from '../../contexts/TodoContext';
import { getProfile } from '../../lib/profile';
import type { Profile } from '../../types/TodoType';

function TodoListPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

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

  // 페이지 네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  // 페이지 변경 함수
  const handleChagePage = (page: number) => {
    setCurrentPage(page);
  };

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

export default TodoListPage;
```

- /src/components/todos/TodoListBox.tsx 생성

```tsx
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
```

- /src/components/todos/TodoItemBox.tsx 생성

```tsx
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
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* 출력 번호 */}
      <span className="todo-number">{globalIndex}</span>

      <div className="todo-content">
        <Link
          to={`/todos/detail/${todo.id}`}
          className={`todo-title ${todo.completed ? 'completed' : ''}`}
          style={{ cursor: 'pointer' }}
        >
          {todo.title}
        </Link>
        <span className="todo-date">작성일 : {formatDate(todo.created_at)}</span>
      </div>
    </li>
  );
};

export default TodoItemBox;
```

## 2. 할일 내용 및 제목 작성 페이지

- /src/pages/TodoWritePage.tsx

```tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { Profile, TodoInsert } from '../../types/TodoType';
import { getProfile } from '../../lib/profile';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { createTodo } from '../../services/todoService';

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
  const handelContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
          <textarea
            className="form-input"
            value={content}
            onChange={e => handelContentChange(e)}
            placeholder="내용을 입력해주세요. (선택사항)"
            rows={6}
            disabled={saving}
            onKeyDown={e => handleKeyDown(e)}
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
```

- /src/components/todos/TodoWriteBox.tsx 생성

```tsx
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
```

## 3. 할일 상세 페이지

- /src/pages/TodoDetailPage.tsx

```tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile } from '../../lib/profile';
import { deleteTodo, getTodoById } from '../../services/todoService';
import type { Profile, Todo } from '../../types/TodoType';
import Loading from '../../components/Loading';

function TodoDetailPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  // param 값을 일기
  const { id } = useParams<{ id: string }>();
  // id 를 이용해서 Todo 내용 가져오기
  const [todo, setTodo] = useState<Todo | null>(null);
  // 상세 페이지오면 todo 내용을 호출해야 하므로 true 세팅
  const [loading, setLoading] = useState(true);
  // 현재 삭제 중인지 처리
  const [actionLoading, setActionLoading] = useState<{
    delete: boolean;
  }>({ delete: false });

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
          alert('조회 권한이 없습니다.');
          navigate('/todos');
          return;
        }
        setTodo(result);
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

  const handleDelete = async () => {
    if (!todo) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      setActionLoading({ ...actionLoading, delete: true });
      await deleteTodo(todo.id);
      alert('할일이 삭제되었습니다.');
      navigate('/todos');
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading({ ...actionLoading, delete: false });
    }
  };

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
  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">할 일 상세보기</h2>
        {profile?.nickname && <p className="page-subtitle">{profile.nickname}님의 할 일</p>}
      </div>
      {/* 실제 내용 */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--space-6)',
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                margin: '0 0 var(--space-2) 0',
                color: 'var(--gray-800)',
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1,
              }}
            >
              {todo.title}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              style={{
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                fontSize: '12px',
                fontWeight: '500',
                backgroundColor: todo.completed ? 'var(--success-100)' : 'var(--primary-100)',
                color: todo.completed ? 'var(--success-700)' : 'var(--primary-700)',
              }}
            >
              {todo.completed ? '✅ 완료' : '⏳ 진행 중'}
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            justifyContent: 'end',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={() => navigate(`/todos/edit/${todo.id}`)}
            className="btn btn-primary btn-md"
            disabled={actionLoading.delete}
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            disabled={actionLoading.delete}
            className="btn btn-danger btn-md"
          >
            {actionLoading.delete ? '⏳ 삭제 중...' : '삭제'}
          </button>
        </div>
        {/* 상세 내용 출력 */}
        {todo.content && (
          <div
            style={{
              padding: 'var(--space-4)',
              backgroundColor: 'var(--gray-50)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--space-6)',
            }}
          >
            <h4 style={{ margin: '0 0 var(--space-3) 0', color: 'var(--gray-700)' }}>상세 내용</h4>
            <p
              style={{
                margin: 0,
                color: 'var(--gray-600)',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {todo.content}
            </p>
          </div>
        )}
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

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/todos')}>
            목록으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailPage;

```

## 4. 할일 내용 및 제목 수정 페이지

- /src/pages/TodoEditPage.tsx

```tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import type { Profile, Todo } from '../../types/TodoType';
import { getProfile } from '../../lib/profile';
import { getTodoById, toggleTodo, updateTodo } from '../../services/todoService';
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

  const handleToggle = async () => {
    if (!todo) return;
    try {
      setToggleLoading(true);
      const result = await toggleTodo(todo.id, !todo.completed);
      if (result) {
        setTodo(result);
        alert(`할 일이 ${result.completed ? '완료' : '진행 중'} 으로 변경되었습니다.`);
      } else {
        alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
      }
    } catch (error) {
      console.log(`상태 변경 실패 : ${error}`);
      alert('에러가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setToggleLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTItle(e.target.value);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleSave = async () => {
    if (!todo) return;
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }
    try {
      setSaving(true);
      const result = await updateTodo(todo.id, { title, content });
      if (result) {
        alert('할일이 성공적으로 수정되었습니다.');
        navigate('/todos');
      } else {
        alert('수정 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      console.log(`수정 에러 : ${error}`);
    } finally {
      setSaving(false);
    }
  };
  const handleCancel = () => {
    if (title !== todo?.title || content !== (todo?.content || '')) {
      if (window.confirm('수정중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        navigate(`/todos/detail/${id}`);
      }
    } else {
      navigate(`/todos/detail/${id}`);
    }
  };

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
              onChange={handleToggle}
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
            onChange={handleTitleChange}
            value={title}
            disabled={saving}
            placeholder="할일을 입력하세요"
          />
        </div>

        <div className="form-group">
          <label className="form-label">상세 내용</label>
          <textarea
            className="form-input"
            onChange={handleContentChange}
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
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={saving || toggleLoading}
          >
            {saving ? '⏳ 수정 중...' : '수정'}
          </button>
          <button
            className="btn btn-secondary"
            disabled={saving || toggleLoading}
            onClick={handleCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoEditPage;

```

## 5. 라우터 구성

- App.tsx 업데이트
- `edit 과 detail 은 id 를 param` 으로 전달함.

```tsx
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
import TodosInfinitePage from './pages/TodosInfinitePage';
import TodoList from './components/todos/TodoList';
import TodoListPage from './pages/todo/TodoListPage';
import TodoWritePage from './pages/todo/TodoWritePage';
import TodoEditPage from './pages/todo/TodoEditPage';
import TodoDetailPage from './pages/todo/TodoDetailPage';

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
```
