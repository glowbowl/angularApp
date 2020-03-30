import { Injectable, NgZone } from '@angular/core';
import { UserSignIn, UserSignUp } from "../../models/models";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any;
    private basePath: string = '/users';

    items: UserSignUp[] = null; //  list of objects
    item = null;

    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    getUser(key: string) {
        const itemPath = `${this.basePath}`;
        this.item = this.afs.collection(itemPath).doc(`${key}`).valueChanges();
        return this.item
    }

    deleteUser(key: string){
        const userPath = `${this.basePath}`;
        return this.afs.collection(userPath).doc(`${key}`).delete();
    }

    getAll(){
        return this.afs.collection("users").get();
    }

    async SignIn(email, password) {
        try {
            const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
            this.SetUserDataSignIn(result.user);
            this.router.navigate(['']);
        }
        catch (error) {
            window.alert(error.message);
        }
    }

    async SignUp(email, password, value) {
        try {
            const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
            this.router.navigate(['']);
            this.SetUserDataSignUp(result.user, value);
        }
        catch (error) {
            window.alert(error.message);
        }
    }

    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null) ? true : false;
    }

    SetUserDataSignIn(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: UserSignIn = {
            uid: user.uid,
            email: user.email,
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    SetUserDataSignUp(user, value) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: UserSignUp = {
            uid: user.uid,
            email: user.email,

            firstName: value.firstName,
            lastName: value.lastName,
            nickname: value.nickname,
            phone: value.phone,
            addressType: value.nickname,
            address: value.address,
            country: value.country,
            postalCode: value.postalCode,
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    getUserData() {
        return this.afs.collection(`users`).snapshotChanges();
    }

    updateUser(user, value) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData  = {
            firstName: value.firstName,
            lastName: value.lastName,
            nickname: value.nickname,
            phone: value.phone,
            addressType: value.nickname,
            address: value.address,
            country: value.country,
            postalCode: value.postalCode,
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    async SignOut() {
        try{
            //window.location.reload();
            await this.afAuth.auth.signOut();
            localStorage.removeItem('user');
        }
        catch(error){
            window.alert(error.message);
        }
    }
    
}