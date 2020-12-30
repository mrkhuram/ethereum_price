import React, { Component } from 'react'
import { connect } from "react-redux";
import { updateUserBalance } from '../../../../Redux/Actions/stockAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getUserData} from '../usersTab/usersTab'
import {loaduser} from '../../../../Redux/Actions/authActions'
import {getUser} from '../../Trade/Trade'

class AddBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '',
            alertResult: false,
            id: null
        }


    }
    componentDidMount() {
        this.refs.subIssue.disabled = true
        this.setState({
            role: this.props.role,
        })
    }

    changehandler = (e) => {
        let name = e.target.name
        let val = e.target.value
        if (val !== '') {
            this.refs.subIssue.disabled = false
            this.setState({ [name]: val })

        }

    }

    submitHandler = () => {
        console.log("state = ", this.props.state._id)
        let id = this.props.state._id
        this.props.updateUserBalance(this.state, id)

        this.refs.issue_price.value = ""
        setTimeout(() => {
            this.refs.subIssue.disabled = true
            getUser()
        });
        getUserData()
        this.props.loaduser()
    }
    notify = () => toast.success("Successfuly Added", { autoClose: 2000 });
    render() {

        console.log(this.props.state.username)
        return (

            <div>
                <div>
                <ToastContainer />
                    <div class="card text-center align-items-center " >
                        <div style={{
                            cursor: 'pointer',
                            height: 50
                        }}
                            title="Return"
                            onClick={this.props.changeTab}>

                            <img src="https://image.flaticon.com/icons/png/512/61/61751.png"

                                className="src"
                                style={{
                                    height: 30,
                                    position: "absolute",
                                    left: '15px',
                                    top: '10px',
                                }}
                            />
                            <div style={{
                                height: 30,
                                position: "absolute",
                                left: '100px',
                                top: '18px',
                            }}
                            >Username: {this.props.state.username}</div>
                        </div>
                        <div class="card-body col-md-6 " style={{ backgroundColor: 'black !important' }}>
                            <div class="input-group mb-3" >
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Price</span>
                                </div>
                                <input type="text"
                                    id="Price"
                                    name="balance"
                                    onChange={this.changehandler}
                                    className="form-control p-4 text-white border-0"
                                    aria-label="Sizing example input"
                                    ref="issue_price"
                                    style={{ background: "#23272B", color: "white" }}
                                    aria-describedby="inputGroup-sizing-default" />
                            </div>
                            {/* <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroup-sizing-default">Qty</span>
                                </div>
                                <input type="text"
                                    id="Quantity"
                                    ref="quantity"
                                    name="quantity"
                                    onChange={this.changehandler}
                                    className="form-control p-4 text-white border-0"
                                    aria-label="Sizing example input"
                                    style={{ background: "#23272B", color: "white" }}
                                    aria-describedby="inputGroup-sizing-default" />
                            </div> */}
                            {/* <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Total Capital</span>
                        </div>
                        <input  type="text" 
                        disabled
                        value={this.state.capital}
                            id="totalCapital"
                            ref="T_capital"
                            name="t_capital"
                            //onChange={this.changehandler}
                            className="form-control p-4 text-white border-0"
                            aria-label="Sizing example input" 
                            style={{ background: "#23272B", color: "white" }}
                            aria-describedby="inputGroup-sizing-default"/>
                    </div> */}
                            <p className="text-success">
                                {
                                    this.state.alertResult ? this.state.capital + " Are added to the Total of Capital" : null
                                }
                            </p>
                        </div>
                        <div class="card-footer text-muted">
                            <button type="submit"
                                onClick={()=>{
                                    this.submitHandler()
                                    this.notify()
                                }}
                                ref="subIssue"
                                className="input-grouptext btn btn-dark px-5 border-0"
                                style={{ backgrund: "", color: "white", fontWeight: "600", textAlign: 'right' }}
                            >
                                Deposit
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStatetoprops = state => ({
    //Userrole : state.auth.user.role
    //email : state.auth.user.email
    role: state.auth.user.role,
    msg: state.stockIssue

})
export default connect(mapStatetoprops, { updateUserBalance,loaduser })(AddBalance)
