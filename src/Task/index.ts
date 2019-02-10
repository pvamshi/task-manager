import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { TaskModel, UserActionEvent } from '../models';
import { RootState } from '../stores';
import { TaskListActionTypes } from '../stores/task-list';
import { Task } from './task.component';
// import { DispatchProps, OwnProps, StateProps, Task } from './component';

export interface OwnProps {
  taskIndex: number;
  focus: boolean;
}
export interface StateProps {
  task: TaskModel;
}
export interface DispatchProps {
  handleKeyEvent(taskIndex: number, event: UserActionEvent): void;
  save(taskIndex: number, text: string): void;
}

export type Props = OwnProps & StateProps & DispatchProps;
export function mapStateToProps(
  state: RootState,
  ownProps: OwnProps,
): StateProps {
  return { task: state.taskListStore.tasks[ownProps.taskIndex] };
}

export function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    handleKeyEvent: (taskIndex: number, event: UserActionEvent) =>
      dispatch({
        event,
        taskIndex,
        type: TaskListActionTypes.HANDLE_KEY_EVENT,
      }),
    save: (taskIndex: number, text: string) =>
      dispatch({
        modifiedTask: { text },
        taskIndex,
        type: TaskListActionTypes.UPDATE,
      }),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Task);
