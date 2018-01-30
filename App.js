import React from 'react'
import MainScreen from './screens/main/index'
import { Provider } from 'react-redux'
import { configureStore, sagaMiddleware } from './data/configureStore'
import rootSaga from './data/sagas'

const store = configureStore()
sagaMiddleware.run(rootSaga)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    )
  }
}
