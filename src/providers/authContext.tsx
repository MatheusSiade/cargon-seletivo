import React, {createContext, useContext, useEffect, useState} from 'react';
import {onIdTokenChanged, User as FirebaseUser} from 'firebase/auth';
import nookies from 'nookies';
import {auth} from "./firebase-client";


export interface UserAuth {
  user: FirebaseUser | null;
  isLoggedIn: boolean;
  isReady: boolean;
}

type User = FirebaseUser | null;

const AuthContext = createContext<UserAuth | undefined>(undefined);

export const AuthProvider: React.FC = ({children}) => {
  //Cria um provider para acesso de dados do usuário logado no sistema. Armazena o usuário e o status de login.
  //Utiliza o nookies para armazenar nos cookies o token do usuário.
  const [user, setUser] = useState<User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const value: UserAuth = {
    user: user,
    isLoggedIn: isLoggedIn,
    isReady: isReady,
  };

  useEffect(() => {
    setIsReady(false);
    if (auth) {//Adiciona um observer para mudanças no estado de login do usuário. Mantém as variáveis user e isLoggedIn atualizadas.
      const unsubscribe = onIdTokenChanged(auth, userAuth => {
        if (userAuth) {
          setUser(userAuth);
          setIsLoggedIn(true);
          userAuth.getIdTokenResult().then(idTokenResult => {
            const token = idTokenResult.token;
            nookies.set(undefined, 'token', token, {path: '/'});
            setIsReady(true);
          });
        } else {
          setUser(null);
          setIsLoggedIn(false);
          setIsReady(true);
          nookies.set(undefined, 'token', '', {path: '/'});
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Força renovação do token
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth ? auth.currentUser : undefined;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
