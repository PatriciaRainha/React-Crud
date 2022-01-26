import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const data = { username: username, password: password };
    axios.post(`https://api-crud-node-js.herokuapp.com/auth/login`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        navigate("/");
        var session = {
          username: response.data.username,
          id: response.data.id,
          status: true,
        };
        localStorage.setItem("user", JSON.stringify(session));
        window.location.reload(true);
      }
    });
  };

  return (
    <div className="text-center">
      <div className="form-signin">
        <form onSubmit={login}>
          <h1 className="h3 mb-3 mt-3 fw-normal">Página de Login</h1>
          <div className="form-floating col-sm-5 mx-auto mb-3">
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="form-control"
            />
            <label>Usuário:</label>
          </div>
          <div className="form-floating col-sm-5 mx-auto mb-3">
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
            />
            <label>Senha:</label>
          </div>
          <button
            type="submit"
            className="w-25 btn btn-lg btn-primary col-sm-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
