import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter, Route } from 'react-router-native'

import ListView from './ListView'
import SingleView from './SingleView'

export default class Root extends Component {
  render () {
    return (
      <Provider store={this.props.store}>
        <NativeRouter>
          <View>
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
