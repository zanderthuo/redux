const redux = require('redux');
const produce = require('immer').produce;


const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const initialState = {
    name: 'zander',
    address: {
        country: 'Kenya',
        city: 'Nairobi'
    },
}

const COUNTRY_UPDATED = 'COUNTRY_UPDATED'
const countryUpdated = (country) => {
    return {
        type: COUNTRY_UPDATED,
        payload: country,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTRY_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         country: action.payload
            //     },
            // }
            return produce(state, (draft) => {
                draft.address.country = action.payload
            })
        default:
            return state
    }
}

const store = redux.createStore(reducer)
console.log('Initial State', store.getState())
const unsubscribe = store.subscribe(() => {
    console.log('Updated State', store.getState())
})
store.dispatch(countryUpdated('Jujamaica'))
unsubscribe()