const InitialState ={bats:20}

const BatReducer = (state = InitialState , action) =>
{
    switch(action.type)
    {
        case 'BUY_BAT' : return {...state , bats:state.bats-1}
        default : return state
    }

}


export default BatReducer 




