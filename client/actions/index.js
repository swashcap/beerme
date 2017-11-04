
export const BEERS_FAILURE = 'BEERS_FAILURE'
export const BEERS_REQUEST = 'BEERS_REQUEST'
export const BEERS_SUCCESS = 'BEERS_SUCCESS'

export const fetchBeers = (dispatch) => {
  dispatch({
    type: BEERS_REQUEST
  })
  
  return fetch('http://localhost:3000/beers')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      return response.json()
    })
    .then(beers => dispatch({
      beers,
      type: BEERS_SUCCESS
    }))
    .catch(error => dispatch({
      error,
      type: BEERS_FAILURE
    }))
}

