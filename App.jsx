import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss'
import Payment from './components/Payment';
import Paymentdetail from './components/Paymentdetail'
import Usage from './components/Usage'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/a' element={<Payment/>}></Route>
        <Route path='/b' element={<Paymentdetail/>}></Route>
        <Route path='/c' element={<Usage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
