import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter, Route } from 'react-router-native'

import ListView from './ListView'
import SingleView from './SingleView'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <NativeRouter>
          <View style={styles.container}>
            <Route path='/' component={ListView} />
            <Route path='/beers' component={SingleView} />
          </View>
        </NativeRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
