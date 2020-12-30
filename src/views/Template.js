import React, { Component, Fragment } from "react";
import ChartWithZoom from "./overview/Chart with Zoom";
import Blog from "./overview/blog";
import Hcards from "./overview/hcards";
import Cards from "./overview/cards";
import Table from "./overview/table";
import Footer from "./overview/footer";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min";
// import "../bootstrap.css";
//  import FaIconPack from 'react-icons/lib/fa';
//  import bell from 'react-icons/lib/fa/bell-o';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from "react-redux";
import { logout, loaduser } from "../Redux/Actions/authActions";

import { Link, NavLink, BrowserRouter } from "react-router-dom";
import { noConflict } from "q";
import PropTypes from "prop-types";
import LoginModal from './LoginRegistration/loginModal/LoginModal'
import RegisterModal from './LoginRegistration/registerModal/RegisterModal'
import Tabs from './Tabs/Tabs'
import Header from './header'
// import ChartWithZoom from "./overview/Chart with Zoom";
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1001,
      mydata: [100, 120, 90, 154, 365, 125, 364, 254, 153, 249],
      valuetoshow: 0,
      i: 0,
      perc: 0,
      color: "#00ea36"
    };
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  componentDidMount() {
    // this.props.loaduser()

    this.myinterval();
  }
  myinterval = () => {
    setInterval(() => {
      fun();
    }, 3000);
    var fun = () => {
      let c_count = this.state.mydata[this.state.i];
      let o_count = this.state.mydata[this.state.i - 1];

      if (this.state.i >= 1) {
        this.setState({
          perc: (((c_count - o_count) / o_count) * 100).toFixed(2)
        });
      }
      this.setState({
        valuetoshow: c_count,
        i: this.state.i + 1
      });

      if (this.state.i === this.state.mydata.length) {
        this.setState({ i: 0 });
      }
      if (this.state.perc < 0) {
        this.setState({ color: "#CC0000" });
      } else {
        this.setState({ color: "#00ea36" });
      }
    };
  };
  openNav() {
    document.getElementById("mySidepanel").style.width = "300px";
  }

  closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    // let gvalue = this.state.value;
    // this.myinterval()
    // console.log(this.state.mydata[1])
    // 25/100*500+500=625
    // 625-500/500*100=?
    // console.log(this.state.perc);

    const authLinks = (
      <Fragment>
        <li className="nav-item dropdown pl-2 d-inline-block">
          <button
            className="btn btn-secondary dropdown-toggle"
            style={{ fontSize: "10px" }}
            data-toggle="dropdown"
          >
            {user ? user.username : ""}
          </button>
          <div
            className="dropdown-menu bg-dark text-white"
            style={{ fontSize: "12px" }}
          >
            <button className="btn btn-dark" onClick={this.props.logout}>
              Log Out
            </button>
          </div>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li className="pl-2 btn-group" role="group" aria-label="Basic example">
          {/* <Link to="/register"> */}
          <RegisterModal />
          {/* </Link> */}
          {/* <LoginModal /> */}

          {/* <Link to="/login"> */}
          <LoginModal />
          {/* </Link> */}

        </li>
      </Fragment>
    );

    return (
      <div
        className=""
        style={{
          boxSizing: "border-box",
          // background: "#fff",
          fontFamily: "montserrat"
        }}
      >
        <Header />

        <div className="container  pt-3 mt-5">
          <nav className="navbar navbar-expand-sm px-0">
            <div className="container p-0">
              <ul className="navbar-nav ml-auto d-inline-block">
                <li className="nav-item dropdown d-inline-block">
                  <button
                    className="btn btn-outline-dark text-white dropdown-toggle"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "#343A40",
                      fontFamily: " montserrat,sans-serif"
                    }}
                    data-toggle="dropdown"
                  >
                    ETH/AUD
                  </button>
                  <div
                    className="dropdown-menu bg-dark text-white"
                    style={{
                      fontSize: "12px",
                      fontFamily: " montserrat,sans-serif"
                    }}
                  >
                    <a className="dropdown-item">ETH/BTC</a>
                    <a className="dropdown-item">ETH/BTC</a>
                    <a className="dropdown-item">ETH/JPY</a>
                    <a className="dropdown-item">ETH/SEK</a>
                    <a className="dropdown-item">ETH/USD</a>
                    <a className="dropdown-item">ETH/CAD</a>
                    <a className="dropdown-item">ETH/EUR</a>
                    <a className="dropdown-item">ETH/GBP</a>
                  </div>
                </li>
                <li className="nav-item dropdown pl-2 d-inline-block">
                  <button
                    className="btn btn-outline-dark text-white dropdown-toggle"
                    style={{
                      fontSize: "12px",
                      backgroundColor: "#343A40",
                      fontFamily: " montserrat,sans-serif"
                    }}
                    data-toggle="dropdown"
                  >
                    Market Avg.
                  </button>
                  <div
                    className="dropdown-menu bg-dark text-white"
                    style={{
                      fontSize: "12px",
                      fontFamily: " montserrat,sans-serif"
                    }}
                  >
                    <a className="dropdown-item">Market Avg.</a>
                  </div>
                </li>
                <li className="d-inline-block name-user">
                  {isAuthenticated ? authLinks : guestLinks}
                </li>
              </ul>
            </div>
          </nav>

          {/* <div className="container"> */}
          <div className="row">
            <div className="mx-auto">
              <h1
                className=" p-0"
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  letterSpacing: -4,
                  fontFamily: " montserrat,sans-serif",
                  color: "white"
                }}
              >
                ${this.state.valuetoshow}
              </h1>
              <h3
                className=" p-0"
                style={{
                  textAlign: "center",
                  color: this.state.color,
                  fontWeight: "400",
                  fontSize: "40px",
                  fontFamily: "montserrat, sans-serif"
                }}
              >
                {this.state.perc}%
              </h3>
            </div>
          </div>
        </div>
        <div className="container pt-5">
          <div className="row">
            <div className="col-md-3 col-sm-6 col text-center">
              <h1
                className=" p-0"
                style={{ fontSize: "3.2rem", fontWeight: 700 }}
              >
                $256.13%
              </h1>
              <a
                className="textcolor p-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontFamily: " montserrat,sans-serif"
                }}
              >
                24 HOUR CHANGE
              </a>
            </div>
            <div className="col-md-3 col-sm-6 col text-center">
              <h1
                className=" p-0"
                style={{ fontSize: "3.2rem", fontWeight: 700 }}
              >
                $256.13%
              </h1>
              <a
                className="textcolor p-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontFamily: " montserrat,sans-serif"
                }}
              >
                24 HOUR HIGH
              </a>
            </div>
            <div className="col-md-3 col-sm-6 col text-center">
              <h1
                className=" p-0"
                style={{ fontSize: "3.2rem", fontWeight: 700 }}
              >
                $256.13%
              </h1>
              <a
                className="textcolor p-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontFamily: " montserrat,sans-serif"
                }}
              >
                24 HOUR LOW
              </a>
            </div>
            <div className="col-md-3 col-sm-6 col text-center">
              <h1
                className=" p-0 m-auto"
                style={{ fontSize: "3.2rem", fontWeight: 700 }}
              >
                $256.13%
              </h1>
              <a
                className="textcolor p-0"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  fontFamily: " montserrat,sans-serif"
                }}
              >
                MARKET CAP
              </a>
            </div>
          </div>
        </div>

        <div className="container pt-5 my-5">
          <ChartWithZoom id={this.state.value} />
        </div>
        <div className="container text-white">
          {
            isAuthenticated ? <Tabs /> : null
          }
          {/* < Tabs/> */}
        </div>
        {/* <div className="container">
          <p className="text-black text-center">
            Ethereum Price Chart - US Dollar (USD)
          </p>
          <br />
          <p
            className=" text-center"
            style={{
              fontSize: "8",
              fontWeight: "400",
              lineHeight: "0",
              color: "black"
            }}
          >
            The price of Ethereum (ETH/USD) today is $295.24 USD with a total
            market cap of $31,506,077,206.
          </p>
        </div> */}
        {/**Cards */}
        {/* <div className="my-5"> */}
        {/* <Cards /> */}
        {/* </div> */}
        {/**tables */}
        {/* <div className=" pb-5"> */}
        {/* <Table /> */}
        {/* </div> */}

        {/**Blog */}
        <div className="container">
          <Blog />
        </div>

        {/* <Hcards /> */}

        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-5 offset-sm-4 offset-md-4">
              <button className="w-100 btn btn-primary my-3">
                PREVIOUS UPDATES
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid" style={{ background: "grey" }}>
          <div className="py-5 text-center text-white">
            <h4 style={{ fontFamily: "monteserrat,sans-serif" }}>
              Subscribe to EthereumPrice.org
            </h4>
            <h6 style={{ fontFamily: "monteserrat,sans-serif" }}>
              Receive email updates when new content is published
            </h6>
            <form
              className="mx-auto py-4 border-0 text-white"
              style={{ maxWidth: "445px" }}
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="place"
                  className="form-control p-4 text-white border-0"
                  placeholder="Your Email"
                  style={{ background: "#23272B", color: "white" }}
                />
                <div className="input-group-append">
                  <button
                    className="input-grouptext btn btn-dark px-5 border-0"
                    style={{ backgrund: "", color: "white", fontWeight: "600" }}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/**Footer */}
        {/* <Footer /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, loaduser }
)(Template);
