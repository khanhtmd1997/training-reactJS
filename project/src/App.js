
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';


function App() {

  return  (
<BrowserRouter>
<Routes>
<Route path='HomePage' element={<HomePage />}/>
<Route path='LoginPage' element={<LoginPage />}/>
<Route path='RegisterPage' element={<RegisterPage />}/>


</Routes>
</BrowserRouter>
  );
}
export default App;
  