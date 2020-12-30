import axios from "axios";
// import {getTradeData} from "../../views/Tabs/Transactions/Transaction"
import { getTradeData } from '../../views/Tabs/transactions/Transaction'
import { useReducer } from "react";
// import {changeBalance} from '../../views/Tabs/Trade/Trade'
// import { getUserData } from '../../views/Tabs/Users/usersTab/usersTab'
// import { loaduser } from './authActions'
import { getUser } from '../../views/Tabs/Trade/Trade'


export const tradeing = (body) => dispatch => {

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // const body = { eth_price, c_balance, checkAmount,Trad_date,eth_quantity,userID }
    console.log(body);

    axios.post('/trade', body, config)
        .then(res => {
            getTradeData()
            //  console.log('checkkk,',res.data.trade)
            return res
        }).then(res => {
            return dispatch({

                type: "YOU_BUY_ETHEREUM",
                payload: res.data.trade
            })
        }).then(() => {
            let good = 'good'
            getUser(good)

        }).catch(err => {
            console.log(err)
            let errr = "err"
            getUser(errr)
        })
    //  console.log(this.state.c_balance)
}


