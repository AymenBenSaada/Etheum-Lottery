pragma solidity ^0.4.25;
contract lottery  {
    address public manager;
  address [] public players;
    function lottery( ) public {
   manager = msg.sender;
    }
  function enter ()  public payable {
    require(msg.value > .01 ether);
    players.push (msg.sender);
}
  function random() private view returns (uint){
   return uint (  sha3( block.difficulty , now , players));
  }
  function pickWiner () public  restricted {

      uint index = random () % players.length;
      players[index].transfer(this.balance);
          players = new address[]{0};
  }
  modifier restricted (){
      require(msg.sender == manager);
       _;
    }

 function getPlayer() public view returns(address[]){
     return players;
 }
}
