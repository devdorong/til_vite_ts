# 사용자 비밀번호 변경하기

## 1. UI 작업

- /src/pages/ProfilePage.tsx 업데이트

```tsx
// 새 비밀번호
const [newPassword, setNewPassword] = useState('');
// 새 비밀번호 확인
const [confirmPassword, setConfirmPassword] = useState('');
const [passwordMessage, setPasswordMessage] = useState<string>('');

// 비밀번호 변경 확인
const handlePasswordChange = async () => {
  // 입력값 검출
  if (!newPassword.trim()) {
    setPasswordMessage('새 비밀번호를 입력하세요.');
    return;
  }
  if (newPassword.length < 6) {
    setPasswordMessage('비밀번호는 최소6자 이상이어야 합니다.');
  }
  if (newPassword !== confirmPassword) {
    setPasswordMessage('비밀번호가 일치하지 않습니다.');
  }
  try {
    const result = await changePassword(newPassword);
    if (result.success) {
      setPasswordMessage('비밀번호가 성공적으로 변경되었습니다.');
      // 폼 초기화
      setNewPassword('');
      setConfirmPassword('');
      // 3초 후 메시지 자동 제거
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
    } else if (result.error) {
      setPasswordMessage(`비밀번호 변경 실패 : ${result.error}`);
    }
  } catch (err) {
    setPasswordMessage('비밀번호 변경 중 오류가 발생했습니다.');
  }
};

{
  /* 이메일 로그인 사용자에게만 비밀번호 변경 섹션 표시 */
}
{
  (!user?.app_metadata.provider || user?.app_metadata.provider === 'email') && (
    <div className="form-group">
      <label className="form-label">🔒 비밀번호 변경</label>
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <input
          type="password"
          className="form-input"
          style={{ flex: 1 }}
          placeholder="새 비밀번호(최소 6자)"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <input
          type="password"
          className="form-input"
          style={{ flex: 1 }}
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button
          className="btn btn-primary"
          style={{ whiteSpace: 'nowrap' }}
          onClick={handlePasswordChange}
        >
          변경
        </button>
      </div>
      {/* 비밀번호 변경 메시지 */}
      {passwordMessage && (
        <div
          style={{
            marginTop: 'var(--space-2)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '14px',
            backgroundColor: passwordMessage.includes('성공') ? 'var(--success-50)' : '#fef2f2',
            color: passwordMessage.includes('성공') ? 'var(--success-600)' : '#dc2626',
            border: `1px solid ${passwordMessage.includes('성공') ? 'var(--success-600)' : '#dc2626'}`,
          }}
        >
          {passwordMessage}
        </div>
      )}
    </div>
  );
}
```

## 2. 기능 적용

- /src/context/AuthContext.tsx 업데이트

```tsx
// 비밀번호 변경 함수
changePassword: (newPassword: string) =>
  Promise<{ error?: string; success?: boolean; message?: string }>;

// 비밀번호 변경 함수
const changePassword: AuthContextType['changePassword'] = async (newPassword: string) => {
  try {
    // 이메일 로그인 사용자인지 확인
    if (user?.app_metadata.provider && user.app_metadata.provider !== 'email') {
      return { error: '이메일 로그인 사용자만 비밀번호를 변경할 수 있습니다.' };
    }
    // 비밀번호 길이 확인
    if (newPassword.length < 6) {
      return { error: '비밀번호는 최소 6자 이상이여야 합니다.' };
    }
    // supabase에서 비밀번호 업데이트
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      console.log('비밀번호 변경 실패:', error.message);
      return { error: '비밀번호 변경에 실패했습니다.' };
    }
    return {
      success: true,
      message: '비밀번호가 성공적으로 변경되었습니다.',
    };
  } catch (err) {
    console.log('비밀번호 변경 오류 : ', err);
    return { error: '비밀번호 변경 중 오류가 발생했습니다.' };
  }
};
const value: AuthContextType = {
    signUp,
    signIn,
    signOut,
    user,
    session,
    loading,
    deleteAccount,
    signInWithKakao,
    unlinkKakaoAccount,
    checkEmailExists,
    checkNicknameExists,
    signInWithGoogle,
    unlinkGoogleAccount,
    changePassword,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## 3. 인증 후 이동 및 profiles 업데이트

- /src/pages/AuthCallback.tsx
- 이메일 사용자 가입시 profiles 에 insert 안되는 문제 (nickname 문제)

```tsx
// 닉네임 추출
const extractNickname = (user: any, isOAuthLogin: boolean, loginType: string): string => {
  let nickName = '';
  // if (!isOAuthLogin && !nickName) {
  //   nickName = user.user_metadata.nickname;
  // }

  if (isOAuthLogin && !nickName) {
    nickName =
      user.user_metadata.nickname ||
      user.app_metadata.full_name ||
      user.app_metadata.name ||
      user.user_metadata.full_name ||
      user.user_metadata.name ||
      user.email?.split('@')[0] ||
      (loginType === '카카오 사용자' ? '카카오 사용자' : '구글 사용자');
  } else {
    // 이메일 로그인인 경우 - 회원가입 시 저장한 닉네임 사용
    nickName = user.user_metadata.nickName || user.user_metadata.nickname;

    // 닉네임이 없으면 이메일에서 추출
    if (!nickName) {
      nickName = user.email?.split('@')[0] || '이메일사용자';
    }
  }

  return nickName;
};
```
