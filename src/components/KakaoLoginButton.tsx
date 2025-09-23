import { RiKakaoTalkFill } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';

interface KakaoLoginButtonProps {
  children?: React.ReactNode;
  onError?: (error?: string) => void;
  onSuccess?: (message: string) => void;
}
const KakaoLoginButton = ({ onError, onSuccess }: KakaoLoginButtonProps) => {
  // 카카오 로그인 사용
  const { signInWithKakao } = useAuth();

  // 카카오 로그인 실행
  const handleKakaoLogin = async () => {
    try {
      const { error } = await signInWithKakao();

      if (error) {
        console.log('카카오로그인 에러 메시지 : ', error);
        if (onError) {
          onError(error);
        }
      } else {
        console.log('카카오 로그인 성공');
        if (onSuccess) {
          onSuccess('카카오 로그인이 성공했습니다.');
        }
      }
    } catch (err) {
      console.log('카카오 로그인 오류 : ', err);
    }
  };

  return (
    <div>
      <button
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px 16px',
          backgroundColor: '#fee500',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'bacground-color 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#fdd835';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#fee500';
        }}
        onClick={handleKakaoLogin}
      >
        {/* 카카오 아이콘 SVG */}
        <RiKakaoTalkFill style={{ fontSize: '20px' }} />
        카카오 로그인
      </button>
    </div>
  );
};

export default KakaoLoginButton;
