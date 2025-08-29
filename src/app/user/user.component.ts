import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../services/user.service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    AsyncPipe,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  newUser: User = new User();
  users$!: Observable<User[]>;


  ngOnInit(): void {
    this.users$ = this.userService.getUsers();

    //nur zum Debuggen
    this.users$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(users => {
        console.log('Alle User mit der ID', JSON.stringify(users, null, 2));
      })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
