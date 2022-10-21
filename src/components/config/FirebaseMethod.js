import app from "./FirebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
  update
} from "firebase/database";

const auth = getAuth(app);
let user = null;

function signup(obj) {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
        const db = getDatabase();

        set(ref(db, `users/${user.uid}`), {
          password: password,
          email: email
        })
          .then((_) => resolve("Data is successfuly add"))
          .catch((_) => reject("We face some error"));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        reject(errorCode, errorMessage);
      });
  });
}

function login(obj) {
  let { email, password } = obj;
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
        const db = getDatabase();
        const reference = ref(db, `users/${user.uid}`);
        onValue(reference, (snapshot) => {
          let dataIsExist = snapshot.exists();

          if (dataIsExist) {
            const data = snapshot.val();
            resolve(data);
            // console.log(data);
          } else {
            reject("Data is not exists");
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        reject(errorCode, errorMessage);
      });
  });
}

let num = 0;

function items(text) {
  let date = new Date();
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    set(ref(db, `users/${user.uid}/Items/item${num}`), {
      value: text,
      currentTime: date.toLocaleTimeString(),
      currentDate: date.toTimeString(),
      num: num
    })
      .then(() => resolve("item is successfuly go"))
      .catch(() => reject("item is not go"));
    num++;
  });
}

function getItems() {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const reference = ref(db, `users/${user.uid}/Items`);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      let check = snapshot.exists;
      if (check) {
        resolve(data);
        // console.log("firebase Method ", data, "********");
      } else {
        reject("Data is not send");
      }
    });
  });
}

function deleteItem(e) {
  console.log("main method hon", e);
  const db = getDatabase();
  remove(ref(db, `users/${user.uid}/Items/item${e}`));
}
let id;
function updateItem(e) {
  id = e;
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const reference = ref(db, `users/${user.uid}/Items/item${e}`);
    onValue(reference, (snapshot) => {
      let dataIsExist = snapshot.exists();

      if (dataIsExist) {
        const data = snapshot.val();
        resolve(data);
      } else {
        reject("Data is not exists");
      }
    });
  });
}

function updateItem1(text) {
  let date = new Date();
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    update(ref(db, `users/${user.uid}/Items/item${id}`), {
      value: text,
      currentTime: date.toLocaleTimeString(),
      currentDate: date.toTimeString()
    })
      .then(() => resolve("item is successfuly update"))
      .catch(() => reject("item is not update"));
  });
}

export { signup, login, items, getItems, deleteItem, updateItem, updateItem1 };
