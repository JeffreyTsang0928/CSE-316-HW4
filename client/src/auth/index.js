import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    REGISTER_USER_FAILED: "REGISTER_USER_FAILED",
    LOGIN_USER_FAILED: "LOGIN_USER_FAILED",
    CLOSE_MODAL: "CLOSE_MODAL"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        registerError: false,
        loginError: false,
        response: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    registerError: false,
                    loginError: false,
                    response: null
                });
            }
            case AuthActionType.SET_LOGGED_IN:{
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    registerError: false,
                    loginError: false,
                    response: null
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    registerError: false,
                    loginError: false,
                    response: null
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    registerError: false,
                    loginError: false,
                    response: null
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    registerError: false,
                    loginError: false,
                    response: null
                })
            }

            case AuthActionType.REGISTER_USER_FAILED: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    registerError: true,
                    loginError: false,
                    response: payload.response
                })
            }

            case AuthActionType.CLOSE_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    registerError: false,
                    loginError: false,
                    response: null
                });
            }

            case AuthActionType.LOGIN_USER_FAILED: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    registerError: false,
                    loginError: true,
                    response: payload.response
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        try{
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);
            if (response.status === 200) {
                console.log("status is 200!")
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/login");
                auth.loginUser(email,password);
            }
            else{
                console.log("the status is not 200!");
            }
        }
        catch(error){
            console.log(error.response.data.errorMessage);
            console.log("setting register failed in the auth store.");
            authReducer({
                type: AuthActionType.REGISTER_USER_FAILED,
                payload: {
                    response: error.response.data.errorMessage
                }
            })
            console.log("done setting register failed in the auth store.");
        }
    }

    auth.loginUser = async function(email, password) {
        try{
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        }
        catch(error){
            authReducer({
                type: AuthActionType.LOGIN_USER_FAILED,
                payload: {
                    response: error.response.data.errorMessage
                }
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.closeModal = function(){
        authReducer({
            type: AuthActionType.CLOSE_MODAL,
            payload: null
        })
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };