//@flow
import types from './actionTypes'

//Стор для списка вакансий
const intialState: VacanciesStore = {
  loading: false,
  error: null,
  vacancies: [],
  count: 0
}

export default (
  state: VacanciesStore = intialState,
  action: VacanciesAction
) => {
  switch (action.type) {
    case types.SEARCH_VACANCIES_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      }

    case types.SEARCH_VACANCIES_SUCCEEDED:
      return {
        ...state,
        loading: false,
        vacancies: action.vacancies,
        count: action.count
      }

    case types.SEARCH_VACANCIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case types.GET_MORE_VACANCIES_SUCCEEDED:
      return {
        ...state,
        vacancies: action.vacancies
      }

    case types.GET_MORE_VACANCIES_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state
  }
}
