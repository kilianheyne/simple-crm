import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { MatCard, MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-detail',
  imports: [MatCard, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId!: string;
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.userId = params.get('id')!;
        console.log('User-ID aus URL:', this.userId);
      })
  }

}
