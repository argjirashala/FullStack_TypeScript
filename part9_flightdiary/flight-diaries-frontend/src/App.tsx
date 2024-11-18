import React, { useEffect, useState } from 'react';
import DiaryList from './components/DiaryList';
import AddDiaryForm from './components/AddDiaryForm';
import { DiaryEntry } from './types';

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/diaries');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const json: unknown = await response.json(); 
        
        if (!Array.isArray(json)) {
          throw new Error('Expected an array of diaries');
        }
    
        const data: DiaryEntry[] = json.map((item) => {
          if (
            typeof item.id === 'number' &&
            typeof item.date === 'string' &&
            typeof item.weather === 'string' &&
            typeof item.visibility === 'string' &&
            typeof item.comment === 'string'
          ) {
            return item as DiaryEntry;
          }
          throw new Error('Invalid diary entry format');
        });
    
        setDiaries(data);
      } catch (error) {
        console.error('Failed to fetch diaries:', error);
      }
    };
    
      

    fetchDiaries();
  }, []);

  const handleDiaryAdded = (newDiary: DiaryEntry) => {
    setDiaries((prevDiaries) => [...prevDiaries, newDiary]);
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <AddDiaryForm onDiaryAdded={handleDiaryAdded} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
