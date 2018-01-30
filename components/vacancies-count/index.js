//@flow
import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import styles from './styles'

type props = {
  count: number
}
type state = {}

class VacanciesCount extends React.Component<props, state> {
  render() {
    const { count } = this.props

    if (count) {
      return (
        <View style={styles.container}>
          <Text>Всего найдено вакансий: {count}</Text>
        </View>
      )
    }

    return null
  }
}
const mapStoreToProps = (store: ReduxStore) => ({
  count: store.vacancies.count
})
export default connect(mapStoreToProps)(VacanciesCount)
