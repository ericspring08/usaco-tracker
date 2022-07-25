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
  const [userName, setUserName] = useState("")

  useEffect(() => {
    setIsLoading(true)
    setSolvedProblems([])
    setProblems([])

    auth.onAuthStateChanged(user => {
      if(user) {
        db.collection("users").doc(user.uid).get().then(doc => {
          if(doc.exists) {
            setSolvedProblems(doc.data()?.solved)
            setUserName(doc.data()?.name)
          }
        }).then(() => {
          db.collection('problems').get().then(docs => {
          docs.forEach(doc => {
            setProblems(arr => [...arr, new Problem(doc.data()?.title, parseInt(doc.id), doc.data()?.division, doc.data()?.year, doc.data()?.contest, doc.data()?.url)])
            })
          })
          setCurrentUser(user)
        }).then(() => {
          setIsLoading(false)
        })
      } else {
        setCurrentUser(null)
        db.collection('problems').get().then(docs => {
          docs.forEach(doc => {
            setProblems(arr => [...arr, new Problem(doc.data()?.title, parseInt(doc.id), doc.data()?.division, doc.data()?.year, doc.data()?.contest, doc.data()?.url)])
            })
        }).then(() => {
          setIsLoading(false)
        })
      }

    })
  }, [])

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
                () => {
                  auth.signOut()
                  window.location.reload()
                }
              }>Log Out</Button>
            </Toolbar>
          </AppBar>
        </Box>


        <Typography variant="h1">Hello, {userName}</Typography>

        <ProblemsListView
        isLoggedIn={true}
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
        <ProblemsListView
        isLoggedIn = {false}
        checked = {[]}
        problems = {problems}/>
      </div>
      
    )
  }
}

export default Landing