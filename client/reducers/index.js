import { combineReducers } from 'redux';

import * as ActionTypes from '../actions'

const beers = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.BEERS_SUCCESS:
      return state.concat(action.beers)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  beers,
})

export default rootReducer
