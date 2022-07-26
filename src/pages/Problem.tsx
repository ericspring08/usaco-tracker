import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { Button, Typography } from "@mui/material"

const Problem = (props:any) => {
    const params = useParams()
    const [problem, setProblem] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isChecked, setIsChecked] = useState<boolean|null>(null)
    const [currentUser, setCurrentUser] = useState<any>(null)

    useEffect(() => {
        setIsLoading(true)
        if(auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(currentUser)
                db.collection('users').doc(user.uid).get()
                    .then(doc => {
                        setIsChecked(doc.data()?.solved.includes(params.id))
                    })
            } else {

            }
        }))
        db.collection('problems').doc(params.id).get().then(doc => {
            setProblem(doc.data())
        }).then(() => {
            setIsLoading(false)
        })
    }, [params.id])
    
    if(isLoading) {
        return <div>Loading...</div>
    } else if (problem) {
        return (
            <div>
                <span>
                    <Typography>{isChecked? "Finished":"Not Finished"}</Typography>
                    <Typography variant="h5">{problem.division}</Typography>
                    <Typography variant="h5">{problem.contest}, {problem.year}</Typography>
                    <Typography variant="h2">{problem.title}</Typography>
                    <Button variant="contained" onClick={
                        () => {
                            window.location.href = problem.url
                        }
                    }>Open in usaco.org</Button>
                </span>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Problem doesn't exist.</h1>
            </div>
        )
    }
}

export default Problem