import types from './actionTypes'

//Изменяем значение сдвига
export const setOffset = offset => ({
  type: types.SET_OFFSET,
  offset
})

export const setQuery = query => ({
  type: types.SET_QUERY,
  query
})

//Ниже могут идти остальные экшены по применению фильтров
