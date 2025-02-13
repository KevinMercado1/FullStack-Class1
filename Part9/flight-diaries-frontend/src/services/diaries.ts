import axios from 'axios';
import { DiaryEntry } from '../types/diary';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (
  newDiary: Omit<DiaryEntry, 'id'>
): Promise<DiaryEntry> => {
  const response = await axios.post<DiaryEntry>(baseUrl, newDiary);
  return response.data;
};
