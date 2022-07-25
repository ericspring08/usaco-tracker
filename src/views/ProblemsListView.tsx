import Problem from "../models/Problem"
import {Button, Card} from '@mui/material'
import { db } from "../firebase"
import { auth } from "../firebase"
import firebase from "firebase"
import { useState } from "react"

const toggleChecked = (to:boolean, cpid:number) => {
    if(to) {
        db.collection('users').doc(auth.currentUser?.uid).update({
            solved: firebase.firestore.FieldValue.arrayUnion(cpid)
        })
    } else {
        db.collection('users').doc(auth.currentUser?.uid).update({
            solved: firebase.firestore.FieldValue.arrayRemove(cpid)
        })
    }
}

const ProblemCardView = (props:any) => {
    const [isChecked, setIsChecked] = useState<boolean>(props.checked)
    if(props.isLoggedIn) {
        if(isChecked) {
            return (
                <Card style = {{'margin': '20px', background: 'green'}}>
                    <h1>{props.title}</h1>
                    <h5>{props.division}</h5>
                    <h5>{props.contest}, {props.year}</h5>
                    <Button variant="contained" onClick={() => {
                        window.location.href = `/problem/${props.cpid}`
                    }}>View</Button>
                    <Button variant="contained" onClick = {() => {
                        toggleChecked(false, props.cpid)
                        setIsChecked(false)
                        }}>
                            Unmark as Solved
                    </Button>
                </Card>
            )
        } else {
            return (
                <Card style = {{'margin': '20px', background: 'red'}}>
                    <h1>{props.title}</h1>
                    <h5>{props.division}</h5>
                    <h5>{props.contest}, {props.year}</h5>
                    <Button variant="contained" onClick={() => {
                        window.location.href = `/problem/${props.cpid}`
                    }}>View</Button>
                    <Button variant="contained" onClick = {() => {
                        toggleChecked(true, props.cpid)
                        setIsChecked(true)
                        }}>
                            Mark as Solved
                    </Button>

                </Card>
            )
        }
    } else {
        return (
            <Card style = {{'margin': '20px'}}>
                <h1>{props.title}</h1>
                <h5>{props.division}</h5>
                <h5>{props.contest}, {props.year}</h5>
                <Button variant="contained" onClick={() => {
                    window.location.href = `/problem/${props.cpid}`
                }}>View</Button>
            </Card>
        )
    }
    
}

const ProblemsListView = (props:any) => {
    return props.problems.map((problem:Problem) => 
        <ProblemCardView key={problem.cpid} isLoggedIn = {props.isLoggedIn} checked = {props.checked.includes(problem.cpid)} title = {problem.title} cpid = {problem.cpid} division = {problem.division} year = {problem.year} contest = {problem.contest} url = {problem.url}></ProblemCardView>
    )
}

export default ProblemsListView