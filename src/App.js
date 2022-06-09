import './App.css';
import React from 'react';
import {auth, db} from "./shared/firebase";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import {Route, Routes} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { async } from '@firebase/util';
import Upload from './Upload';






function App() {

  const [is_login, setIsLogin] = React.useState(false);

  console.log(auth.currentUser);
  
  const loginCheck = async(user) => {
    if(user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }

  React.useEffect(()=>{
    onAuthStateChanged(auth, loginCheck)
  },[]);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        {is_login ? (
          <Route path="/" element={<Home/>}/>
        ) : (
          <Route path="/" element={<Login/>}/>
        )}
        <Route path="/upload" element={<Upload/>}/>
      </Routes>
    </div>
  );
}

export default App;
