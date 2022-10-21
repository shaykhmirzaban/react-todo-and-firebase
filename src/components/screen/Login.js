import { useState } from "react";
import { login } from "../config/FirebaseMethod";
// CSS
import "../../style/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [item, setItem] = useState({
    email: "",
    password: ""
  });
  let [error, setError] = useState("");
  let navigate = useNavigate();

  const currentData = (e) => {
    let { value, name } = e.target;

    setItem((val) => {
      return { ...val, [name]: value };
    });
  };

  const signUpUser = (e) => {
    e.preventDefault();
    login(item)
      .then((res) => navigate("/home", { state: res }))
      .catch((err) => setError(err));
  };

  return (
    <section className="login">
      <h1>Login</h1>

      <form onSubmit={signUpUser}>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={currentData}
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          onChange={currentData}
        />

        <button>Login</button>
        <p onClick={() => navigate("/signup")} class="transform">
          Sign Up
        </p>
      </form>

      {error ? <p>{error}</p> : null}
    </section>
  );
}
