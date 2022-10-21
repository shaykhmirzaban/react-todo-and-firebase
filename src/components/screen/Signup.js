import { useState } from "react";
import { signup } from "../config/FirebaseMethod";
// CSS
import "../../style/login.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
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
    signup(item)
      .then((res) => navigate("/", { state: res }))
      .catch((error) => setError(error));
  };

  return (
    <section className="signup">
      <h1>Sign up</h1>

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

        <button>Sign Up</button>

        <p onClick={() => navigate("/login")} class="transform">
          Login
        </p>
      </form>
      {error ? <p>{error}</p> : null}
    </section>
  );
}
