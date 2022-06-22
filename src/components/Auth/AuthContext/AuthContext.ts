import {createContext, useContext} from 'react'



const temp: any = null;

const AuthContext = createContext(temp);

//only works if i use arrow function. not sure why.
const useAuthContext = () => useContext(AuthContext);

export {AuthContext, useAuthContext};
