import React, {useState} from 'react'
import { AuthContext } from '../AuthContext/AuthContext';

type CountProviderProps = {children: React.ReactNode}

const  AuthProvider = ({children}:CountProviderProps) => {

    const [myToken, setToken] = useState(null);

      const value:any = {
        myToken ,
        setToken
      };

  return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
  )
}

export default AuthProvider;