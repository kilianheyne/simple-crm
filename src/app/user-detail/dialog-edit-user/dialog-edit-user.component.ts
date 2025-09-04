import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

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
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<DialogEditUserComponent>);
  userId!: string;

  setUser(user: User) {
    this.newUser = new User(user);
    if (user.birthDate) {
      this.birthDate = new Date(user.birthDate);
    }
  }

  saveUser() {
    this.isLoading = true;
    this.newUser.birthDate = this.birthDate?.getTime();

    this.userService.updateUser(this.userId, this.newUser)
      .then(() => {
        this.isLoading = false;
        this.dialogRef.close();
      })
      .catch(err => {
        console.error('Error updating user', err);
        this.isLoading = false;
      })
  }
}
