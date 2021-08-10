// import React, { Component } from 'react'
// import Identicon from 'identicon.js';

// class Navbar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-dark fixed-top text-white bg-dark flex-md-nowrap p-0 shadow">
//         <a
//           className="navbar-brand col-sm-3 col-md-2 mr-0"
//         >
//           EthSwap
//         </a>

//         {/* <div id="content" className="mt-3">

//         <div className="d-flex justify-content-between mb-3">
//           <button
//               className="btn btn-light"
//               onClick={(event) => {
//                 this.setState({ currentForm: 'buy' })
//               }}
//             >
//             Buy
//           </button>
//           </div>
//           </div> */}

//         <ul className="navbar-nav px-3">
//           <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//             <big className="text-secondary">
//               <small id="account">{this.props.account}</small>
//             </big>

//             { this.props.account
//               ? <img
//                 className="ml-2"
//                 width='30'
//                 height='30'
//                 src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
//                 alt=""
//               />
//               : <span></span>
//             }

//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }

// export default Navbar;

import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import HomePage from './HomePage'
import PoolPage from './Pool'



class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'home'
    }
  }

  render() {

    let content
    if(this.state.currentForm === 'buy') {
      content = <BuyForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    } else if(this.state.currentForm === 'sell'){
      content = <SellForm
        ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        sellTokens={this.props.sellTokens}
      />
    }else if (this.state.currentForm === 'home'){
      content = <HomePage
      />
    }
    else if (this.state.currentForm === 'pool'){
      content = <PoolPage
      ethBalance={this.props.ethBalance}
        tokenBalance={this.props.tokenBalance}
        buyTokens={this.props.buyTokens}
      />
    }

    return (
      <div id="content" >
      <div class ="menu-bar mb-3">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <a class="navbar-brand text-white" >EthSwap</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fa fa-bars"></i>
            </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item ">
            <a class="nav-link" href="#" onClick={(event) => {this.setState({ currentForm: 'home' })}}
            >Home </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={(event) => {this.setState({ currentForm: 'buy' })}}
            >Buy</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={(event) => {this.setState({ currentForm: 'sell' })}}
            >Sell</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" onClick={(event) => {this.setState({ currentForm: 'pool' })}}
            >Pool</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    {content}
    </div>
    );
  }
}

export default Navbar;
