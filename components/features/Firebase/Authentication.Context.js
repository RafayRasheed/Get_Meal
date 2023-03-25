import React, { createContext, useState } from 'react'
import firebase from 'firebase/compat';

export const AuthContext= createContext();

export const AuthContextProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isAuthentication, setIsAuthentication]= useState(false);
    const [isSignUpSuccessful, setIsSignUpSuccessful]= useState(false);

    const logout = () => {
        firebase.auth().signOut().then(()=>{setIsAuthentication(false)}).catch((e)=> {
            setIsError(e.message)
        })
    }


    // firebase.auth().onAuthStateChanged((newUser)=>stateChange(newUser))

    // function stateChange(newUser){
    //     console.log('--------------')
    //     if(user){
    //     console.log(user.displayName)}
    //     // if(newUser!=null && newUser.uid==user.uid){
    //     //     console.log('--------------')
            
    //     //     console.log(newUser.uid)
    //     //     console.log(user.uid)
    //     //     setUser(newUser)
    //     //     console.log(user.uid)
    //     // }
    // }
    const signUp=(name, email, password)=>{
        setIsLoading(true)
        setIsError(null)
        setIsSignUpSuccessful(false)
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user)=>{
                user.user.updateProfile({
                    displayName: name
                })
                .then(() =>{
                    setIsSignUpSuccessful(true)
                    setIsLoading(false)
                })
                .catch((e) => {
                    setIsError(e.message)
                    setIsSignUpSuccessful(false)
                    setIsLoading(false)
                 });
            }).catch((e)=> {
                setIsError(e.message)
                setIsSignUpSuccessful(false)
                setIsLoading(false)
            })
    }
    const login = (email, password) =>{
        setIsLoading(true)
        setIsError(null)
        setIsAuthentication(false)
        setTimeout(()=>{
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user)=>{
                setUserPassword(password)
                setUser(user.user)
                setIsAuthentication(true)
                setIsLoading(false)
            }).catch((e)=> {
                setIsError(e.message)
                setIsAuthentication(false)
                setIsLoading(false)
            })
        },1000) 
    }
    return(
        <AuthContext.Provider value={{
            user,
            isLoading,
            isError,
            login,
            isAuthentication,
            logout,
            signUp,
            isSignUpSuccessful,
            setIsSignUpSuccessful,
            userPassword,
            setUserPassword,
            }}
        >{children}</AuthContext.Provider>
    )
}
// g
// G
// h
// H
// '
// "