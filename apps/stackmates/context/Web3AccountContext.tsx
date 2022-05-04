import { createContext, ReactNode, useContext, useState } from 'react';

type web3AccountContextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
};

const web3AccountContextDefaultValues: web3AccountContextType = {
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logout: () => {},
};

const AuthContext = createContext<web3AccountContextType>(
  web3AccountContextDefaultValues
);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AccountProvider({ children }: Props) {
  const [user, setUser] = useState<boolean>(null);

  const login = () => {
    setUser(true);
  };

  const logout = () => {
    setUser(false);
  };

  const value = {
    user,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
