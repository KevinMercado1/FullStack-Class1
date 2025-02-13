import DiaryList from './components/DiaryList';
import DiaryForm from './components/DiaryForm';
const App = () => {
  return (
    <div>
      <h1>Flight Diaries</h1>
      <DiaryForm />
      <DiaryList />
    </div>
  );
};
export default App;
