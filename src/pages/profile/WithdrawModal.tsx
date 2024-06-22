

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawModal = ({ isOpen, onClose, onConfirm }: WithdrawModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" style = {{background: 'rgba(0,0,0,0.8)'}} >
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96" style={{ border: '3px solid #875ff6' }} >
        <h2 className="text-2xl font-bold mb-4 text-white">회원 탈퇴</h2>
        <p className="mb-4 text-white">정말로 회원 탈퇴를 하시겠습니까?</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
            취소
          </button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;
