import './App.css';
import CsvUpload from './components/Csvtest';

function App() {

  const handleBackClick = () => {
    // Handle back click logic
  };

  const handleSubmit = (csvData) => {
    // Handle submit logic
  };
  return (
    <div className="App">


<CsvUpload handleBackClick={handleBackClick} onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
