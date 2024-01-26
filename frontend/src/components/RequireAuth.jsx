import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export default function RequireAuth() {
    const {auth} = useAuth();
    const location = useLocation();
    console.log('====================================');
    console.log(auth);
    console.log('====================================');
    console.log('====================================');
    console.log((auth?.authToken));
    console.log('====================================');
  return (
    (auth?.authToken)
    ?<Outlet/>
    :<Navigate to='/login' state={{from:location}} replace />
  )
}
