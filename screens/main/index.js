import React from 'react'
import { Container, Header, Title, Body, Text } from 'native-base'
import { connect } from 'react-redux'

import {
  searchVacancies,
  update,
  getMoreVacancies
} from '../../data/vacancies/actions'

import SearchBar from '../../components/vacancy-search-bar/index'
import VacanciesCount from '../../components/vacancies-count/index'
import VacanciesList from '../../components/vanacies-list/index'
import Empty from '../../components/vacancies-search-empty/index'

type props = {
  update: () => void,
  searchVacancies: (text: string) => void,
  vacancies: VacanciesStore,
  getMoreVacancies: () => void
}
type state = {}
class MainScreen extends React.Component<props, state> {
  update: () => void
  getMoreVacancies: () => void
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.getMoreVacancies = this.getMoreVacancies.bind(this)
  }

  componentDidMount() {
    this.props.searchVacancies('')
  }
  render() {
    const { loading, vacancies, error } = this.props.vacancies
    const empty = this.isEmpty(loading, vacancies)
    return (
      <Container>
        <Header>
          <Body>
            <Title>Вакании</Title>
          </Body>
        </Header>
        <SearchBar />
        <VacanciesCount />
        {error && <Text>{error}</Text>}
        {empty ? (
          <Empty />
        ) : (
          <VacanciesList
            vacancies={vacancies}
            loading={loading}
            refresh={this.update}
            getMore={this.getMoreVacancies}
          />
        )}
      </Container>
    )
  }

  getMoreVacancies() {
    this.props.getMoreVacancies()
  }

  isEmpty(loading: boolean, vacancies: Array): boolean {
    return !loading && !vacancies.length
  }
  update() {
    this.props.update()
  }
}

const mapStoreToProps = (store: ReduxStore) => ({
  vacancies: store.vacancies
})
const mapDispatchToProps = dispatch => ({
  searchVacancies: text => dispatch(searchVacancies(text)),
  update: () => dispatch(update()),
  getMoreVacancies: () => dispatch(getMoreVacancies())
})

export default connect(mapStoreToProps, mapDispatchToProps)(MainScreen)
