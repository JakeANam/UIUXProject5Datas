import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/App.scss'
import Payment from './components/Payment';
import PaymentDetail from './components/PaymentDetail'
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/a' element={<Payment/>}></Route>
        <Route path='/b' element={<PaymentDetail/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
