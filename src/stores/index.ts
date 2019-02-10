import { all } from '@redux-saga/core/effects';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { TaskListState, taskListStore, tasksListSaga } from './task-list';

export interface RootState {
  taskListStore: TaskListState;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ taskListStore }),
  applyMiddleware(sagaMiddleware, logger),
);

function* rootSaga() {
  yield all([tasksListSaga()]);
}

sagaMiddleware.run(rootSaga);
export default store;
