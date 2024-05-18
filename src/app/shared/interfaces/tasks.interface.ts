export interface Task {
  id: number;
  title: string;
  name: string;
  deadline: Date;
  priority: string;
  status: string;
  worker: string;
}

export enum PRIORITY {
  LOW = 'Низкий',
  MEDIUM = 'Средний',
  HIGH = 'Высокий',
  BLOCK = 'Блок',
}

export enum STASUS {
  ANALYZE = 'В анализе',
  START = 'В процессе',
  PAUSE = 'Пауза',
  DONE = 'Выполнено',
}
