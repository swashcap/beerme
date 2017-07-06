import React from 'react'
import { Route } from 'react-router'

import ListView from './containers/ListView'
import SingleView from './containers/SingleView'

export default (
  <Route path='/' component={ListView}>
    <Route path='/:id' component={SingleView} />
  </Route>
)
