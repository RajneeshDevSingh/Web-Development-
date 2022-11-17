
// const redux = require('redux');
import redux from 'redux'
import { legacy_createStore as createStore} from 'redux'
// const createStore = redux.createStore



const Buy_Cake = "Buy_Cake";
const Buy_Icecream = 'Buy_Icecream'


const InitState = { NumOfCake : 10 , NumOfIcecream : 20}

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




const reducer = (state = InitState , action) =>
{
    // console.log('val received is',state.NumOfCake,action)
    switch(action.type)
    {
        case Buy_Cake : return{
            ...state, NumOfCake : state.NumOfCake-1
        }

        case Buy_Icecream : return{ ...state , NumOfIcecream : state.NumOfIcecream-1}

        default : return state

    }
}



const store = createStore(reducer)

console.log("initialStte" , store.getState())

const unsubscribe = store.subscribe(()=> {console.log("Upload store" , store.getState())})


store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(BuyIcecream())
store.dispatch(BuyIcecream())
store.dispatch(BuyIcecream())
unsubscribe();


