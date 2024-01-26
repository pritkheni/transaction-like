import { Route, Routes } from "react-router-dom"
import SignUp from "./components/SignUp"
import SingIn from "./components/SingIn"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Dashbord from "./components/Dashbord"
import RequireAuth from "./components/RequireAuth"
import { Suspense } from "react"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        {/* public routes every one should access */}
        <Route path="/login" element={<SingIn/>}/>
        <Route path="/singup" element={<SignUp/>}/>

        <Route element={<RequireAuth/>}>
          {/* private route that we want to protected */}
          <Route path="/dashbord" element={<Suspense fallback="Loading"><Dashbord/></Suspense>}/>
        </Route>



        <Route path="*" element={<Missing/>}/>
      </Route>
    </Routes>
  )
}

export default App
