import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
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
}
