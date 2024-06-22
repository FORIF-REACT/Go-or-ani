import React, { useState } from 'react';

import WithdrawalModal from './withdrawl';
import BuyHostModal from './buyhost';

const Profile = () => {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [isBuyHostModalOpen, setIsBuyHostModalOpen] = useState(false);

  const handleWithdrawalConfirm = () => {
    // 회원 탈퇴 로직 추가
    setIsWithdrawalModalOpen(false);
    alert('회원 탈퇴가 완료되었습니다.');
  };

  const handleBuyHost = (quantity: number) => {
    // 주최권 구매 로직 추가
    setIsBuyHostModalOpen(false);
    alert(`${quantity}개의 주최권을 구매하였습니다.`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-4xl p-5 bg-black" style={{ border: '5px solid #75fbab', maxWidth: '990px' }}>
        <h1 className="text-white text-2xl text-center mb-8">프로필</h1>
        
        {/* 기본 정보 섹션 */}
        <div className="mb-10" style={{ border: '2px solid #875ff6', padding: '20px' }}>
          <h2 className="text-white text-xl mb-4">기본 정보</h2>
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">닉네임</label>
            <input 
              className="bg-white text-black p-2 rounded flex-grow" 
              placeholder="닉네임" 
              value="USER.123" // 실제 닉네임 값을 사용
              readOnly
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">포인트</label>
            <input 
              className="bg-white text-black p-2 rounded flex-grow" 
              placeholder="10000" 
              value="10000" // 실제 포인트 값을 사용
              readOnly
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">주최권</label>
            <input 
              className="bg-white text-black p-2 rounded flex-grow" 
              placeholder="5" 
              value="5" // 실제 주최권 값을 사용
              readOnly
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={() => setIsBuyHostModalOpen(true)}
            >
              구매
            </button>
          </div>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setIsWithdrawalModalOpen(true)}
          >
            회원탈퇴
          </button>
        </div>
      </div>
      
      <WithdrawalModal 
        isOpen={isWithdrawalModalOpen} 
        onClose={() => setIsWithdrawalModalOpen(false)} 
        onConfirm={handleWithdrawalConfirm} 
      />
      <BuyHostModal 
        isOpen={isBuyHostModalOpen} 
        onClose={() => setIsBuyHostModalOpen(false)} 
        onBuy={handleBuyHost} 
      />
    </div>
  );
};

export default Profile;
