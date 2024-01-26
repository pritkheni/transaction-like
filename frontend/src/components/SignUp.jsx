import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EMAIL_REGX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASS_REGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
export default function SignUp() {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef();
    const passRef = useRef();
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const errorRef = useRef();

    const [firstName,setFirstName] = useState('')
    const [firstFocus,setFistFocus] = useState(false)

    const [lastName,setLastName] = useState('')
    const [lastFocus,setLstFocus] = useState(false)
    

    const [user,setUser] = useState('')
    const [validName,setValidName] = useState(false)
    const [userFocus,setUserFocus] = useState(false)

    const [pass,setPass] = useState('')
    const [validPass,setValidPass] = useState(false)
    const [passFocus,setPassFocus] = useState(false)



    const [errMsg,setErrMsg] = useState('')

    useEffect(() =>{
        firstNameRef.current.focus()
    },[])

    useEffect(() =>{
        const result = EMAIL_REGX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result)
    },[user])

    useEffect(()=>{
        const result = PASS_REGX.test(pass);
        console.log(result);
        console.log(pass);
        setValidPass(result)
    },[pass])


    useEffect(() => {
        setErrMsg('')
    },[firstName,lastName,user,pass])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passRef.current.value;
        console.log(firstName);
        console.log(lastName);
        console.log(email);
        console.log(password);
        if(firstName==='' || lastName===''|| !EMAIL_REGX.test(email) || !PASS_REGX.test(password)){
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password);
            setErrMsg('Invalid Entry')
            return
        }

        try{
            const res = await axios.post('api/v1/user/signup',JSON.stringify({
                username:email,
                firstName:firstName,
                lastName:lastName,
                password:password
            }),{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            console.log(JSON.stringify(res));
            setFirstName('')
            setLastName('')
            setPass('')
            setUser('')
            setAuth({firstName:firstName,lastName:lastName,username:email,authToken:res.data.data.token})
            navigate('/dashbord',{replace:true})
        }catch(err){
            console.log(err);
            if(!err?.response){
                setErrMsg('No server response')
            }else if(err.response.status === 409){
                setErrMsg('Email name taken')
            }else{
                setErrMsg('Sign up failed')
            }
            errorRef.current.focus()
        }
    }
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full rounded-xl shadow-md flex flex-col p-4 items-center bg-white lg:max-w-md">
            <p ref={errorRef} aria-live="assertive" className={`text-red-500 ${(errMsg === ''?"hidden":"block")} py-2`}>{errMsg}</p>
            <h1 className="text-2xl text-black font-bold">Sign Up</h1>
            <p className="text-center mt-2 text-slate-500">Enter your informaiton to create an<br></br>account</p>
            <form className="flex flex-col w-full gap-3 mt-2" onSubmit={handleSubmit}>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="firstName" className="font-semibold text-lg">
                        First Name:
                    </label>
                    <input
                        ref={firstNameRef}
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`}
                        placeholder="Enter your first name"
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        aria-invalid={firstName===''?"false":"true"}
                        aria-describedby="fidnote"
                        autoComplete="off"
                        onFocus={() => setFistFocus(true)}
                        onBlur={() => setFistFocus(false)}
                        required
                    />
                    <p id="fidnote" className={`text-red-500 ${(firstFocus && firstName == '')?"block":"hidden"}`}>&#x2022; field can not be empty</p>
                </div>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="lastName" className="font-semibold text-lg">
                        Last Name:
                    </label>
                    <input
                        ref={lastNameRef}
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`}
                        placeholder="Enter your first name"
                        id="firstName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        aria-invalid={lastName===''?"false":"true"}
                        aria-describedby="lidnote"
                        autoComplete="off"
                        onFocus={() => setLstFocus(true)}
                        onBlur={() => setLstFocus(false)}
                        required
                    />
                    <p id="lidnote" className={`text-red-500 ${(lastFocus && lastName == '')?"block":"hidden"}`}>&#x2022; field can not be empty</p>
                </div>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="email" className="font-semibold text-lg">
                        Email:
                    </label>
                    <input
                        ref={emailRef}
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`}
                        placeholder="Enter your email"
                        id="email"
                        value={user}
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        aria-invalid={validName?"false":"true"}
                        aria-describedby="eidnote"
                        autoComplete="off"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        required
                    />
                    <p id="pidnote" className={`text-red-500 ${(userFocus && user &&!validName)?"block":"hidden"}`}>
                        &#x2022; Enter vlaid email.<br/>
                    </p>
                </div>
                <div className="flex gap-1 flex-col">
                    <label htmlFor="pass" className="font-semibold text-lg">
                        Password:
                    </label>
                    <input
                        ref={passRef}
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`}
                        placeholder="Enter your password"
                        id="pass"
                        value={pass}
                        type="password"
                        onChange={(e) => setPass(e.target.value)}
                        aria-invalid={validPass?"false":"true"}
                        aria-describedby="pidnote"
                        onFocus={() => setPassFocus(true)}
                        onBlur={() => setPassFocus(false)}
                        required
                    />
                    <p id="pidnote" className={`text-red-500 ${(passFocus&&!validPass)?"block":"hidden"}`}>
                        &#x2022; 8 to 20 characters.<br/>
                        &#x2022; Must include uppercase and lowercase letter.<br/>
                        &#x2022; Must include numbers and special charaters.
                    </p>
                </div>
                <button disabled = {(firstName === '') || (lastName === '') || !validName || !validPass } className="rounded-lg bg-black text-white text-lg p-2 shadow-sm my-3 disabled:bg-slate-300 cursor-pointer">Sign Up</button>
            </form>
            <div className="text-black text-base font-semibold flex my-2">
                {`Already have an accound? `}<Link to='/login' className="bg-transparent underline ml-1">Login</Link>
            </div>
        </div>
    </section>
  )
}
