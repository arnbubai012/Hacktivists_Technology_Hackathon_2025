import './App.css';
import DataUpload from './components/DataUpload';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayoutBasic from './components/DahboardLayoutBasic';
function App() {
  return (
    <div className="App">
      <Header />
      <DataUpload/>
      <Footer />
    </div>
  );
}

export default App;
