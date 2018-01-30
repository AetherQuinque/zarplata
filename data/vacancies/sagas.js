import { call, put, takeLatest, select } from 'redux-saga/effects'
import types from './actionTypes'
import filterTypes from '../filter/actionTypes'
import { getVacancies } from '../../services/api'

const fetchVacancies = (query, offset) =>
  getVacancies({
    q: query,
    offset: offset
  })

const getQuery = (store: ReduxStore) => store.filer.query
const getOffset = (store: ReduxStore) => store.filer.offset
const getPreviousVacancies = (store: ReduxStore) => store.vacancies.vacancies

const searchVacancies = function* searchVacancies(action) {
  try {
    const query = action.query
    const offset = 0 //Сдвига нет, ибо это новый поиск
    yield put({ type: filterTypes.SET_QUERY, query }) //Записываем текст поиска в стор для удобного использования
    const responce = yield call(fetchVacancies, query, offset)
    const count = responce.metadata.resultset.count
    const vacancies = responce.vacancies
    yield put({ type: types.SEARCH_VACANCIES_SUCCEEDED, vacancies, count })
  } catch (error) {
    yield put({ type: types.SEARCH_VACANCIES_FAILED, error })
  }
}

const getMoreVacancies = function* getMoreVacancies() {
  try {
    const query = yield select(getQuery) //Берем текст поиска из стора, ибо мы хотим получить больше результатов
    const previousOffset = yield select(getOffset)
    const offset = previousOffset + 25 //Добовляем сдвиг в 25 позиций
    yield put({ type: filterTypes.SET_OFFSET, offset }) //Записываем новый сдвиг в стор
    const vacancies = yield select(getPreviousVacancies) //Берем текущий массив вакансий из стора
    const responce = yield call(fetchVacancies, query, offset)
    const nextVacancies = responce.vacancies //Берем слудующий массив из ответа сервера
    nextVacancies.forEach(item => vacancies.push(item)) //Добовляем новые вакансии в массив текущих
    yield put({ type: types.GET_MORE_VACANCIES_SUCCEEDED, vacancies })
  } catch (error) {
    yield put({ type: types.GET_MORE_VACANCIES_FAILED, error })
  }
}

//Функция для обновления текущего запроса
const update = function* update() {
  try {
    const query = yield select(getQuery)
    const offset = 0 //Сдвиг сбрасываем
    const responce = yield call(fetchVacancies, query, offset)
    const count = responce.metadata.resultset.count
    const vacancies = responce.vacancies
    yield put({ type: types.SEARCH_VACANCIES_SUCCEEDED, vacancies, count })
  } catch (error) {
    yield put({ type: types.SEARCH_VACANCIES_FAILED, error })
  }
}

const vacanciesSaga = function* vacanciesSaga() {
  yield takeLatest(types.SEARCH_VACANCIES_REQUESTED, searchVacancies)
  yield takeLatest(types.GET_MORE_VACANCIES_REQUESTED, getMoreVacancies)
  yield takeLatest(types.UPDATE_REQUESTED, update)
}

export default vacanciesSaga
