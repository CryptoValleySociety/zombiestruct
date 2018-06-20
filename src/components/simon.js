import React, { Component } from 'react';
import contractMethods from '../utils/calls/simon';

import '../App.css'

class Simon extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: 'this is my data as a react state',
            contract: null,
            accounts: null,
            zombieId: -1
        }
    }

    componentDidMount() {
      this.initContract();
    }

    async initContract() {
      const initObj = await contractMethods.initialize();
      this.setState({
        contract: initObj.contract,
        accounts: initObj.accounts
      });

      this.setListener()
      this.checkZombie()
    }

    setListener() {
      contractMethods.setNewZombieListener(this.state.contract, async (event) => {
        this.setState({ zombieId: event.returnValues.zombieId })
      });
    }

    async checkZombie() {
      const zombiesInAccount = await contractMethods.getZombiesByOwner(this.state.contract, this.state.accounts[0]);
      if (zombiesInAccount.length === 0) {
        await contractMethods.createRandomZombie(this.state.contract, 'Simon', this.state.accounts[0], 300000);
      }
      await this.showZombie();
    }

    async showZombie() {
      let zId
      if (this.state.zombieId === -1) {
        const ids = await contractMethods.getZombiesByOwner(this.state.contract, this.state.accounts[0]);
        if (ids.length > 0) {
          zId = ids[0];
          this.setState({ zombieId: zId });
        } else {
          return;
        }
      } else {
        zId = this.state.zombieId;
      }
      const zombie = await contractMethods.getZombieById(this.state.contract, zId);
      const zName = zombie.name;
      const zLevel = zombie.level;
      const zDna = zombie.dna
      this.setState({ data: "Your zombie is named " + zName + ", has a dna of " + zDna + " and is of level " + zLevel });
    }

    levelUp() {
      const zId = this.state.zombieId;
      contractMethods.levelUp(this.state.contract, zId, this.state.accounts[0], async () => {
        await this.showZombie();
      });

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
