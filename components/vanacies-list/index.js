//@flow
import React from 'react'
import { List, ListItem, Text, Body } from 'native-base'
import { RefreshControl } from 'react-native'

type props = {
  loading: boolean,
  refresh: () => void,
  vacancies: Array<Vacancy>,
  getMore: () => void
}
type state = {}

export default class VacanciesList extends React.Component<props, state> {
  getMore: () => void
  constructor(props: props) {
    super(props)
    this.getMore = this.getMore.bind(this)
  }
  render() {
    const { loading, refresh, vacancies } = this.props

    return (
      <List
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        onEndReachedThreshold={0.01} //Чтобы колбэк на конец прокрутки вызывался в самом конце списка
        onEndReached={this.getMore}
        dataArray={vacancies}
        renderRow={(vacancy: Vacancy) => (
          <ListItem>
            <Body>
              <Text>{vacancy.header}</Text>
              <Text note>{vacancy.salary}</Text>
            </Body>
          </ListItem>
        )}
      />
    )
  }

  getMore() {
    //Проверяем, передали ли функцию подгрузки новых значений
    const loader = this.props.getMore
    if (loader) {
      loader()
    }
  }
}
