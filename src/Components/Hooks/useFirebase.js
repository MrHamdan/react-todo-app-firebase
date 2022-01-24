import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebase.init";



initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleNameChange = e => {
        setUser(e.target.value);
    }
    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value)
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

    const setUserName = () => {
        updateProfile(auth.currentUser, { displayName: user })
            .then(result => { })
            .catch(error => {
                setError(error.message);
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(result => { })
    }

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth, email)
            .then((result) => {
                setError("Password reset link is sent to your email.");
            })
            .catch((error) => {
                setError(error.message);
            });
    }
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false));
    }
    return {
        auth,
        user,
        name,
        error,
        email,
        isLogin,
        password,
        isLoading,
        setUser,
        setName,
        setError,
        toggleLogin,
        verifyEmail,
        setUserName,
        handleNameChange,
        handleEmailChange,
        handleGoogleSignIn,
        handleResetPassword,
        handlePasswordChange,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        logOut
    }
}

export default useFirebase;