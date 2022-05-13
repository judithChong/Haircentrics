import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { useState, useEffect, useCallback } from "react";




import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";
import IERC from "./contract/IERC.abi.json";
import Haircentrics from  './contract/Haircentrics.abi.json';
import Hairs from './components/Hairs';
import Newhairs from './components/Newhairs';


const ERC20_DECIMALS = 18;


const contractAddress = "0xb967259733Bb83b7C0c6FC737E7b1190cf9dd40C";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";



function App() {

  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [hairs, setHairs] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
     
    }
  }, [kit, address]);

  useEffect(() => {
    if (contract) {
      getHair();
    }
  }, [contract]);  



  const getBalance = (async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
      const contract = new kit.web3.eth.Contract(Haircentrics, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  });

  const buyHair = async (_index,) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
    
      
      await cUSDContract.methods
        .approve(contractAddress, hairs[_index].price)
        .send({ from: address });
      await contract.methods.buyHair(_index).send({ from: address });
      getHair();
      getBalance();
    } catch (error) {
      console.log(error)
    }};
 

  const getHair = (async () => {
    const hairsLength = await contract.methods.getHairsLength().call();
    const _hairr = []
    for (let index = 0; index < hairsLength; index++) {
      console.log(hairsLength);
      let _hairs = new Promise(async (resolve, reject) => {
      let hair = await contract.methods.getHair(index).call();

      resolve({
        index: index,
        owner: hair[0],
        image: hair[1],
        brand: hair[2],
        color: hair[3],
        durability: hair[4],
        price: hair[5]

                
      });
    });
    _hairr.push(_hairs);
  }

  
  const hairs = await Promise.all(_hairr);
  setHairs(hairs);
  console.log(hairs)
});

const addHair = async (  _image, _brand, _color, _durabillity, price ) => {
  const _price = new BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();
  try {
    await contract.methods
      .addHair(_image, _brand, _color, _durabillity, _price)
      .send({ from: address });
     getHair();
  } catch (error) {
    console.log(error);
  }
};

const changeHairImage = async (_index, _newImage) => {
  console.log(_index);
  try {
    await contract.methods.replaceHairImage (_index, _newImage).send({ from: address });
    getHair();
    getBalance();
  } catch (error) {
   console.log(error);
   alert("The hair image has been changed")
  }};
   

  return (
    <div>
      <Navbar balance = {cUSDBalance} />
      <Hairs hairs ={hairs}
      buyHair = {buyHair}
      changeHairImage= {changeHairImage}
      currentUser = {address}
       
      />
       <Newhairs addHair = {addHair}
       
/>
    </div>
    )


}
export default App;