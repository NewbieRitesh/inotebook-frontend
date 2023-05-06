import { BrowserRouter, Route, Routes } from "react-router-dom";
// componentes
import About from "./components/About";
import Contact from "./components/Contact";
import Help from "./components/Help";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import Login from "./components/logs/Login";
import Signup from "./components/logs/Signup";
import Alert from "./components/Alert";
import AlertState from "./context/alert/AlertState"
import Profile from "./components/profile/Profile";
import UserState from "./context/users/UserState";

function App() {
  return (
    <>
      <AlertState>
        <UserState>
          <NoteState>
            <BrowserRouter>
              <Navbar />
              <Alert />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/help" element={<Help />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {localStorage.getItem('token') ? <Route path="/profile" element={<Profile />} /> : ""}
              </Routes>
            </BrowserRouter>
          </NoteState>
        </UserState>
      </AlertState>

    </>
  );
}

export default App;
