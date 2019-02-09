// // export interface TaskListProps {
// //   taskListState: TaskListState;
// //   init(): void;
// // }

// export type TaskListProps = StateFromProps & DispatchFromProps;

// class TaskListContainer extends React.Component<TaskListProps, any> {
//   constructor(private props: TaskListProps) {
//     super(props);
//     this.props.init();
//   }

//   public render() {
//     return <p>test</p>;
//   }
// }

// interface StateFromProps {
//   taskListState: TaskListState;
// }

// interface DispatchFromProps {
//   init: () => void;
// }

// const mapStateToProps = (state: RootState) => ({
//   taskListState: state.taskListStore,
// });

// // const getTasks: ActionCreator<
// //   ThunkAction<Promise<InitTasks>, void, void, InitTasks>
// // > = () => {
// //   return async (dispatch: Dispatch): Promise<InitTasks> => {
// //       const tasks = await fetchTasks();
// //       return dispatch(new InitTasks(tasks));
// //   };
// // };
// // const getTasks: ActionCreator<
// //   ThunkAction<Promise<InitTasks>, void, void, InitTasks>
// // > = () => (dispatch: Dispatch): Promise<InitTasks> =>
// //   fetchTasks().then((tasks: TaskModel[]) => dispatch(new InitTasks(tasks)));
// // const mapDispatchToProps = (
// //   dispatch: ThunkDispatch<void, void, InitTasks>,
// // ): DispatchFromProps => ({
// //   init: () => dispatch(getTasks()),
// // });

// const TaskList = connect<StateFromProps, DispatchFromProps, {}>(
//   mapStateToProps,
//   // mapDispatchToProps,
// )(TaskListContainer);

// export default TaskList;
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from './stores';
import { INIT, TaskListState } from './stores/task-list';

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
      <div>
        {this.props.taskListState.tasks.map((task, index) => (
          <p key={index}>{task.text}</p>
        ))}
      </div>
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
    init: () => dispatch({ type: INIT }),
  };
}

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(TaskList);
