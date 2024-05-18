import {
  PRIORITY,
  STASUS,
  Task,
} from './../../../shared/interfaces/tasks.interface';
import { Component } from '@angular/core';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../shared/services/task.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import 'moment/locale/ru';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-dialog-create-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    TaskService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class DialogCreateTaskComponent {
  public formGroup!: FormGroup;
  public priority = PRIORITY;
  public status = STASUS;
  public minDate!: Date;


  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required]],
      name: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]],
      worker: ['', [Validators.required]],
    });
    this.minDate = new Date();
  }

  private openSnackBar() {
    this._snackBar.open('Задача успешно добавлена', '', { duration: 1500 });
  }

  public goBack() {
    this.router.navigate(['tasks/list']);
  }

  public addTask(data: Task) {
    this.taskService.addTask(data);
    this.formGroup.reset();
    this.openSnackBar();
  }
}
