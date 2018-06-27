import React, { Component } from 'react';
import contractMethods from '../utils/calls/component';

import '../App.css'

class Simon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: 'this is my data as a react state',
            contract: this.props.contract,
            accounts: this.props.accounts,
            zombie_one: this.props.zombies[0]
        }
    }

    componentDidMount() {
      this.setListener()
      this.showZombie()
    }

    setListener() {
      contractMethods.setNewZombieListener(this.state.contract, async (event) => {
        this.setState({ zombieId: event.returnValues.zombieId })
      });
    }

    async showZombie() {
      const zombie = await contractMethods.getZombieById(this.state.contract, this.state.zombie_one);
      const zName = zombie.name;
      const zLevel = zombie.level;
      const zDna = zombie.dna
      this.setState({ data: "Your zombie is named " + zName + ", has a dna of " + zDna + " and is of level " + zLevel });
    }

    async levelUp() {
      await contractMethods.levelUp(this.state.contract, this.state.zombie_one, this.state.accounts[0])
      await this.showZombie();
    }

    render() {
        return (
            <div className="segment" id="simon">
                <h1>Simon</h1>
                <p id="data">{this.state.data}</p>
                <button id="button" onClick={() => { this.levelUp() }}>Level Up!</button>
            </div>
        );
    }
}

export default Simon
