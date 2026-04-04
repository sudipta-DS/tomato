import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Login } from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";

export const authService = "http://localhost:5000";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toaster>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
          </Routes>
        </Toaster>
      </BrowserRouter>
    </>
  );
};

export default App;
