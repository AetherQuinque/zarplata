//@flow
import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

type props = {}
type state = {}

export default class VacanciesSearchEmpty extends React.Component<
  props,
  state
> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Вакансии по запросу не найдены</Text>
      </View>
    )
  }
}
