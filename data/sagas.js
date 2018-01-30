import { fork } from 'redux-saga/effects'

import vacanciesSaga from './vacancies/sagas'

const rootSaga = function* rootSaga() {
  yield [fork(vacanciesSaga)]
}
export default rootSaga
