import React, { Component } from 'react';
import EthSwap from '../abis/EthSwap.json'
import Token from '../abis/Token.json'
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar'
import DaiToken from '../abis/DaiToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    //console.log(window.web3)
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })
    //console.log(this.state.ethBalance)
    const networkId =  await web3.eth.net.getId()

     // Load Token
     const tokenData = Token.networks[networkId]
     if(tokenData) {
       const token = new web3.eth.Contract(Token.abi, tokenData.address)
       this.setState({ token })
       let tokenBalance = await token.methods.balanceOf(this.state.account).call()
       this.setState({ tokenBalance: tokenBalance.toString() })
       console.log(this.state.tokenBalance)
     } else {
       window.alert('Token contract not deployed to detected network.')
     }

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      let daiTokenBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }
     

    //Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      this.setState({ stakingBalance: stakingBalance.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

     // Load EthSwap
    const ethSwapData = EthSwap.networks[networkId]
    if(ethSwapData) {
      const ethSwap = new web3.eth.Contract(EthSwap.abi, ethSwapData.address)
      this.setState({ ethSwap })
    } else {
      window.alert('EthSwap contract not deployed to detected network.')
    }

    console.log(this.state.ethSwap)
    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  buyTokens = (etherAmount) => {
    this.setState({ loading: true })
    this.state.ethSwap.methods.buyToken().send({ value: etherAmount, from: this.state.account }).on('confirmation',(latestBlockHash) => {
      // this.setState({ loading: false })
      window.location.reload()
     
    })
    .on('error',(error) => {
      window.location.reload()
      // this.setState({ currentForm: 'buy' })
     
    })
  }

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true })
    this.state.token.methods.approve(this.state.ethSwap.address, tokenAmount).send({ from: this.state.account }).on('confirmation',(latestBlockHash) => {
      this.state.ethSwap.methods.sellToken(tokenAmount).send({ from: this.state.account }).on('confirmation',(latestBlockHash) => {
         // this.setState({ loading: false })
      window.location.reload()
      })
      .on('error',(error) => {
        window.location.reload()
        // this.setState({ currentForm: 'buy' })
       
      })
    })
    .on('error',(error) => {
      window.location.reload()
      // this.setState({ currentForm: 'buy' })
     
    })
  }

  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.daiToken.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }


  // buyTokens = (etherAmount) => {
  //   this.setState({ loading: true })
  //   if (this.state.ethSwap.methods.buyToken.send({ value: etherAmount, from: this.state.account }).on('confirmation',(latestBlockHash))){
  //       this.setState({ loading: false })
  //       window.location.reload()
  //   }
  //   else{
  //     this.setState({ loading: false })
  //     window.location.reload()
  //   }
  // }


    
  // transfer(recipient, amount) {
  //   this.setState({ loading: true })
  //   this.state.waviiiToken.methods.transfer(recipient, amount).send({ from: this.state.account }).on('confirmation', (reciept) => {
  //     this.setState({ loading: false })
  //     window.location.reload()
  //   })
  // }  
  


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ethSwap: {},
      tokenFarm: {},
      daiToken: {},
      daiTokenBalance: '0',
      stakeingBalance: '0',
      ethBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <h1 id="loader" className="text-white font-weight-bold text-center">Loading...
        <p class="text-center lead li">
                   
        </p>
        <p class="text-center lead li">
                      
        </p>
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow spinner-grow-lg text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-warning" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-light" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="spinner-grow text-dark" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        </h1>
      
    } 
    
    else {
      content = <Navbar
      ethBalance={this.state.ethBalance}
      tokenBalance={this.state.tokenBalance}
      buyTokens={this.buyTokens}
      sellTokens={this.sellTokens}
      daiTokenBalance={this.state.daiTokenBalance}
      stakingBalance={this.state.stakingBalance}
      stakeTokens={this.stakeTokens}
      unstakeTokens={this.unstakeTokens}
      />
    }
    return (
      <div>
      {/* <Navbar account={this.state.account} /> */}
      {content}
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: 'device-width' }}>
            <div className="content mr-auto ml-auto">
              
                
               
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
