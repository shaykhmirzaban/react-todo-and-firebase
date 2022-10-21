import { useNavigate } from "react-router-dom";
// css
import "../../style/boilerplate.css";

export default function Boilerplate() {
  let navigate = useNavigate();
  return (
    <section className="boilerplate">
      <div className="navbar">
        <div className="content">
          <h1>
            Assalamu Alaikum <br /> Bhaayo
          </h1>
          <h2>
            <span style={{ color: "#4b888c" }}>Next Level</span> Todo App
          </h2>
          <p>
            Why we assign this todo to the{" "}
            <span style={{ color: "#4b888c" }}>"next level"</span> name because
            you have never seen this type of feature in todo, Next level todo
            does not display your current input value it displays your previous
            value and you will face such type of functionality in this todo app
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => navigate("signup")}>Sign Up</button>
          <button onClick={() => navigate("login")}>Login</button>
        </div>
      </div>
    </section>
  );
}
