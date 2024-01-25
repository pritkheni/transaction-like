import{useRef,useState,useEffect} from 'react'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'
export default function SingIn() {
    const {setAuth} = useAuth()
    const userRef = useRef()
    const errorRef = useRef()
    const [user,setUser] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')
    useEffect(() => {
        userRef.current.focus()
    },[])

    useEffect(() => {
        setErrMsg('')
    },[user,password])
    const handleSingIn = async (e) =>{
        e.preventDefault()
        console.log();
        try{
            const response = await axios.post('api/v1/user/signin',JSON.stringify({
                username:user,
                password:password
            }),{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            setErrMsg('')
            setUser('')
            setPassword('')
            console.log(response.data.data.token);
            setAuth({username:user,authToken:response.data.data.token})
            console.log(JSON.stringify(response?.data)); 
        }catch(err){
            console.error(JSON.stringify(err));
            if(!err?.response){
                setErrMsg('No response from server')
            }else if(err.response?.status === 400){
                setErrMsg('Missing username or password')
            }else if(err.response?.status === 404){
                setErrMsg('Unauthorized')
            }else{
                setErrMsg('Login failed')
            }
            errorRef.current.focus()
        }
    }
  return (

    <section className="w-full min-h-screen flex justify-center items-center">
        <div className='w-full rounded-xl shadow-md flex flex-col p-4 items-center bg-white lg:max-w-md'>
            <p ref={errorRef} className={`w-full text-center my-2 text-red-500 p-2 bg-red-200 rounded-md ${errMsg?"block":"hidden"}`}>
                &#x2022; {errMsg}
            </p>
            <h1 className="text-2xl text-black font-bold">Sign In</h1>
            <p className="text-center mt-2 text-slate-500">Enter your credential to access your<br></br>account</p>
            <form className='w-full flex flex-col gap-3' onSubmit={handleSingIn}>
                <div className='flex flex-col gap-1'>
                    <label className="font-semibold text-lg" htmlFor="username">Email:</label>
                    <input 
                        type='text'
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`} 
                        id='username'
                        placeholder='abc@example.com'
                        ref={userRef} 
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className="font-semibold text-lg" htmlFor="password">Password:</label>
                    <input 
                        type='password'
                        className={`rounded-md shadow-initial focus:shadow-focus p-2 text-bases text-black`}
                        id='password' 
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>
                <button disabled = {(user === '' || password === '')} className="rounded-lg bg-black text-white text-lg p-2 shadow-lg my-3 disabled:bg-slate-300">Sign In</button>
            </form>
            <div className="text-black text-base font-semibold flex my-2">
                {`Don't have an accound? `}<button className="bg-transparent underline ml-1">Sing Up</button>
            </div>
        </div>
        
    </section>
  )
}
