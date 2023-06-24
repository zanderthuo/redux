import redux from 'redux';
import reduxLogger from 'redux-logger'

const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers

const applyMiddleware = redux.applyMiddleware

const logger = reduxLogger.createLogger()

/**
 * Action - an object with a type propert
 */
const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCKED = 'CAKE_RESTOCKED'
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED'
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED'

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

const orderIceCream = () => {
    return {
        type: ICE_CREAM_ORDERED,
        payload: 1,
    }
}

const restockIceCream = (qty = 1) => {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty,
    }
}


/**
 * Reducer - A pure function that accepts state and action as arguments and returns
 *           next state of your application
 */

//(prevState, action) => newState

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
// }

const initialCakeState = {
    numOfCakes: 10,
}

const initialIceCreamState = {
    numOfIceCream: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
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


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }
        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

// 1.holding application state
const store = createStore(rootReducer, applyMiddleware(logger))
    // 2.Allow access to state via getState()
console.log('Initial state', store.getState())

// 4.Register listener via subscribe
const unsubscribe = store.subscribe(() => {})

// 3.Allows state to be updated via dispatch(action)
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(10))

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(4)
actions.orderIceCream()
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(4)


// unsubscribe from the store by calling the function returned by the subscribe method
unsubscribe()