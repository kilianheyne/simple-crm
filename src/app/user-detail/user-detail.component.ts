import { Component, inject, DestroyRef } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  imports: [MatCard, MatCardModule, AsyncPipe],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId!: string;
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  user$!: Observable<User | undefined>;
  private userService = inject(UserService)

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.userId = params.get('id')!;
        this.user$ = this.userService.getUserById(this.userId);
      });
  }



}
