import { TaskModel } from 'src/models';

// tslint:disable: max-classes-per-file

interface TaskListStoreActions {
  readonly type: TaskListActions;
  transformState(state: TaskListState): TaskListState;
}

export interface TaskListState {
  tasks: TaskModel[];
}

/** TaskListStore Actions */

export const INIT = 'Initialize Tasks';
export const INIT_SUCCESS = 'Initialize tasks Success';

export enum TaskListActions {
  UPDATE = 'Update task',
  ADD = 'Add Task',
}
export class InitTasks {
  public readonly type = INIT;
  // public transformState(state: TaskListState): TaskListState {
  //   return state;
  // }
}
// export class InitTasksSuccess implements TaskListStoreActions {
//   public readonly type = TaskListActions.INIT_SUCCESS;
//   constructor(public tasks: TaskModel[]) {}
//   public transformState(state: TaskListState): TaskListState {
//     return {
//       tasks: this.tasks,
//     };
//   }
// }
export class UpdateTask implements TaskListStoreActions {
  public readonly type = TaskListActions.UPDATE;
  constructor(public index: number, public updatedText: string) {}
  public transformState(state: TaskListState): TaskListState {
    const t = state.tasks;
    t[this.index].text = this.updatedText;
    return { tasks: t };
  }
}
export class AddTask implements TaskListStoreActions {
  public readonly type = TaskListActions.ADD;
  constructor(public insertAfter: number, public text: string) {}
  public transformState(state: TaskListState): TaskListState {
    const insertAfter = this.insertAfter;
    const task = { id: '', text: this.text };
    return { tasks: state.tasks.splice(insertAfter, 0, task) };
  }
}

export function taskListStore(
  state: TaskListState = { tasks: [] },
  action: any,
): TaskListState {
  // if (action.type in TaskListActions) {
  //   return action.transformState(state);
  // }
  if (action.type === INIT_SUCCESS) {
    console.log('adding data ', action);
    return { tasks: action.payload };
  }
  return state;
}
