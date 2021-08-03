// import React, { Component } from 'react'
// import BuyForm from './BuyForm'
// import SellForm from './SellForm'
// import HomePage from './HomePage'

// class Main extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       currentForm: 'home'
//     }
//   }

//   render() {
//     let content
//     if(this.state.currentForm === 'buy') {
//       content = <BuyForm
//         ethBalance={this.props.ethBalance}
//         tokenBalance={this.props.tokenBalance}
//         buyTokens={this.props.buyTokens}
//       />
//     } else if(this.state.currentForm === 'sell'){
//       content = <SellForm
//         ethBalance={this.props.ethBalance}
//         tokenBalance={this.props.tokenBalance}
//         sellTokens={this.props.sellTokens}
//       />
//     }else if (this.state.currentForm === 'home'){
//       content = <HomePage
//       />
//     }

//     return (
      
//       <div id="content" >

//         {/* <div className="d-flex justify-content-between mb-1">
//           <button
//               className="btn btn-light"
//               onClick={(event) => {
//                 this.setState({ currentForm: 'buy' })
//               }}
//             >
//             Buy
//           </button>

//           <button
//               className="btn btn-light"
//               onClick={(event) => {
//                 this.setState({ currentForm: 'home' })
//               }}
//             >
//             Home
//           </button>
          

//           <button
//               className="btn btn-light"
//               onClick={(event) => {
//                 this.setState({ currentForm: 'sell' })
//               }}
//             >
//             Sell
//           </button>
//         </div> */}

        

          

//             {content}

         

        

//       </div>
//     );
//   }
// }

// export default Main;