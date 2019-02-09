import { all, takeLatest } from '@redux-saga/core/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { fetchTasks } from 'src/data.service';
import { INIT, TaskListState, taskListStore } from './task-list';

export interface RootState {
  taskListStore: TaskListState;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ taskListStore }),
  applyMiddleware(sagaMiddleware, logger),
);

function* tasksListSaga() {
  yield takeLatest(INIT, fetchTasks);
}

function* rootSaga() {
  yield all([tasksListSaga()]);
}

sagaMiddleware.run(rootSaga);
export default store;
