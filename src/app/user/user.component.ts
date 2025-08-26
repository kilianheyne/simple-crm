import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule, DialogAddUserComponent, MatCardModule, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  private firestore = inject(Firestore);
  newUser: User = new User();
  users$!: Observable<User[]>;


  ngOnInit():void {
    const userCollection = collection(this.firestore, 'users');
    this.users$ = collectionData(userCollection, { idField: 'id'}) as Observable<User[]>;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
