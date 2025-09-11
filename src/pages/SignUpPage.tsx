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
      <h2>Todo 서비스 회원가입</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="example@example.com"
            />
          </div>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <br />
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <input
              type="text"
              value={nickName}
              onChange={e => setNickName(e.target.value)}
              placeholder="닉네임을 입력해주세요"
            />
          </div>
          <button type="submit" style={{ maxWidth: '200px' }}>
            회원가입
          </button>
          <p>{msg}</p>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
