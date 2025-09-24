import { useState } from 'react';
import KakaoLoginButton from '../components/KakaoLoginButton';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import GoogleLoginButton from '../components/GoogleLoginButton';

function SignUpPage() {
  const { checkEmailExists, checkNicknameExists } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  // 닉네임 state: nickname -> nickName
  const [nickName, setNickName] = useState<string>('');

  const [emailCheckStatus, setEmailCheckStatus] = useState<
    'idle' | 'checking' | 'available' | 'taken'
  >('idle');
  const [nicknameCheckStatus, setNicknameCheckStatus] = useState<
    'idle' | 'checking' | 'available' | 'taken'
  >('idle');

  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [nicknameCheckMessage, setNicknameCheckMessage] = useState('');

  const handleEmailCheck = async () => {
    const value = email.trim().toLowerCase();
    if (!value) {
      setEmailCheckMessage('이메일을 입력해주세요.');
      setEmailCheckStatus('taken');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailCheckMessage('올바른 이메일 형식을 입력해주세요.');
      setEmailCheckStatus('taken');
      return;
    }
    setEmailCheckStatus('checking');
    setEmailCheckMessage('이메일 중복 확인 중...');
    try {
      const result = await checkEmailExists(value);
      if (result.error) {
        setEmailCheckMessage(`오류 : ${result.error}`);
        setEmailCheckStatus('taken');
      } else if (result.exists) {
        setEmailCheckMessage('이미 사용 중인 이메일 입니다.');
        setEmailCheckStatus('taken');
      } else {
        setEmailCheckMessage('사용 가능한 이메일입니다.');
        setEmailCheckStatus('available');
      }
    } catch {
      setEmailCheckMessage('이메일 중복 확인 중 오류가 발생했습니다.');
      setEmailCheckStatus('taken');
    }
  };

  // 닉네임 중복 확인 함수 (nickName 사용)
  const handleNicknameCheck = async () => {
    const value = nickName.trim();
    if (!value) {
      setNicknameCheckMessage('닉네임을 입력해주세요.');
      setNicknameCheckStatus('taken');
      return;
    }
    if (value.length < 2) {
      setNicknameCheckMessage('닉네임은 2자 이상 입력해 주세요.');
      setNicknameCheckStatus('taken');
      return;
    }
    setNicknameCheckStatus('checking');
    setNicknameCheckMessage('닉네임 중복 확인 중...');
    try {
      const result = await checkNicknameExists(value);
      if (result.error) {
        setNicknameCheckMessage(`오류 : ${result.error}`);
        setNicknameCheckStatus('taken');
      } else if (result.exists) {
        setNicknameCheckMessage('이미 사용 중인 닉네임 입니다.');
        setNicknameCheckStatus('taken');
      } else {
        setNicknameCheckMessage('사용 가능한 닉네임입니다.');
        setNicknameCheckStatus('available');
      }
    } catch {
      setNicknameCheckMessage('닉네임 중복 확인 중 오류가 발생했습니다.');
      setNicknameCheckStatus('taken');
    }
  };

  const [msg, setMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPw = pw.trim();
    const cleanNickName = nickName.trim();

    if (!cleanEmail) {
      alert('이메일을 입력하세요.');
      return;
    }
    if (!cleanPw) {
      alert('비밀번호를 입력하세요.');
      return;
    }
    if (cleanPw.length < 6) {
      alert('비밀번호는 6자 이상 입력하세요.');
      return;
    }
    if (!cleanNickName) {
      alert('닉네임을 입력하세요.');
      return;
    }

    // 메타데이터 키를 nickName으로 전달
    const { error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: cleanPw,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { nickName: cleanNickName },
      },
    });

    if (error) {
      setMsg(`회원가입 오류 : ${error.message ?? error}`);
    } else {
      setMsg(
        '회원가입이 성공했습니다. 이메일 인증 링크를 확인해주세요. 인증 완료 후 프로필이 자동으로 생성됩니다.',
      );
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
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (emailCheckStatus !== 'idle') {
                    setEmailCheckStatus('idle');
                    setEmailCheckMessage('');
                  }
                }}
                placeholder="example@example.com"
                className="form-input"
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleEmailCheck}
                disabled={emailCheckStatus === 'checking'}
                style={{
                  padding: '12px 16px',
                  backgroundColor: emailCheckStatus === 'available' ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: emailCheckStatus === 'checking' ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  opacity: emailCheckStatus === 'checking' ? 0.6 : 1,
                }}
              >
                {emailCheckStatus === 'checking' ? '확인중...' : '중복확인'}
              </button>
            </div>
            {emailCheckMessage && (
              <div
                style={{
                  marginTop: '4px',
                  fontSize: '14px',
                  color:
                    emailCheckStatus === 'available'
                      ? '#10b981'
                      : emailCheckStatus === 'taken'
                        ? '#ef4444'
                        : '#6b7280',
                }}
              >
                {emailCheckStatus === 'checking' && '⏳ '}
                {emailCheckStatus === 'available' && '✅ '}
                {emailCheckStatus === 'taken' && '❌ '}
                {emailCheckMessage}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
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
            <label className="form-label">닉네임</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <input
                type="text"
                value={nickName}
                onChange={e => {
                  setNickName(e.target.value);
                  if (nicknameCheckStatus !== 'idle') {
                    setNicknameCheckStatus('idle');
                    setNicknameCheckMessage('');
                  }
                }}
                placeholder="닉네임을 입력해주세요"
                className="form-input"
                required
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleNicknameCheck}
                disabled={nicknameCheckStatus === 'checking'}
                style={{
                  padding: '12px 16px',
                  backgroundColor: nicknameCheckStatus === 'available' ? '#10b981' : '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: nicknameCheckStatus === 'checking' ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  whiteSpace: 'nowrap',
                  opacity: nicknameCheckStatus === 'checking' ? 0.6 : 1,
                }}
              >
                {nicknameCheckStatus === 'checking' ? '확인중...' : '중복확인'}
              </button>
            </div>
            {nicknameCheckMessage && (
              <div
                style={{
                  marginTop: '4px',
                  fontSize: '14px',
                  color:
                    nicknameCheckStatus === 'available'
                      ? '#10b981'
                      : nicknameCheckStatus === 'taken'
                        ? '#ef4444'
                        : '#6b7280',
                }}
              >
                {nicknameCheckStatus === 'checking' && '⏳ '}
                {nicknameCheckStatus === 'available' && '✅ '}
                {nicknameCheckStatus === 'taken' && '❌ '}
                {nicknameCheckMessage}
              </div>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              opacity:
                emailCheckStatus !== 'available' || nicknameCheckStatus !== 'available' ? 0.5 : 1,
              cursor:
                emailCheckStatus !== 'available' || nicknameCheckStatus !== 'available'
                  ? 'not-allowed'
                  : 'pointer',
            }}
            className="btn btn-success btn-lg"
            disabled={emailCheckStatus !== 'available' || nicknameCheckStatus !== 'available'}
          >
            {emailCheckStatus !== 'available' || nicknameCheckStatus !== 'available'
              ? '이메일 및 닉네임 중복 확인 필요'
              : '회원가입'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: 'var(--space-6)' }}>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--gray-300)' }}></div>
          <span style={{ padding: '0 var(--space-4)', fontSize: '14px' }}>또는</span>
          <div style={{ flex: 1, height: 1, backgroundColor: 'var(--gray-300)' }}></div>
        </div>

        <KakaoLoginButton
          onError={error => setMsg(`카카오 로그인 오류 : ${error}`)}
          onSuccess={message => setMsg(message)}
        />
        <div style={{ marginTop: 'var(--space-3)' }}>
          <GoogleLoginButton
            onError={error => setMsg(`구글 로그인 오류 : ${error}`)}
            onSuccess={message => setMsg(message)}
          />
        </div>

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
