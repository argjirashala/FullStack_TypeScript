import React, { useState } from 'react';
import axios from 'axios';
import { DiaryEntry, Weather, Visibility } from '../types';

interface AddDiaryFormProps {
  onDiaryAdded: (newDiary: DiaryEntry) => void; // eslint-disable-line no-unused-vars
}

const AddDiaryForm: React.FC<AddDiaryFormProps> = ({ onDiaryAdded }) => {
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Good);
  const [comment, setComment] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const newDiary = { date, weather, visibility, comment };

    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3000/api/diaries', newDiary);
      onDiaryAdded(response.data);
      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Good);
      setComment('');
      setErrorMessage(null); 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ marginBottom: '2rem' }}>
      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Visibility: </label>
        {Object.values(Visibility).map((v) => (
          <label key={v} style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() => setVisibility(v)}
            />
            {v}
          </label>
        ))}
      </div>
      <div>
        <label>Weather: </label>
        {Object.values(Weather).map((w) => (
          <label key={w} style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() => setWeather(w)}
            />
            {w}
          </label>
        ))}
      </div>
      <div>
        <label>Comment: </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Add Diary</button>
    </form>
  );
};

export default AddDiaryForm;
