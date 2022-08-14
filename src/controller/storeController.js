import { createStore } from 'redux'
import initialState from '../model/store'

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const storeController = createStore(changeState)

export default storeController