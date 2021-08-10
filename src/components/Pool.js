import React, { Component } from 'react'
import tokenLogo from '../token-logo.png'
import ethLogo from '../eth-logo.png'
import arrowlogo from '../arrow-down.png'

class Pool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-1 " onSubmit={(event) => {
          event.preventDefault()
          let etherAmount
          etherAmount = this.input.value.toString()
          etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
          this.props.buyTokens(etherAmount)
        }}>
         

        
        <div className="card mb-7 menu-rounded  card-bg card_center" style={{ maxWidth: '700px' }}>
        {/* <div class="text-white   card-header menu-text ">BuySell
        </div> */}
        
        </div>

        <div className="card img-rounded   card-bg card_center" style={{ maxWidth: '550px' }}>
        <div class="text-white font-weight-bold card-header card-text ">Liquidity
        {/* <div className="text-white float-right card-text-ex ">Exchange Rate 
        <div class=" spacer" > </div>
            <span className="text-white float-right card-text-ex">1 ETH = 100 DApp </span>
        </div> */}
        </div>
        
       
        
        <div className='text-control-from'>
        <label className="text-white  spacer_input"><b>Input</b></label>
          <span className="text-white  ">
            Balance: {window.web3.utils.fromWei(this.props.ethBalance, 'Ether')}
          </span>
        </div>

        <div className="input-group mb-2 center_input" >
          <input
            type="text-center"
            onChange={(event) => {
              const etherAmount = this.input.value.toString()
              this.setState({
                output: etherAmount * 100
              })
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg "
            placeholder="0"
            required />
            
          <div className="input-group-append ">
            <div className="input-group-text">
              <img src={ethLogo} height='32' />
              &nbsp;&nbsp;&nbsp; ETH
            </div>
          </div>
        </div>
        
        
        <div className="arrow center_arrow mb-2 ">  
          <div className="input-group-append ">
            <div className="input-group-text">
              <img src={arrowlogo} height='23' alt=""/>
            </div>
          </div>
        </div>


        <div className="input-group mb-1 center_input">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />

          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height='32' alt=""/>
              &nbsp; Token
            </div>
          </div>
        </div>

        <div className='text-control-from'>
          <label className="text-white spacer_input"><b>Output</b></label>
          <span className="text-white  ">
            Balance: {window.web3.utils.fromWei(this.props.tokenBalance, 'Ether')}
          </span>
        </div>



        
        <div class="bt-color text-center mb-4 ">
        <button type="submit" className=" w-50 btn btn-primary btn-lg">Swap</button>
        </div>

        <div class="card-footer text-white text-center">
        Exchange Rate 1 ETH = 100 Token
        </div>
        </div>
        
      </form>
      
    );
  }
}

export default Pool;