const API_URL = 'https://api.zp.ru/v1/'

const VACANCIES = 'vacancies'

const getQueryString = params =>
  Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&')

const fetchApi = ({ endpoint = '', method = 'GET', data = {} }) => {
  let qs = ''
  let body = null
  if (method === 'GET') {
    qs = `?${getQueryString(data)}`
  } else {
    body = JSON.stringify(data)
  }

  return fetch(`${API_URL}${endpoint}/${qs}`, {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  }).then(result => result.json())
}

export const getVacancies = (params: { q: string, offset: number }) =>
  fetchApi({ endpoint: VACANCIES, data: params })
