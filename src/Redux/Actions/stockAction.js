import axios from "axios";
import { getCapital } from '../../views/Tabs/Market/Status/Status'
import { getHistoryData } from '../../views/Tabs/Market/History/History'
//import {getTradeData} from "../../views/Tabs/Transactions/Transaction"  
import { gettUser } from '../../views/Tabs/Market/Issue/Issue'
export const stockSend = ({ price, quantity, capital, role }) => dispatch => {

    console.log("stock data with user role =", role)
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ price, quantity, capital, role })

    axios.post('/stockissue', body, config)
        .then(res => dispatch({

            type: "CAPITAL_DATA",
            payload: res.data.capital

        }
        )
        ).then(res => {
            getCapital()
            getHistoryData()
            let good = 'good'
            gettUser(good)
        })

        .catch(err => {
            let errr = "err"
            gettUser(errr)
            console.log(err)
        })
}

export const sendProfit = (role, profit) => {
    return dispatch => {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let body = { role, profit }
        console.log(body);

        axios.post('/addProfit', body, config)
            .then(res => dispatch({

                type: "PROFIT_ADDED",
                payload: res.data.capital

            }
            )).then(res => {

                getCapital()
                getHistoryData()
                let good = 'good'
                gettUser(good)

            })
            .catch(err => {
                let errr = "err"
                gettUser(errr)
                console.log(err)
            })

    }

}

export const updateUserBalance = (state, id) => {
    return dispatch => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        let { balance } = state
        console.log(balance, id);
        let body = { balance, id }
        axios.post('/addbalance', body, config)
            .then(res => dispatch({

                type: "BALANCE_ADDED",
                payload: res.data.capital

            }
            )).then(res => {
                getCapital()
                getHistoryData()
            })
            .catch(err => console.log(err))

    }
}


