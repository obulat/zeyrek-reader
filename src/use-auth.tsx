import * as React from 'react';
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}

firebase.initializeApp(firebaseConfig);

type AuthProviderProps = {
    children?: React.ReactNode,
    loginG: () => void,
    user: firebase.User | null,
    logout: () => void,
    login(em: string, p: string): void;
}
type Email = string;

export const authContext = React.createContext<Partial<AuthProviderProps>>({});

export function ProvideAuth(
    { children }: {children: React.ReactNode}
    ): React.ReactElement {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth(): Partial<AuthProviderProps> {
  return React.useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = React.useState<firebase.User | null>(null);
  const gProvider = new firebase.auth.GoogleAuthProvider();
  gProvider.addScope('profile');
  gProvider.addScope('email');
  gProvider.setCustomParameters({ prompt: 'select_account' });


  const loginG = () => {
      return firebase
          .auth()
          .signInWithPopup(gProvider)
          .then(response => {
              setUser(response.user)
              return response.user;
          })
  }

  const login = (email: Email, password: string) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          setUser(response.user);
        });
  };

  const signup = (email: Email, password: string) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          setUser(response.user);
        });
  };

  const sendPasswordResetEmail = (email: Email) => {
    return firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          return true;
        });
  };

  const confirmPasswordReset = (code: string, password: string) => {
    return firebase
        .auth()
        .confirmPasswordReset(code, password)
        .then(() => {
          return true;
        });
  };

  const logout = () => {
    firebase.auth().signOut().then(() => {
      setUser(null)
    })
  }

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return {
    user,
    login,
    loginG,
    signup,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset
  }
}
