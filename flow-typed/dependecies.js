declare type ReduxStore = {
  filer: FilterStore,
  vacancies: VacanciesStore
}

declare type FilterStore = {
  offset: number,
  query: string
}

declare type FilterAction = {
  type: string,
  offset?: number,
  query?: string
}

//Я бы убил пол дня для описания всех параметров.
//поэтому я ограничился только теми что буду использовать для задания
declare type Vacancy = {
  id: number,
  add_date: string,
  header: string,
  salary: string
}
declare type VacanciesStore = {
  loading: boolean,
  error: string | null,
  vacancies: Array<Vacancy>,
  count: number
}

declare type VacanciesAction = {
  type: string,
  vacancies?: Array<?Vacancy>,
  count?: number,
  error?: string
}
