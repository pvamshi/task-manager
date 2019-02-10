import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from './stores';
import { TaskListActionTypes, TaskListState } from './stores/task-list';
import Task from './Task';
import './TaskList.style.css';
interface StateProps {
  taskListState: TaskListState;
}
interface DispatchProps {
  init(): void;
}

export type Props = StateProps & DispatchProps;

export class TaskList extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.props.init();
  }
  public render(): JSX.Element {
    return (
      <ul>
        {this.props.taskListState.tasks.map((_, index) => (
          <li key={index}>
            <Task
              taskIndex={index}
              focus={this.props.taskListState.focusIndex === index}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export function mapStateToProps(state: RootState): StateProps {
  return {
    taskListState: state.taskListStore,
  };
}

export function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    init: () => dispatch({ type: TaskListActionTypes.INIT }),
  };
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskList);
