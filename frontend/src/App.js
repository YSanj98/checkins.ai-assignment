import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, SignPage, LoginPage } from "./Routes.js";
import HandleAuth from "./utils/HandleAuth.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HandleAuth />}>
          <Route path="/home" element={<HomePage />} /> {/*protected route */}
        </Route>

        <Route path="/" element={<SignPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
