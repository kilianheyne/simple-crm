import { Component } from '@angular/core';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-user',
  imports: [MatProgressBarModule, MatDialogModule, MatInputModule, MatDatepickerModule, MatButtonModule, FormsModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {

  isLoading = false;
  newUser!: User;
  birthDate!: Date;

  setUser(user: User) {
    this.newUser = new User(user);
    if (user.birthDate) {
      this.birthDate = new Date(user.birthDate);
    }
  }

  saveUser() {
    this.newUser.birthDate = this.birthDate?.getTime();
  }
}
