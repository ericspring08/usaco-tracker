import ProblemsListView from "../views/ProblemsListView"
import Problem from "../models/Problem"
import { auth, db } from "../firebase"
import { useEffect, useState } from "react"
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'

const Landing = () => {
  const [currentUser, setCurrentUser] = useState<any>(undefined)
  const [solvedProblems, setSolvedProblems] = useState<any[]>([])
  const [problems, setProblems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setSolvedProblems([])
    setProblems([])
    auth.onAuthStateChanged(user => {
      if(user) {
        setCurrentUser(user)
        db.collection("users").doc(currentUser.uid).get().then(doc => {
          if(doc.exists) {
            console.log(doc.data()?.solved)
            setSolvedProblems(doc.data()?.solved)
          }
        })
        
        db.collection('problems').get().then(docs => {
          docs.forEach(doc => {
            setProblems(arr => [...arr, new Problem(doc.data()?.title, parseInt(doc.id), doc.data()?.division, doc.data()?.year, doc.data()?.contest, doc.data()?.url)])
          })
        })
      } else {
        setCurrentUser(null)
      }

    })
    console.log(currentUser)
    setIsLoading(false)
  }, [currentUser])

  if(isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  } else if(currentUser) {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                USACO Tracker
              </Typography>
              <Button color="inherit" onClick={
                () => auth.signOut()
              }>Log Out</Button>
            </Toolbar>
          </AppBar>
        </Box>


        <Typography variant="h1">Hello, {currentUser.displayName}</Typography>

        <ProblemsListView
        checked = {solvedProblems}
        problems = {problems}/>
      </div>
    )
  } else {
    return (
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                USACO Tracker
              </Typography>
              <Button color="inherit" onClick={
                () => window.location.href = '/Login'
              }>Log In / Sign Up </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    )
  }
}

export default Landing