import React from "react";
import "./style.css";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword"
import PasswordReset from "./components/PasswordReset"
const App = () => {
  return (
    <div>
              <Routes>
                  <Route
                        exact
                        path="/forgetpassword"
                        element={<ForgetPassword/>}
                      />
                      <Route
                        exact
                        path="/passwordreset/:id/:tokenmail"
                        element={<PasswordReset/>}
                      />
                </Routes>
                <Home />
    </div>
  );
};

export default App;
