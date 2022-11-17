import {legacy_createStore as createStore} from 'redux'

const Buy_Cake = 'Buy_Cake';

const InitialState = {NoOfCake : 20};
function buyCake()
{
    return{
        type:'Buy_Cake'
    }
}

const Reducer = (state = InitialState , action)=>
{
    switch(action.type)
    {
        case Buy_Cake : return{...state , NoOfCake : state.NoOfCake - 1}
        default : return state

    }
}



const store = createStore(Reducer)
console.log("Initial Store ", store.getState())

const unsubscribe = store.subscribe(()=> console.log("Updated State " , store.getState()))


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe();