import { Button, Input } from "@mui/material"
import { useState } from "react"
import { signUpWithEmail } from "../models/Auth"

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div>
            <Input placeholder="Email..." onChange={handleEmailChange}></Input>
            <Input placeholder="Name..." onChange={handleNameChange}></Input>
            <Input type="password" placeholder="Password..." onChange={handlePasswordChange}></Input>
            <Button onClick={
                () => {
                    console.log(email, password)
                    signUpWithEmail(email, password, name)
                }
            }>Sign Up</Button>
            <Button onClick={
                () => {
                    window.location.href = "/Login"
                }
            }>Already have an account, Login</Button>
        </div>
    )
}

export default SignUp