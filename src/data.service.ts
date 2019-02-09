import { call, put } from '@redux-saga/core/effects';
import { INIT_SUCCESS } from './stores/task-list';

function* fetchTasks() {
  const response = yield call(fetch, 'http://localhost:3001/tasks');
  const tasks = yield response.json();
  yield put({ type: INIT_SUCCESS, payload: tasks });
}

export { fetchTasks };
