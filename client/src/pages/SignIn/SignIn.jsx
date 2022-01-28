import React, { useState } from "react";
import api from "../../Api/api";

export default function SignIn() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [wrongInput, setWrongInput] = useState("");

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users", {
        name,
        password,
        email,
      });
      console.log(data);
      // localStorage.setItem('token', data.user)
    } catch (e) {
      const error = e.response.data;
      console.log(e.response.data);
      if (error.includes("password")) {
        setWrongInput("Weak password, minimum 7 digits");
      } else if (error.includes("Email is invalid")) {
        setWrongInput("Email is invalid");
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", {
        password,
        email,
      });
    } catch (e) {
      setWrongInput("Bad credentials");
    }
  };

  return (
    <>
      <div>
        <form>
          <h1>Create Account</h1>
          <input
            type="text"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="name"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="email"
          />
          <input
            type="text"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="password"
          />
          <button onClick={register}>Register</button>
          <h4>{wrongInput}</h4>
        </form>
      </div>
    </>
  );
}
