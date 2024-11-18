import React from 'react';
import { DiaryEntry } from '../types';

interface DiaryListProps {
  diaries: DiaryEntry[];
}

const DiaryList: React.FC<DiaryListProps> = ({ diaries }) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {diaries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Weather:</strong> {entry.weather}</p>
          <p><strong>Visibility:</strong> {entry.visibility}</p>
          <p><strong>Comment:</strong> {entry.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
