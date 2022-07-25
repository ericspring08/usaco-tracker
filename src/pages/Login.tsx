import { Button, Input } from "@mui/material"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import { signInWithEmail } from "../models/Auth"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setIsLoading(true)
            if(user) {
                window.location.href = '/'
            } 
            setIsLoading(false)
        })
    }, [])
    
    if(isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    } else {
        return (
            <div>
                <Input placeholder="Email..." onChange={handleEmailChange}></Input>
                <Input type="password" placeholder="Password..." onChange={handlePasswordChange}></Input>
                <Button onClick={
                    () => {
                        signInWithEmail(email, password)
                    }
                }>Login</Button>
                <Button onClick={
                    () => {
                        window.location.href = "/SignUp"
                    }
                }>Don't have an account, Sign Up</Button>
            </div>
        )
    }
}

export default Login