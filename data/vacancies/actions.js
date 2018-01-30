import types from './actionTypes'

//Экшен для поиска вакансий по названию
export const searchVacancies = query => ({
  type: types.SEARCH_VACANCIES_REQUESTED,
  query
})

export const getMoreVacancies = () => ({
  type: types.GET_MORE_VACANCIES_REQUESTED
})

export const update = () => ({
  type: types.UPDATE_REQUESTED
})
