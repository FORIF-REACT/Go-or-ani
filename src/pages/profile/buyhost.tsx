import React, { useState } from 'react';

interface BuyHostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuy: (quantity: number) => void;
}

const BuyHostModal: React.FC<BuyHostModalProps> = ({ isOpen, onClose, onBuy }) => {
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl mb-4">주최권 구매</h2>
        <div className="mb-4">
          <label className="block mb-2">구매할 주최권 개수</label>
          <input 
            type="number"
            className="border p-2 rounded w-full"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="flex justify-end">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => onBuy(quantity)}
          >
            구매
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

export default BuyHostModal;
