import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [useGoogleProfile, setUseGoogleProfile] = useState(true);
  const [customNickname, setCustomNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setCustomNickname(currentUser.displayName || '');
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      uid: user?.uid,
      displayName: useGoogleProfile ? user?.displayName : customNickname,
      photoURL: useGoogleProfile ? user?.photoURL : null,
      email: user?.email
    });
    navigate('/');
  };

  if (!user) return <div className="text-primary-green-300">Loading...</div>;

  return (
    <div className="bg-black flex items-center justify-center gap-8">
      <div className="p-8 w-full">
        <h2 className="text-2xl font-bold mb-6 text-primary-green-300 text-center">회원가입</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center justify-center mb-4">
            <input
              id="use-google-profile"
              type="checkbox"
              checked={useGoogleProfile}
              onChange={(e) => setUseGoogleProfile(e.target.checked)}
              className="mr-2 form-checkbox text-primary-green-300"
            />
            <label htmlFor="use-google-profile" className="text-primary-green-300">
              구글 프로필 사용하기
            </label>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <img 
              src={user.photoURL || ''} 
              alt="Profile" 
              className="w-16 h-16 rounded-full"
            />
            {useGoogleProfile ? (
              <p className="text-primary-green-300">{user.displayName}</p>
            ) : (
              <div className="w-full">
                <label htmlFor="custom-nickname" className="block text-primary-green-300 mb-2 text-center">
                  닉네임:
                </label>
                <input
                  id="custom-nickname"
                  type="text"
                  value={customNickname}
                  onChange={(e) => setCustomNickname(e.target.value)}
                  className="w-full text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:border-primary-green-300"
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
                type="submit"
                className="bg-primary-green-300 text-background-black-950 py-2 px-10 rounded hover:bg-green-400 transition duration-300"
            >
                가입 완료
            </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
            '가입 완료' 버튼을 클릭함으로써, 귀하는<br/>당사의 서비스 약관에 동의하고 개인정보<br/>처리방침을 인지하였음을 인정하는 것입니다.
            </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;