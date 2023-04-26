import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./store/slices/counterSlice";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase/firebase-config";
import { storage } from "./firebase/firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
  listAll,
} from "firebase/storage";
import { db } from "./firebase/firebase-config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
export default function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState<any>(null);

  const [file, setFile] = useState<any>(null);

  const [imageList, setImageList] = useState<string[]>([]);
  const [movieList, setMovieList] = useState<any>([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState("");
  const [newMovieHasReceivedOscar, setNewMovieHasReceivedOscar] =
    useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const getMovieList = async () => {
    /* const movieRef = ref(db, "movies");
    const snapshot = await get(movieRef);
    if (snapshot.exists()) {
      console.log(snapshot.val());
      setMovieList(snapshot.val());
    } else {
      console.log("No data available");
    } */
    try {
      const movieCollection = collection(db, "movies");
      const data = await getDocs(movieCollection);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const listRef = ref(storage, "images");
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setImageList((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    getMovieList();
  }, []);

  onAuthStateChanged(auth, (userobj) => {
    console.log(userobj);
    if (userobj) {
      if (!user) {
        setUser(userobj);
      }
    }
  });
  const signInWithGoogle = async () => {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const result = await firebase.auth().signInWithPopup(provider);
    try {
      const user = await signInWithPopup(auth, googleProvider);
      console.log("success");
      console.log(user);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("success");
      console.log(user);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log("success");
      console.log(user);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };
  const logout = async () => {
    await signOut(auth);
  };

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const uploadFile = async () => {
    console.log("upload file");
    console.log(file);
    const imageRef = ref(storage, `images/${Date.now() + file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log(snapshot);
      console.log("Uploaded a blob or file!");
    });
  };

  const addNewMovie = async () => {
    try {
      const movieCollection = collection(db, "movies");
      await addDoc(movieCollection, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        hasReceivedOscar: newMovieHasReceivedOscar,
        userId: auth.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMovie = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
  const updateMovieTitle = async (id: string) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        title: updateTitle,
      });
      getMovieList();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
      <div>
        <h1>register</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>register</button>
      </div>
      <div>
        <h1>login</h1>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>login</button>
        <button onClick={signInWithGoogle}>login with Google</button>
      </div>
      <div>
        current User: <span>{user && user.email}</span>
        <button onClick={logout}>logout</button>
      </div>

      <div>
        <input
          type="file"
          onChange={(event) => {
            setFile(event.target.files && event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}>upload file</button>
      </div>
      <div>
        {imageList.map((image) => (
          <img src={image} alt="" />
        ))}
      </div>
      <div>
        <input
          onChange={(e) => setNewMovieTitle(e.target.value)}
          type="text"
          placeholder="movie title..."
        />
        <input
          onChange={(e) => setNewMovieReleaseDate(e.target.value)}
          type="number"
          placeholder="release date..."
        />
        <input
          checked={newMovieHasReceivedOscar}
          onChange={(e) => setNewMovieHasReceivedOscar(e.target.checked)}
          type="checkbox"
        />
        <label>recieved an oscar</label>
        <button onClick={addNewMovie}>add movie</button>
      </div>
      <div>
        {movieList.map((movie: any) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <input
              onChange={(e) => setUpdateTitle(e.target.value)}
              type="text"
              placeholder="new title..."
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              update title
            </button>
            <h2>{movie.releaseDate}</h2>
            <button onClick={() => deleteMovie(movie.id)}>delete Movie</button>
          </div>
        ))}
      </div>
    </div>
  );
}
