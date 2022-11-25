import React from 'react'
import { connect } from 'react-redux'


function bat(props) {
  return (
    <div>
        <h1>
            Bats : {props.batss}
            <button onClick={props.buyBat}>Buy Bat</button>
        </h1>
    </div>
  )
}

const mapStateToProps = (state)=>
{
    return{
        batss:state.bats
    }
}


const mapDispatchToProps = (dispatch) =>
{
    return {
        buyBat : ()=>dispatch({type:'BUY_BAT'})
    }
}
export default connect(mapStateToProps ,mapDispatchToProps)(bat)

