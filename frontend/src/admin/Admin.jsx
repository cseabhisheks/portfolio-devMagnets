import { useState } from "react"
import { FaUser, FaCode } from "react-icons/fa"
import { useContext } from "react"
import { isAuthenticated } from "./AuthenticatedContext"
import { useNavigate } from "react-router-dom"
export default function Admin() {
    const [loginState, setLoginState] = useState('login to admin pannel')
    const navigate = useNavigate()
    const [LoginErrorMessage, setLoginErrorMessage] = useState()
    const [form, setForm] = useState({
        username: "",
        password: ''
    })
    const change = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(form)

    }
    const { AdminStatus, setAdminStatus } = useContext(isAuthenticated)
    const submit = async (e) => {
        e.preventDefault()
        setLoginState('checking your credential .....')
        const backend = import.meta.env.VITE_BACKEND
        const req = await fetch(`${backend}/admin/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)

        })
        const res = await req.json()
        console.log(res)
        if (!res.success) {
            setLoginErrorMessage(res.mess)
            setTimeout(() => setLoginErrorMessage(''), 1500)
        }
        else {
            setLoginState('you are being redirected to admin version ')
            setAdminStatus(res.success)
            navigate('/')
        }
    }
    return (<>
        <div className="absolute w-[100vw] h-[100vh] z-[122] flex justify-center items-center bg-dark top-0  border-2 left-0">
            <form onSubmit={submit} className=" mb-5 bg-card p-5 w-[min(400px,90%)]  gap-5 md:gap-10 flex flex-col text-white">
                <label htmlFor="username" className="flex items-center">
                    <div className="w-10 h-10 bg-dark  flex items-center justify-center"><FaUser className="text-lg " /></div>
                    <input className="bg-darkGray w-full h-10 pl-4" type="text" onInput={change} name="username" id="username" placeholder="Userame" />
                </label>
                <label htmlFor="password" className="flex items-center">
                    <div className="w-10 h-10 bg-dark  flex items-center justify-center"><FaCode className="text-lg " /></div>
                    <input className="bg-darkGray w-full h-10 pl-4" type="text" onInput={change} name="password" id="password" placeholder="password" />
                </label>
                {LoginErrorMessage &&
                    <div className="text-center text-xs text-red-400 w-fit capitalize font-semibold border-b-2 border-red-200 m-auto ">{LoginErrorMessage}</div>
                }
                <button type="submit" className="bg-yellow-500 w-fit px-7 py-2 rounded-xl m-auto">Login to Admin panel</button>
            </form>
        </div>
    </>)
}