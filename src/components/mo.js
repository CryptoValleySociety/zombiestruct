import React, { Component } from 'react'
import contractMethods from '../utils/infura/index';

import '../App.css'

class Mo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            contract: this.props.contract,
            accounts: this.props.accounts,
            zombies: this.props.zombies,
            account: this.props.accounts[0]
        }
    }

    componentDidMount() {
        this.getZombiesByOwner(this.state.account)
    }

    async getZombiesByOwner(account) {
        let dataArray=[]
        const zombieIds = await contractMethods.getZombiesByOwner(account)
        for(let i = 0; i < zombieIds.length; i++) {
            const zombie = await contractMethods.getZombieById(zombieIds[i])
            dataArray.push(<div key={i}>{zombie['0']} {zombie['1']} <br/></div>)
        }
        this.setState({
            data: dataArray
        });
    }

    async feedOnKitty() {
        await contractMethods.feedOnKitty(this.state.account,this.state.zombies[0],0)
        this.getZombiesByOwner(this.state.account)
    }

    render() {
        return (
            <div className="segment" id="mo">
                <h1>Mo</h1>
                <div id="data">{this.state.data}</div>
                <button id="button" onClick={() => {
                    this.feedOnKitty()
                }}>feedonkitty</button>
            </div>
        );
    }

}

export default Mo
