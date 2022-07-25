import {auth} from '../firebase'
import {db} from '../firebase'

export const signInWithEmail = (email: string, password: string) => {

    auth.signInWithEmailAndPassword('ericspring08@gmail.com', 'password').then(user => {
        if(user) {
            window.location.href = '/'
        }
    })
    
}

export const signUpWithEmail = (email: string, password: string, name:string) => {
    auth.createUserWithEmailAndPassword(email, password).then(user => {
        if(user.user) {
            db.collection('users').doc(user.user.uid).set({
                solved: [],
            })
        }
        auth.currentUser?.updateProfile({
            displayName: name
        })
        window.location.href = '/'
    }
    ).catch(error => {
        console.log(error)
    })
}