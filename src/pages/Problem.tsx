import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { db } from "../firebase"

const Problem = (props:any) => {
    const params = useParams()
    const [problem, setProblem] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
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
                <h1>{problem.title}</h1>
                <p>{problem.description}</p>
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