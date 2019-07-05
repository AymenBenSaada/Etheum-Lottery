const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');
let lottery;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))
          .deploy({ data: bytecode })
          .send({from: accounts[0], gas: '1000000'});
});

 describe('Lottery', () => {
   it('deploys a contract',() =>{
     assert.ok(lottery.options.address);
   });
 it('allows multiple accounts to enter ', async () => {
   await lottery.methods.enter().send({
     from: account[0],
     value: web3.utils.towei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: account[1],
      value: web3.utils.towei('0.02', 'ether')
     });
     await lottery.methods.enter().send({
       from: account[2],
       value: web3.utils.towei('0.02', 'ether')
      });
    const players = await lottery.methods.getPlayer().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
});
  it('requires ether' , async()=>{
    try {
    await lottery.methods.send({
      from: accounts[0],
      value: 10
    });
    assert(false);
  } catch (err) {
    assert(err);
  }
  });
it('only manager cann call winnerfct', async()=>{
  try {
  await lottery.methods.pickWiner().send({
    from: accounts[1]
  });
  assert(false);
} catch (err) {

  }

});
 });
