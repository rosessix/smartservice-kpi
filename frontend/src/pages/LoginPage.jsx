import React, { useRef, useState } from 'react'
import Logo from '../assets/logo.png'
import { postBase } from '../utils/postBase'
import { fetchBase } from '../utils/fetchBase'
import {useNavigate} from 'react-router-dom'
export const LoginPage = () => {
    const navigate = useNavigate() 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const attemptLogin = async () => {
        if (username.length == 0) {
            return setErrMsg('Du skal indtaste et brugernavn.')
        }

        if (password.length == 0) {
            return setErrMsg('Du skal indtaste et kodeord.')
        }

        const loggedIn = await postBase({
            controller: 'auth',
            endpoint: 'login',
            params: {
                username: username,
                password: password
            }
        })
        if (loggedIn) {
            // TODO: redirect to dashboard
            if (loggedIn.token) {
                // The token does not actually work, it will be used to 
                // figure out if the user has logged in.
                // Too big of a project right now.
                localStorage.setItem('token', loggedIn.token)
                navigate('/dashboard')
            }
        } else {
            return setErrMsg('Du indtastede forkerte oplysninger.')
        }
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value)
        setErrMsg('')
    }

    return (
        <div className="w-screen h-screen bg-neutral-100 flex items-center justify-center flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
                <img src={Logo} className="w-1/2"></img>
                <h1 className="text-3xl font-bold text-black">SmartService</h1>
            </div>
            <div className="w-96 h-96 bg-white rounded-md p-8 border-2 flex flex-col gap-2">
                <p className="font-bold">Dit brugernavn</p>
                <input className="p-2 rounded-md bg-neutral-200 text-black" type="text" placeholder="johndeer" onChange={handleInputChange(setUsername)}></input>
                <p className="font-bold">Dit kodeord</p>
                <input className="p-2 rounded-md bg-neutral-200 text-black" type="password" placeholder="*****" onChange={handleInputChange(setPassword)}></input>
                <p className="text-center text-red-500">{errMsg}</p>
                <button className="bg-[#8800CC] rounded-md p-2 text-white font-bold" onClick={() => attemptLogin()}>LOGIN</button>
            </div>
        </div>
    )
}