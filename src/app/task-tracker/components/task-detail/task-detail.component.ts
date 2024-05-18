import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import moment from 'moment';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {
  PRIORITY,
  Task,
  STASUS,
} from '../../../shared/interfaces/tasks.interface';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  constructor(private taskService: TaskService, private fb: FormBuilder) {}
  @Output() onClose = new EventEmitter<void>();
  @Input() id!: number;

  public taskData!: Task[];
  public diff!: number;
  public formGroup!: FormGroup;
  public priority = PRIORITY;
  public status = STASUS;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: this.taskData[0].id,
      title: this.taskData[0].title,
      name: this.taskData[0].name,
      deadline: this.taskData[0].deadline,
      priority: this.taskData[0].priority,
      status: this.taskData[0].status,
      worker: this.taskData[0].worker,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.taskData = this.taskService.getTask(this.id);
    this.calcDateDiff();
  }

  private calcDateDiff() {
    this.diff =
      moment(new Date(this.taskData[0].deadline)).diff(
        moment(new Date()),
        'day'
      ) + 1;
  }

  public closeSidenav() {
    this.onClose.emit();
  }

  public saveTaskChanges() {
    this.taskService.editTask(this.id, this.formGroup.value);
    this.closeSidenav();
  }
}
