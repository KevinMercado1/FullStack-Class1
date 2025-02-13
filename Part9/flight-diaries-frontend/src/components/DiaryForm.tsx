import { useState } from 'react';
import axios from 'axios';
import { createDiary } from '../services/diaries';
import { DiaryEntry } from '../types/diary';

const DiaryForm = () => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const newDiary = { date, weather, visibility } as Omit<DiaryEntry, 'id'>;
      await createDiary(newDiary);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || 'Error adding diary entry');
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <h2>Add new diary entry</h2>
        <div>
          Date:{' '}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          Weather:
          {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                onChange={() => setWeather(w)}
                required
              />
              {w}
            </label>
          ))}
        </div>
        <div>
          Visibility:
          {['great', 'good', 'ok', 'poor'].map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                onChange={() => setVisibility(v)}
                required
              />
              {v}
            </label>
          ))}
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default DiaryForm;
