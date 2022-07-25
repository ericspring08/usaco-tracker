import Problem from "../models/Problem"
import {Card} from '@mui/material'

const ProblemCardView = (props:any) => {
    if(props.checked) {
        return (
            <Card style = {{'margin': '20px', background: 'green'}}>
                <h1>{props.title}</h1>
                <h1>{props.cpid}</h1>
                <h1>{props.division}</h1>
                <h1>{props.year}</h1>
                <h1>{props.contest}</h1>
                <h1>{props.url}</h1>
            </Card>
        )
    } else {
        return (
            <Card style = {{'margin': '20px', background: 'red'}}>
                <h1>{props.title}</h1>
                <h1>{props.cpid}</h1>
                <h1>{props.division}</h1>
                <h1>{props.year}</h1>
                <h1>{props.contest}</h1>
                <h1>{props.url}</h1>
            </Card>
        )
    }
    
}

const ProblemsListView = (props:any) => {
    return props.problems.map((problem:Problem) => 
        <ProblemCardView checked = {props.checked.includes(problem.cpid)} title = {problem.title} cpid = {problem.cpid} division = {problem.division} year = {problem.year} contest = {problem.contest} url = {problem.url}></ProblemCardView>
    )
}

export default ProblemsListView