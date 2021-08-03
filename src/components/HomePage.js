import React, { Component } from 'react'

class HomePage extends Component {
    constructor(props) {
      super(props)
      
    }
  
    render() {
        return (
            // <form className="mb-1 " onSubmit={(event) => {
            //     event.preventDefault()
            //     this.props.loadBlockchainData()
            //   }}>
            
            <h1 class="text-center mb-2 font-weight-bold text-white display-3 nw tagline ">Decentralized Exchange
                
                <p class="text-center lead li">
                   
                </p>
                <p class="text-center lead li">
                   
                </p>
                <p class="text-center lead li">
                    Decentralized Exchange (DEX) are a type of crytocurrency exchange which allows 
                </p>
                <p class="text-center lead li">
                    for direct peer-to-peer crytocurrency transaction to take place online securely and
                </p>
                <p class="text-center lead li">
                    without the need for and intermediary
                </p>
                <div class='col-md-12'>
                <button type="submit" className="btn btn-primary btn-lg ">Connect Wallet</button>
                </div>
            </h1>
            // </form>
           
        );
      }
    }
    
    export default HomePage;