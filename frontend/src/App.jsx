import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cars from './pages/Cars';
import Add from './pages/Add';
import Update from './pages/Update';

import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Cars />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
