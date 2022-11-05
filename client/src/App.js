import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout';
import AuthLayout from './layout/AuthLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Registration/Register';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />} />
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
