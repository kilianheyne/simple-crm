import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { User } from '../../models/user.class';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [MatDialogModule, MatInputModule, MatProgressBarModule, FormsModule, MatButtonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  newUser!: User;
  isLoading = false;
  userId!: string;
  private userService = inject(UserService);
  private dialogRef = inject(MatDialogRef<DialogEditAddressComponent>);

  setUser(user: User) {
    this.newUser = new User(user);
  }

  saveAddress() { 
    if (!this.userId || !this.newUser) return;

    this.isLoading = true;
    const updateAddress = {
      street: this.newUser.street,
      houseNumber: this.newUser.houseNumber,
      zipCode: this.newUser.zipCode,
      city: this.newUser.city
    };

    this.userService.updateUser(this.userId, updateAddress)
      .then(() => {
        this.isLoading = false;
        this.dialogRef.close();
      })
      .catch(err => {
        console.error('Error updating address', err);
        this.isLoading = false;
      })
  }

}
