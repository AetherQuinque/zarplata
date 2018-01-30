import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'remote-redux-devtools'
import reducers from './reducers'

const reducer = combineReducers(reducers)
export const sagaMiddleware = createSagaMiddleware()

export function configureStore() {
  const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))
  const store = createStore(reducer, enhancer)
  return store
}
