import { useState } from "react";
import {
  items,
  getItems,
  deleteItem,
  updateItem,
  updateItem1
} from "../config/FirebaseMethod";
import { useNavigate } from "react-router-dom";

// CSS
import "../../style/home.css";

export default function Home() {
  let [data, setData] = useState("");
  let [item12, setItem] = useState();
  let [list, setList] = useState([]);
  let [flag, setFlag] = useState(true);
  let navigate = useNavigate();

  function callMe() {
    if (data) {
      items(data)
        .then((_) => console.log(_))
        .catch((_) => console.log(_));

      getItems()
        .then((item) => {
          setItem(item);
        })
        .catch((_) => alert(_));

      console.log(item12);
      let arr = [];
      for (let a in item12) {
        arr.push(item12[a]);
      }
      setList(arr);
      let a = document.querySelector(".searchItem");
      a.value = "";
    } else {
      alert("Add Item");
    }
  }

  function currentVal(e) {
    let { value } = e.target;
    setData(value);
  }

  function deItem(e) {
    deleteItem(e);
    getItems()
      .then((item) => {
        setItem(item);
      })
      .catch((_) => alert(_));
    let arr = [];
    for (let a in item12) {
      arr.push(item12[a]);
    }
    setList(arr);
  }

  const upItem = (e) => {
    updateItem(e)
      .then((_) => {
        let asd = document.querySelector(".searchItem");
        asd.value = _.value;
      })
      .catch((_) => alert(_));
    setFlag(false);
  };

  const chalado = () => {
    updateItem1(data)
      .then((_) => console.log(_))
      .catch((_) => alert(_));

    getItems()
      .then((item) => {
        setItem(item);
      })
      .catch((_) => alert(_));

    let arr = [];
    for (let a in item12) {
      arr.push(item12[a]);
    }
    setList(arr);
    setFlag(true);

    let a = document.querySelector(".searchItem");
    a.value = "";
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <section className="todo">
      <div className="topPart">
        <input
          type="text"
          placeholder="add item"
          onChange={currentVal}
          className="searchItem"
        />
        {flag ? (
          <button onClick={callMe}>Add Item</button>
        ) : (
          <button onClick={chalado}>Update Item</button>
        )}
      </div>
      <div className="items">
        {list.map((val, index) => {
          return (
            <div className="subItem" key={index}>
              <p key={index}>{val.value}</p>
              <div className="buttons">
                <button className="delete" onClick={() => deItem(val.num)}>
                  Delet
                </button>
                <button className="update" onClick={() => upItem(val.num)}>
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <br />

      <button onClick={goBack} className="back">
        GO BACK
      </button>
    </section>
  );
}
