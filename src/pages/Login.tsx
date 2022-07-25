import { Button, Input } from "@mui/material"
import { useState } from "react"
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

export default Login