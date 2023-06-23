import redux from 'redux';

const createStore = redux.createStore

/**
 * Action - an object with a type propert
 */
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'

/**
 * Action Creator - A function that returns an action
 */
const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1,
    }
}

const restockCake = (qty = 1) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty,
    }
}


/**
 * Reducer - A pure function that accepts state and action as arguments and returns
 *           next state of your application
 */

//(prevState, action) => newState

const initialState = {
    numOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

// 1.holding application state
const store = createStore(reducer)
    // 2.Allow access to state via getState()
console.log('Initial state', store.getState())

// 4.Register listener via subscribe
const unsubscribe = store.subscribe(() => console.log('Update state', store.getState()))

// 3.Allows state to be updated via dispatch(action)
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(10))

// unsubscribe from the store by calling the function returned by the subscribe method
unsubscribe()