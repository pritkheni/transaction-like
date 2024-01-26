import { createContext, useState } from "react";

const AuthContext = createContext({});
// {
//     firstName: "prit",
//     lastName: "kheni",
//     user: "pritkheni@gmail.com",
//     authToken:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIxNWFjMTkzOWIwNTM5YjE4NWQxMWEiLCJpYXQiOjE3MDYxMjQxNjZ9.qRPCKGLHCabJpqvuJKp6TiCfoQzPUtNxKJnWwe7fyxw",
//   }
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
