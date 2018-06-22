const assert = require('assert');
import contractMethods from "../../../../src/utils/calls/component";

describe('Contract Method Library For Components', () => {
    let contract = '';
    let accounts = [];

    before(async () => {
        const obj = await contractMethods.initialize();
        contract = obj.contract
        accounts = obj.accounts
    })

    it('should initialize contract and return obj with accounts', async () => {
        assert.equal(typeof(contract._address), 'string');
        assert.equal(accounts.length, 10)
    });
});