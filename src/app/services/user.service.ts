import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private firestore = inject(Firestore);

  constructor() { }

  getUsers(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'users');
    return collectionData(userCollection, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(id: string): Observable<User | undefined> {
    const userDoc = doc(this.firestore, `users/${id}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User | undefined>;
  }

  updateUser(userId: string, userData: Partial<User>) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    const { id, ...dataWithoutId } = userData as any;
    return updateDoc(userDocRef, dataWithoutId);
  }
}
