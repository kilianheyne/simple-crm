import { Component, inject, DestroyRef } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail',
  imports: [MatCard, MatCardModule, AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId!: string;
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  user$!: Observable<User | undefined>;
  private userService = inject(UserService)
  readonly dialog = inject(MatDialog);
  currentUser!: User;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.userId = params.get('id')!;
        this.user$ = this.userService.getUserById(this.userId);
        this.user$
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(user => {
            if (user) {
              this.currentUser = user;
            }
          });
      });
  }

  openAddressEdit():void {
    if (!this.currentUser) return;
    const addressDialogRef = this.dialog.open(DialogEditAddressComponent);
    addressDialogRef.componentInstance.newUser = this.currentUser;
    addressDialogRef.componentInstance.userId = this.userId;
  }

  openUserEdit(): void {
    if (!this.currentUser) return;
    const userDialogRef = this.dialog.open(DialogEditUserComponent);
    userDialogRef.componentInstance.setUser(this.currentUser);
    userDialogRef.componentInstance.userId = this.userId;
  }

}
