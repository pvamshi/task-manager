import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import { fetchTasks } from 'src/data.service';
import { Keys } from 'src/models';
import { HandleEnter, HandleKeyEvent, TaskListActionTypes } from './action';

function* getTasks() {
  const response = yield call(fetchTasks);
  const tasks = yield response.json();
  yield put({ type: TaskListActionTypes.INIT_SUCCESS, tasks });
}

// function* handleBackspace(action: HandleBackspace) {}
function* handleEnter(action: HandleEnter) {
  const text = action.event.text;
  yield put({
    modifiedTask: { text: text.slice(0, action.event.cursorRelativePosition) },
    taskIndex: action.taskIndex,
    type: TaskListActionTypes.UPDATE,
  });
  yield put({
    addAfterTaskIndex: action.taskIndex,
    task: { text: text.slice(action.event.cursorRelativePosition) },
    type: TaskListActionTypes.ADD,
  });
}
function* handleKeyEvent(action: HandleKeyEvent) {
  switch (action.event.key) {
    case Keys.Enter:
      yield put({ ...action, type: TaskListActionTypes.EVENT_ENTER });
      break;
    case Keys.Backspace:
      yield put({ ...action, type: TaskListActionTypes.EVENT_BACKSPACE });
      break;
    default:
      break;
  }
}
export function* tasksListSaga() {
  yield takeLatest(TaskListActionTypes.INIT, getTasks);
  yield takeEvery(TaskListActionTypes.HANDLE_KEY_EVENT, handleKeyEvent);
  yield takeEvery(TaskListActionTypes.EVENT_ENTER, handleEnter);
  // yield takeEvery(TaskListActionTypes.EVENT_BACKSPACE, handleBackspace);
}
