//@flow
import React from 'react'
import { TextInput } from 'react-native'
import { connect } from 'react-redux'
import { searchVacancies } from '../../data/vacancies/actions'

import styles from './styles'

type props = {
  searchVacancies: (text: string) => void
}
type state = {
  text: string
}

class SearchBar extends React.Component<props, state> {
  searchVacancies: () => void
  constructor(props) {
    super(props)
    this.state = {
      text: ''
    }
    this.searchVacancies = this.searchVacancies.bind(this)
  }
  render() {
    return (
      <TextInput
        value={this.state.text}
        placeholder="Поиск вакансий"
        onChangeText={text => this.changeText(text)}
        onSubmitEditing={this.searchVacancies}
        style={styles.container}
        returnKeyType={'search'}
      />
    )
  }

  changeText(text: string) {
    this.setState({ text: text })
  }
  searchVacancies() {
    this.props.searchVacancies(this.state.text)
  }
}

const mapDispatchToProps = dispatch => ({
  searchVacancies: text => dispatch(searchVacancies(text))
})

export default connect(null, mapDispatchToProps)(SearchBar)
