import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import './DateTimePickerCustom.css';

const Create = () => {
  const [optionsCount, setOptionsCount] = useState<number>(2);
  const [options, setOptions] = useState<string[]>(['', '']);
  const [time, setTime] = useState<Date | null>(new Date());

  const handleOptionsCountChange = (count: number) => {
    setOptionsCount(count);
    setOptions(Array(count).fill(''));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleTimeChange = (newTime: Date | Date[] | null) => {
    if (newTime instanceof Date) {
      setTime(newTime);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-4xl p-5 bg-black" style={{ border: '5px solid black', maxWidth: '990px' }}>
        <h1 className="text-white text-4xl font-black mb-10">베팅 만들기</h1>
        
        {/* 기본 정보 설정 섹션 */}
        <h2 className="text-white text-xl mb-4 font-black">기본 정보 설정</h2>
        <div className="mb-10 rounded-lg" style={{ border: '2px solid #875ff6', padding: '20px' }}>
          
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">TITLE</label>
            <input className="bg-white text-black p-2 rounded flex-grow" placeholder="제목을 입력하시오" style={{ color: 'black'}}/>
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">마감 시간 설정</label>
            <DateTimePicker 
              onChange={handleTimeChange} 
              value={time} 
              className="bg-white text-black p-2 rounded flex-grow" 
              disableClock={true} 
              format="yyyy-MM-dd HH:mm"
              locale="ko-KR"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">산정 방식</label>
            <select className="bg-white text-black p-2 rounded flex-grow" style={{ color: 'black'}}>
              <option>주최자 임의 설정</option>
              <option>포인트가 높은 것</option>
              <option>사용자 수가 많은 것</option>
            </select>
          </div>
          
        </div>
        
        {/* 선택지 설정 섹션 */}
        <h2 className="text-white text-xl mb-4 font-black">선택지 설정</h2>
        <div className="mb-10 rounded-lg" style={{ border: '2px solid #875ff6', padding: '20px' }}>
          
          <div className="mb-4 flex items-center">
            <label className="text-white w-40">선택지 개수</label>
            <div className="flex space-x-4">
              {[2, 3, 4].map((count) => (
                <label key={count} className="text-white">
                  <input
                    type="radio"
                    name="optionsCount"
                    checked={optionsCount === count}
                    onChange={() => handleOptionsCountChange(count)}
                  />
                  {count}
                </label>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <label className="text-white w-40">선택지 {index + 1}</label>
                  <div className="flex items-center space-x-2">
                    <input
                      className="bg-white text-black p-2 rounded flex-grow"
                      style={{ color: 'black'}}
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                    />
                    <button className="bg-primary-green-400 hover:bg-primary-green-300 rounded py-2 px-4" style={{ color: 'black'}}>입력</button>
                  </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
