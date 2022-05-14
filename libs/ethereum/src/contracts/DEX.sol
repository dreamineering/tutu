// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";


/**
 * @title DEX Template
 * @author stevepham.eth and m00npapi.eth
 * @notice Empty DEX.sol that just outlines what features could be part of the challenge (up to you!)
 * @dev Create an automatic market where our contract will hold reserves of both ETH and 🎈 Balloons. 
   These reserves will provide liquidity that allows anyone to swap between the assets.
 */
contract DEX {
    /* ========== GLOBAL VARIABLES ========== */

    using SafeMath for uint256; //outlines use of SafeMath for uint256 variables
    IERC20 token; //instantiates the imported contract


    uint256 public totalLiquidity;
    mapping(address => uint) public liquidity;


    /* ========== EVENTS ========== */

    /**
     * @notice Emitted when ethToToken() swap transacted
     */
    event EthToTokenSwap(address indexed sender, string msg, uint value, uint tokenOutput);

    /**
     * @notice Emitted when tokenToEth() swap transacted 
     */
    event TokenToEthSwap(address indexed sender, string msg, uint ethOutput, uint tokenInput);

    /**
     * @notice Emitted when liquidity provided to DEX and mints LPTs.
     */
    event LiquidityProvided(address indexed sender, uint liquidityMinted, uint eth, uint tokenDeposit);

    /**
     * @notice Emitted when liquidity removed from DEX and decreases LPT count within DEX.
     */
    event LiquidityRemoved(address indexed sender, uint amount, uint ethWithdrawn, uint tokenAmount);


    // bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));

    // function _safeTransfer(address _tokenAddress, address to, uint value) private {
    //     (bool success, bytes memory data) = _tokenAddress.call(abi.encodeWithSelector(SELECTOR, to, value));
    //     require(success && (data.length == 0 || abi.decode(data, (bool))), 'DEX: TRANSFER_FAILED');
    // }

    /* ========== CONSTRUCTOR ========== */

    constructor(address token_addr)  {
        token = IERC20(token_addr); //specifies the token address that will hook into the interface and be used through the variable 'token'
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    /**
     * @notice initializes amount of tokens that will be transferred to the DEX itself from the erc20 contract mintee (and only them based on how Balloons.sol is written). Loads contract up with both ETH and Balloons.
     * @param tokens amount to be transferred to DEX
     * @return totalLiquidity is the number of LPTs minting as a result of deposits made to DEX contract
     * NOTE: since ratio is 1:1, this is fine to initialize the totalLiquidity (wrt to balloons) as equal to eth balance of contract.
     */

    function init(uint256 tokens) public payable returns (uint256) {
        // First HH account in dev network
        console.log("msg.sender", msg.sender);
        require(totalLiquidity==0,"DEX:init - already has liquidity");
        totalLiquidity = address(this).balance;
        liquidity[msg.sender] = totalLiquidity;
        require(token.transferFrom(msg.sender, address(this), tokens));
        return totalLiquidity;
    }

    /**
     * @notice returns yOutput, or yDelta for xInput (or xDelta)
     * @dev Follow along with the [original tutorial](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90) 
     * Price section for an understanding of the DEX's pricing model and for a price function to add to your contract. 
     * You may need to update the Solidity syntax (e.g. use + instead of .add, * instead of .mul, etc). Deploy when you are done.
     */
    function price(
        uint256 xInput,
        uint256 xReserves,
        uint256 yReserves
    ) public pure returns (uint256 yOutput) {
        uint256 xInputWithFee = xInput.mul(997);
        uint256 numerator = xInputWithFee.mul(yReserves);
        uint256 denominator = (xReserves.mul(1000)).add(xInputWithFee);
        return (numerator / denominator);
    }

    /**
     * @notice returns liquidity for a user. Note this is not needed typically due to the `liquidity()` 
       mapping variable being public and having a getter as a result. 
       This is left though as it is used within the front end code (App.jsx).
     */
    function getLiquidity(address lp) public view returns (uint256) {
        return liquidity[lp];
    }

    /**
     * @notice sends Ether to DEX in exchange for $BAL
     */
    function ethToToken() public payable returns (uint256) {
        require(msg.value > 0, "cannot swap 0 ETH");
        uint256 ethReserve = address(this).balance.sub(msg.value);
        uint256 token_reserve = token.balanceOf(address(this));
        uint256 tokenOutput = price(msg.value, ethReserve, token_reserve);

        require(token.transfer(msg.sender, tokenOutput), "ethToToken(): reverted swap.");
        // _safeTransfer(token.address, msg.sender, tokenOutput); 

        emit EthToTokenSwap(msg.sender, "Eth to Balloons", msg.value, tokenOutput);
        return tokenOutput;
    }

    /**
     * @notice sends $BAL tokens to DEX in exchange for Ether
     */
    function tokenToEth(uint256 tokenInput) public returns (uint256) {
        require(tokenInput > 0, "cannot swap 0 tokens");
        uint256 token_reserve = token.balanceOf(address(this));
        uint256 ethOutput = price(tokenInput, token_reserve, address(this).balance);
        require(token.transferFrom(msg.sender, address(this), tokenInput), "tokenToEth(): reverted swap.");
        (bool sent, ) = msg.sender.call{ value: ethOutput }("");
        require(sent, "tokenToEth: revert in transferring eth to you!");
        emit TokenToEthSwap(msg.sender, "Balloons to ETH", ethOutput, tokenInput);
        return ethOutput;
    }

    /**
     * @notice allows deposits of $BAL and $ETH to liquidity pool
     * NOTE: the msg.value is the amount used to determine the amount of $BAL needed
     * NOTE: this $BAL amount is taken from the **depositor**.
     * NOTE: **user** has to make sure to give DEX approval to spend their tokens on their behalf by calling approve function prior to this function call.
     * NOTE: Equal parts of both assets will be removed from the user's wallet with respect to the price outlined by the AMM.
     */

     /**
      * Taking ETH find the equivalent amount of tokens
      * use transferFrom to transfer the tokens to DEX ownership from the user 
      */
    function deposit() public payable returns (uint256 tokensDeposited) {
        // Check is msg.value is greater than 0? or is that not possible?
        require(msg.value > 0, "You gotta deposit some ETH init");

        console.log("msg.value is ether from transaction", msg.value);
        console.log("msg sender is", msg.sender);

        // take the new eth balance of this contract and subtract the msg.value to get the prior ethReserve
        uint256 ethReserve = address(this).balance.sub(msg.value);
        console.log("New Eth Balance", address(this).balance);
        console.log("ethReserve", ethReserve);

        // on the Ballons contract this DEX contract's balance 
        uint256 tokenReserve = token.balanceOf(address(this));
        
        // QUESTION: why put this on two lines?
        uint256 tokenDeposit;

        // adding 1 is required if msg.value or tokenReserve is 0
        // TODO: investigate circumstances that could lead to this
        tokenDeposit = (msg.value.mul(tokenReserve) / ethReserve).add(1);    

        console.log("additional ETH * tokenReserve =", msg.value.mul(tokenReserve));
        console.log("additional ETH * tokenReserve / ethReserve =", msg.value.mul(tokenReserve) / ethReserve);
        console.log("tokenDeposit (with 1 token added)", tokenDeposit);

        uint256 liquidityMinted = msg.value.mul(totalLiquidity) / ethReserve;
        console.log("liquidityMinted", liquidityMinted);

        liquidity[msg.sender] = liquidity[msg.sender].add(liquidityMinted);
        console.log("sender liquidity", liquidity[msg.sender]);

        totalLiquidity = totalLiquidity.add(liquidityMinted);
        console.log("totalLiquidity", totalLiquidity);

        // TODO: research/confirm security best practice for transferFrom
        // using the balloon token's transferFrom method
        // transfer tokenDeposit amount from the msg.sender/User
        // to a balance on the Balloons contract for this DEX contract
        // if not enough tokens, revert
        require(token.transferFrom(msg.sender, address(this), tokenDeposit));  

        // emit the event
        emit LiquidityProvided(msg.sender, liquidityMinted, msg.value, tokenDeposit);
        return tokenDeposit;
    }

    /**
     * @notice allows withdrawal of $BAL and $ETH from liquidity pool
     * NOTE: with this current code, the msg caller could end up getting very little back if the liquidity is super low in the pool. 
     */
    function withdraw(uint256 amount) public returns (uint256 eth_amount, uint256 token_amount) {
        require(liquidity[msg.sender] >= amount, "withdraw: sender does not have enough liquidity to withdraw.");
        uint256 ethReserve = address(this).balance;
        uint256 tokenReserve = token.balanceOf(address(this));
        uint256 ethWithdrawn;

        ethWithdrawn = amount.mul(ethReserve) / totalLiquidity;

        uint256 tokenAmount = amount.mul(tokenReserve) / totalLiquidity;
        liquidity[msg.sender] = liquidity[msg.sender].sub(amount);
        totalLiquidity = totalLiquidity.sub(amount);
        (bool sent, ) = payable(msg.sender).call{ value: ethWithdrawn }("");
        require(sent, "withdraw(): revert in transferring eth to you!");
        require(token.transfer(msg.sender, tokenAmount));
        emit LiquidityRemoved(msg.sender, amount, ethWithdrawn, tokenAmount);
        return (ethWithdrawn, tokenAmount);
    }
}
