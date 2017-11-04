import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchBeers } from '../actions'
import BeerItem from '../components/BeerItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class ListView extends Component {
  componentWillMount () {
    this.props.dispatch(fetchBeers())
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.beers.map(beer => (
          <BeerItem
            key={beer.id}
            onPress={() => undefined}
            {...beer} />
        ))}
      </View>
    )
  }
}

ListView.propTypes = {
  beers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(({ beers }) => ({ beers }))(ListView)

