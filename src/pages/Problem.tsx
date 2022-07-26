import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { Button, Typography } from "@mui/material"
import firebase from "firebase"

const Problem = (props:any) => {
    const params = useParams()
    const [problem, setProblem] = useState<any>(null)
    const [problemId, setProblemId] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isChecked, setIsChecked] = useState<boolean|null>(null)
    const [currentUser, setCurrentUser] = useState<any>(null)

    const markAsSolved = () => {
        if (currentUser) {
            db.collection('users').doc(auth.currentUser?.uid).update({
                solved: firebase.firestore.FieldValue.arrayUnion(problemId)
            })
            setIsChecked(true)
        }
    }

    const markAsUnsolved = () => {
        if (currentUser) {
            db.collection('users').doc(auth.currentUser?.uid).update({
                solved: firebase.firestore.FieldValue.arrayRemove(problemId)
            })
            setIsChecked(false)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        auth.onAuthStateChanged(user => {
            if(user) {
                setCurrentUser(user)
                db.collection('users').doc(user.uid).get()
                    .then(doc => {
                        return setIsChecked(doc.data()?.solved.includes(parseInt(params.id!)))
                    })
            } else {
                setCurrentUser(null)
            }
        })
        db.collection('problems').doc(params.id).get().then(doc => {
            setProblem(doc.data())
            setProblemId(parseInt(params.id!))
        }).then(() => {
            setIsLoading(false)
        })
    }, [params.id, currentUser, isChecked])
    
    if(isLoading) {
        return <div>Loading...</div>
    } else if (problem) {
        if(currentUser) {
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
                        {
                            isChecked? 
                                <Button variant="contained" onClick={() => markAsUnsolved()}>Mark as Unsolved</Button>
                                : 
                                <Button variant="contained" onClick={() => markAsSolved()}>Mark as solved</Button>
                        }
                    </span>
                </div>
            )
        } else {
            return (
                <div>
                    <span>
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
        }
        
    } else {
        return (
            <div>
                <h1>Problem doesn't exist.</h1>
            </div>
        )
    }
}

export default Problem