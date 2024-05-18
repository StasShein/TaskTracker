import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-deadline-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatInputModule, MatButtonModule],
  templateUrl: './deadline-dialog.component.html',
  styleUrl: './deadline-dialog.component.scss',
})
export class DeadlineDialogComponent {}
