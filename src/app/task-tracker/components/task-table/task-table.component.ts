import { TaskService } from '../../../shared/services/task.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Task } from '../../../shared/interfaces/tasks.interface';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    CommonModule,
    FormsModule,
    TaskDetailComponent,
    MatSidenavModule,
  ],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss',
  providers: [TaskService],
})
export class TaskTableComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'title',
    'name',
    'deadline',
    'priority',
    'status',
    'worker',
  ];
  public dataSource!: MatTableDataSource<Task>;
  public taskDetail: boolean = false;
  public taskID!: number;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sidenav') public sidenav!: MatSidenav;

  constructor(public taskService: TaskService) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.taskService.getAllTasks());
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openTaskDetail(id: number) {
    this.sidenav.open();
    this.taskID = id;
  }

  closeTaskDetail() {
    this.sidenav.close();
    this.dataSource = new MatTableDataSource(this.taskService.getAllTasks());
  }
}
