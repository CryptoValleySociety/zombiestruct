import React, { Component } from 'react'
import contractMethods from '../utils/infura/index';

import '../App.css'

class Seb extends Component {
    constructor(props) {
        super(props)

        this.state = {
            contract: this.props.contract,
            accounts: this.props.accounts,
            zombieCount: 0,
            zombies: this.props.zombies,
        }
    }

    async componentDidMount() {
        await this.updateData()
    }


    async updateData() {
        const zombieCount = await contractMethods.getNumberOfZombies()
        let zombies = new Array(zombieCount)
        for(let i = 0; i < zombieCount; i++) {
            zombies[i] = await contractMethods.getZombieById(i)
        }
        this.setState({ zombies: zombies, zombieCount: zombieCount})
    }

    async buttonHandler() {
        for (let i = 0; i < this.state.accounts.length; i++) {
            const zIDArray = await contractMethods.getZombiesByOwner(this.state.accounts[i])
            if (zIDArray.length === 0) {
                await contractMethods.createRandomZombie(this.state.accounts[i],"Derp" + i)
                await this.updateData()
                break;
            }
        }
    }

    render() {
        let outputArray = [];
        if (this.state.zombies !== null) {
            for (let i = 0; i < this.state.zombieCount; i++) {
                let currentZombie = this.state.zombies[i]
                outputArray.push(<p key={i}>Name: {currentZombie.name},DNA:  {currentZombie.dna}</p>)
            }
        }
        return (
            <div className="segment" id="seb">
                <h1>Seb</h1>
                <p id="zombieCount">Number of zombies in contract: {this.state.zombieCount}</p>
                <div>{outputArray}</div>
                <button id="button" onClick={() => { this.buttonHandler() }}>Create Zombie</button>
            </div>
        );
    }
}

export default Seb
