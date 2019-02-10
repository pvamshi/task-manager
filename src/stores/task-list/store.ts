import { TaskModel } from 'src/models';
import DocumentActions, { TaskListActionTypes } from './action';

export interface TaskListState {
  tasks: TaskModel[];
  focusIndex: number;
}

export function taskListStore(
  state: TaskListState = { tasks: [], focusIndex: -1 },
  action: DocumentActions,
): TaskListState {
  const tasks = state.tasks;
  switch (action.type) {
    case TaskListActionTypes.INIT_SUCCESS:
      return { ...state, tasks: action.tasks };
    case TaskListActionTypes.UPDATE:
      console.log(JSON.stringify(action));
      tasks[action.taskIndex] = {
        ...tasks[action.taskIndex],
        ...action.modifiedTask,
      };
      return { ...state, tasks };
    case TaskListActionTypes.ADD:
      tasks.splice(action.addAfterTaskIndex + 1, 0, {
        id: '',
        text: action.task.text || '',
      });
      return { tasks, focusIndex: action.addAfterTaskIndex + 1 };
    default:
      return state;
  }
}
