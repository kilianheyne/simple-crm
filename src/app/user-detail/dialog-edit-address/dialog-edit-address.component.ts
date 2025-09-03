import { Component } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { User } from '../../models/user.class';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-edit-address',
  imports: [MatDialogModule, MatInputModule, MatProgressBarModule, FormsModule, MatButtonModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  newUser!: User;
  isLoading = false;

  setUser(user: User) {
    this.newUser = new User(user);
  }
}
