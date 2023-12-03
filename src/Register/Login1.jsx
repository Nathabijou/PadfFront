import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css'; // Ajoutez cette ligne pour importer vos styles CSS personnalisés


function Login1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/v1/user/login", {
        email: email,
        password: password,
      });
  
      console.log("Response from server:", response.data);
  
      if (response.data.message === "Login réussi") {
        navigate("/App");
      } else if (response.data.message === "Email not exists") {
        alert("L'email n'existe pas");
      } else {
        alert("Email et mot de passe incorrects");
      }
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <h2>Login</h2>
          <hr />
        </div>

        <div className="row">
          <div className="col-sm-6">
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control" // Appliquez la classe CSS pour le champ de formulaire
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>

              <div className="form-group">
                <label>password</label>
                <input
                  type="password"
                  className="form-control" // Appliquez la classe CSS pour le champ de formulaire
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" onClick={login}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login1;
