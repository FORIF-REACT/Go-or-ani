import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // 여기서 사용자가 이미 등록되어 있는지 확인하는 로직을 추가할 수 있습니다.
      // 예를 들어, Firestore에서 사용자 정보를 확인하는 등의 작업을 수행합니다.
      // 이 예시에서는 모든 로그인을 신규 사용자로 간주합니다.
      navigate('/signup');
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  return { user, signIn, signOutUser };
}