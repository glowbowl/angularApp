import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(public db: AngularFirestore,) { }

    deleteUser(userKey) {
        return this.db.collection('users').doc(userKey).delete();
    }
    
    searchUsers(searchValue) {
        return this.db.collection('users', ref => ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'))
            .snapshotChanges()
    }

    searchUsersByAge(value) {
        return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
    }


    createUser(value) {
        return this.db.collection('users').add({
            firstName: value.firstName,
            lastName: value.lastName,
            nickname: value.nickname,
            phone: value.phone,
            addressType: value.nickname,
            address: value.address,
            country: value.country,
            postalCode: value.postalCode,
        });
    }
}
