
// const redux = require('redux');
import redux from 'redux'
import { legacy_createStore as createStore} from 'redux'


import { combineReducers } from 'redux'

// const createStore = redux.createStore



const Buy_Cake = "Buy_Cake";
const Buy_Icecream = 'Buy_Icecream'


const InitCakeState = { NumOfCake : 10 }
const InitIcecreamState = {NumOfIcecream : 20}


function BuyIcecream()
{
    return{
        type: Buy_Icecream
    }


}




function buyCake()
{
    return{
        type:Buy_Cake,
        info:'First redux action'
    }
}




const CakeReducer = (state = InitCakeState , action) =>
{
    // console.log('val received is',state.NumOfCake,action)
    switch(action.type)
    {
        case Buy_Cake : return{
            ...state, NumOfCake : state.NumOfCake-1
        }

        default : return state

    }
}

const IcecreamReducer = (state = InitIcecreamState , action) =>
{
    // console.log('val received is',state.NumOfCake,action)
    switch(action.type)
    {
        case Buy_Icecream : return{ ...state , NumOfIcecream : state.NumOfIcecream-1}

        default : return state

    }
}

const rootReducer = combineReducers({
    cake : CakeReducer,
    iceCream:IcecreamReducer
})


const store = createStore(rootReducer)

console.log("initialStte" , store.getState())

const unsubscribe = store.subscribe(()=> {console.log("Updated store" , store.getState())})


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(BuyIcecream())
store.dispatch(BuyIcecream())
store.dispatch(BuyIcecream())
unsubscribe();


