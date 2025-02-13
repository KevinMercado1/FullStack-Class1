import { useEffect, useState } from 'react';
import { getAllDiaries } from '../services/diaries';
import { DiaryEntry } from '../types/diary';

const DiaryList = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(setDiaries).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Flight Diaries</h2>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>{diary.date}</strong> - Weather: {diary.weather},
            Visibility: {diary.visibility}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryList;
