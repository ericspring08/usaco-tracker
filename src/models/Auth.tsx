import {auth} from '../firebase'
import {db} from '../firebase'

export const signInWithEmail = (email: string, password: string) => {

    auth.signInWithEmailAndPassword(email, password).then(user => {
        if(user) {
            window.location.href = '/'
        }
    })
    
}

export const signUpWithEmail = (email: string, password: string, name:string) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            db.collection('users').doc(auth.currentUser?.uid).set({
                email: email,
                name: name,
                solved: []
            }).then(() => {
                window.location.href = '/'
            })
        })
}