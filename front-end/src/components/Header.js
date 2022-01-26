import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";

function Header() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const navigate = useNavigate();

  function removeToken() {
    if (window.confirm("Você tem certeza que deseja sair?")) {
      localStorage.clear();
      setAuthState({ username: "", id: 0, status: false });
      navigate("/");
    } else {
      alert("Você ainda está logado!");
    }
  }

  useEffect(() => {
    axios
      .get(`https://api-crud-node-js.herokuapp.com/auth/auth`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Nav>
            <Nav.Link>
              <Link to="/" className="nav-link">
                React-Crud
              </Link>
            </Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link>
                <Link to="/" className="nav-link">
                  Página Inicial
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/createpost" className="nav-link">
                  Criar Post
                </Link>
              </Nav.Link>
            </Nav>
            <Nav>
              {!authState.status && (
                <>
                  <Nav.Link>
                    <Link to="/login">
                      <button
                        type="button"
                        className="btn btn-outline-primary me-2"
                      >
                        Login
                      </button>
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to="/register">
                      <button type="button" className="btn btn-primary me-3">
                        Cadastre-se
                      </button>
                    </Link>
                  </Nav.Link>
                </>
              )}
              {authState.status && (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    onClick={removeToken}
                  >
                    Logout
                  </button>
                  <h2>{authState.username}</h2>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </AuthContext.Provider>
    </div>
  );
}

export default Header;
