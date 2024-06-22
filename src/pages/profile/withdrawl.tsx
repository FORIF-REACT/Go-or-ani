import React from 'react';

interface WithdrawlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawlModal: React.FC<WithdrawlModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl mb-4">회원 탈퇴</h2>
        <p className="mb-4">정말로 회원 탈퇴하시겠습니까?</p>
        <div className="flex justify-end">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            탈퇴
          </button>
          <button 
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawlModal;
