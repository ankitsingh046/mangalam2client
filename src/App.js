import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Homescreen from "./screens/Homescreen";
import BookingScreen from "./screens/BookingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

function App() {
  return (
    <div className='App'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' exact Component={Homescreen} />
          <Route path='/book/:roomId' exact Component={BookingScreen} />
          <Route path='/login' exact Component={LoginScreen} />
          <Route path='/register' exact Component={RegistrationScreen} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
