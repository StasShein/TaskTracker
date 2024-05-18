import {
  PRIORITY,
  STASUS,
  Task,
} from './../../../shared/interfaces/tasks.interface';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss',
})
export class TaskInfoComponent {
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  public formGroup!: FormGroup;
  public taskData!: Task[];
  private id!: number;
  public priority = PRIORITY;
  public status = STASUS;
  public diff!: number;

  ngOnInit(): void {
    this.id = +this.route.snapshot.params["id"];
    console.log(this.route.snapshot.params)
    this.taskData = this.taskService.getTask(this.id);
    this.formGroup = this.fb.group({
      id: this.taskData[0].id,
      title: this.taskData[0].title,
      name: this.taskData[0].name,
      deadline: this.taskData[0].deadline,
      priority: this.taskData[0].priority,
      status: this.taskData[0].status,
      worker: this.taskData[0].worker,
    });

    this.calcDateDiff();
  }

  private openSnackBar() {
    this._snackBar.open('Задача успешно Изменена', '', { duration: 1500 });
  }

  calcDateDiff() {
    this.diff =
      moment(new Date(this.taskData[0].deadline)).diff(
        moment(new Date()),
        'day'
      ) + 1;
  }

  saveTaskChanges() {
    this.taskService.editTask(this.id, this.formGroup.value);
    this.openSnackBar();
  }
}
