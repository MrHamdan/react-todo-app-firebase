import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";



initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState('');
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();

    const handleGoogleSignIn = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
            .catch((error) => {
                setError("Firebase Popup Closed By User Try Again!");
            })
            .finally(() => setIsLoading(false));
    }

    const toggleLogin = e => {
        setIsLogin(e.target.checked)
    }







    //observe user state change
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])






    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    }



    return {
        user,
        error,
        isLogin,
        isLoading,
        toggleLogin,
        handleGoogleSignIn,
        logOut
    }
}

export default useFirebase;