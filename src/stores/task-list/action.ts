import { TaskModel, UserActionEvent } from 'src/models';

export enum TaskListActionTypes {
  INIT = 'Initialize Tasks',
  INIT_SUCCESS = 'Initialize tasks Success',
  HANDLE_KEY_EVENT = 'Handle user key event',
  UPDATE = 'Update task',
  EVENT_ENTER = 'Handle ENTER',
  EVENT_BACKSPACE = 'Handle Backspace',
  ADD = 'Add Task',
}
export interface InitTasks {
  type: TaskListActionTypes.INIT;
}
export interface InitTasksSuccess {
  type: TaskListActionTypes.INIT_SUCCESS;
  tasks: TaskModel[];
}

export interface HandleKeyEvent {
  type: TaskListActionTypes.HANDLE_KEY_EVENT;
  event: UserActionEvent;
  taskIndex: number;
}

export interface HandleEnter {
  type: TaskListActionTypes.EVENT_ENTER;
  event: UserActionEvent;
  taskIndex: number;
}

export interface HandleBackspace {
  type: TaskListActionTypes.EVENT_ENTER;
  event: UserActionEvent;
  taskIndex: number;
}

export interface UpdateTask {
  type: TaskListActionTypes.UPDATE;
  taskIndex: number;
  modifiedTask: Partial<TaskModel>;
}
export interface AddTask {
  type: TaskListActionTypes.ADD;
  addAfterTaskIndex: number;
  task: Partial<TaskModel>;
}

type DocumentActions = InitTasksSuccess | UpdateTask | AddTask;
export default DocumentActions;
