import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import  { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';


export const authContext=createContext();
export const useAuth=()=> useContext(authContext)

const AuthProvider = ({routes}) => {
    const [user, steUser] = useState(null)
    const [loading, setLoding] = useState(true)


const googleProvider=new  GoogleAuthProvider();

const handelRegister=(email,password)=>{
    setLoding(true);
    return createUserWithEmailAndPassword(auth,email,password)
}

const handelLogin=(email,password)=>{
    setLoding(true);
    return signInWithEmailAndPassword(auth,email,password)
}

const handelLogOut= ()=>{
    setLoding(true);
    return signOut(auth)
}

const handelGoogleLogin=()=>{
    setLoding(true);
    return signInWithPopup(auth,googleProvider)
}
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      steUser(currentUser);
      setLoding(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);
    const authinfo={
        handelRegister ,
        handelLogin,
        handelLogOut,
        handelGoogleLogin,
        user, steUser,
        loading, setLoding,



        

    }
    return (
        <div>
            <authContext.Provider value={authinfo}>{routes}</authContext.Provider>
        </div>
    );
};

export default AuthProvider;