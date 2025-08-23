import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  newUser: User = new User();
  birthDate!: Date;
  private firestore = inject(Firestore);
  isLoading = false;

  constructor() {}

  async saveNewUser() {
    this.newUser.birthDate = this.birthDate.getTime();
    this.isLoading = true;

    try {
      const userRef = collection(this.firestore, 'users');
      const docRef = await addDoc(userRef, { ...this.newUser });
      console.log('User gespeichert mit der ID: ', docRef.id);
      this.isLoading = false;
    } catch {
      console.error('Fehler beim Speichern: ', Error);
      this.isLoading = false;
    }
  }
}
