//@flow
import types from './actionTypes'

//Стор для фильтров
const intialState: FilterStore = {
  offset: 0,
  query: ''
}

export default (state: FilterStore = intialState, action: FilterAction) => {
  switch (action.type) {
    //Если мы ищем новую вакансию, то мы будем искать с первых позиций, сдвиг на не нужен
    case types.SET_QUERY:
      return {
        ...state,
        query: action.query,
        offset: 0
      }
    case types.SET_OFFSET:
      return {
        ...state,
        offset: action.offset
      }

    default:
      return state
  }
}
