import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import WithdrawModal from './WithdrawModal';

// UserProfile 인터페이스 정의: 사용자 프로필 데이터 타입을 지정
interface UserProfile {
  userId: string;
  userName: string;
  points: number;
  rightsOfHost: number;
}

const Profile = () => {
  const { userId } = useParams<'userId'>(); // URL에서 userId 파라미터 추출
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: userId || '',
    userName: 'USER.123',
    points: 10000,
    rightsOfHost: 5,
  });
  const [editMode, setEditMode] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
    setNewUserName('');  // 입력 필드를 초기화
  };

  const handleSaveClick = () => {
    setUserProfile({...userProfile, userName: newUserName || userProfile.userName});
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmWithdraw = () => {
    // 회원탈퇴 로직을 여기서 처리합니다.
    console.log('회원탈퇴 확인');
    setIsModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 bg-black rounded-lg" style={{ maxWidth: '990px', height: '566px' }}>
      <div className="text-2xl text-white text-start p-2 font-bold mx-20" style={{ height: '40px' }}>나의 정보</div>
      <div className="mt-5 mx-20 rounded-lg" style={{ border: '2px solid #875ff6', width: '700px', height: '140px' }}>
        <div className="flex items-center h-full p-4 space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary-green-400 flex items-center justify-center" style={{ color: 'black' }}>CN</div> {/* 아바타 */}
          {editMode ? (
            <input
              type="text"
              placeholder="Enter the nickname"
              value={newUserName}
              onChange={handleChange}
              className="bg-white placeholder-gray-500 p-2 rounded-lg flex-grow"
              style={{ color: 'black' }}
            />
          ) : (
            <span className="text-white flex-grow">{userProfile.userName}</span>
          )}
          <button
            onClick={editMode ? handleSaveClick : handleEditClick}
            className="bg-primary-green-400 px-4 py-2 rounded-lg hover:bg-primary-green-300" style={{ color: 'black' }}
          >
            {editMode ? '저징' : '수정'}
          </button>
        </div>
      </div>
      <div className="mt-10 mx-20 justify-center rounded-lg" style={{ border: '2px solid #875ff6', width: '700px', height: '228px' }}>
        <div className="p-4">
          <div className="mb-4 flex items-center space-x-2">
            <label className="text-white">포인트:</label>
            <input
              className="flex-1 p-2 bg-background-black-950 transition-all rounded-lg focus:outline-none"
              type="text"
              value={userProfile.points}
              readOnly
            />
          </div>
          <div className="mb-4 flex items-center space-x-2">
            <label className="text-white">주최권:</label>
            <input
              className="flex-1 p-2 bg-background-black-950 transition-all rounded-lg focus:outline-none"
              type="text"
              value={userProfile.rightsOfHost}
              readOnly
            />
            <button className="bg-primary-green-400 px-4 py-2 rounded-lg hover:bg-primary-green-300" style={{ color: 'black' }}>
              구매
            </button>
          </div>
        </div>
        <button onClick={handleWithdrawClick} className="bg-primary-green-400 mt-5 px-4 py-2 rounded-lg hover:bg-primary-green-300 mx-4" style={{ color: 'black' }}>
          회원 탈퇴
        </button>
      </div>
      <WithdrawModal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmWithdraw} />
    </div>
  );
};

export default Profile;
