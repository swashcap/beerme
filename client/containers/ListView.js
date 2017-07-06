import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import BeerItem from '../components/BeerItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      beers: []
    }
  }

  componentWillMount () {
    fetch('http://localhost:3000/beers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`)
        }

        return response.json()
      })
      .then(newBeers => this.setState({
        beers: this.state.beers.concat(newBeers)
      }))
      .catch(error => console.error(error))
  }

  render () {
    const { beers } = this.state
    return (
      <View style={styles.container}>
        {beers.map(beer => (
          <BeerItem
            key={beer.id}
            onPress={() => undefined}
            {...beer} />
        ))}
      </View>
    )
  }
}
