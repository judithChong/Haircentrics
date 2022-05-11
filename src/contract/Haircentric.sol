 // SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


interface IERC20Token {
   function transfer(address, uint256) external returns (bool);

    function approve(address, uint256) external returns (bool);

    function transferFrom(
        address,
        address,
        uint256
    ) external returns (bool);

    function totalSupply() external view returns (uint256);

    function balanceOf(address) external view returns (uint256);

    function allowance(address, address) external view returns (uint256);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

contract  Hairs {
    
    
    uint internal hairsLength = 0;
    address internal cUsdTokenAddress =  0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct  Hair {
        address payable owner;
        string image;
        string brand;
        string color;
        string durability;
         uint price;
         
        
    }
     mapping (uint =>  Hair) internal hairs;

      function  addHair(
        string memory _image, 
        string memory _brand,
        string memory _color,
        string memory _durability,
        uint _price

          ) public {
       Hair storage Haircentials = hairs[hairsLength];


         Haircentials.owner = payable(msg.sender);
           Haircentials.image = _image;
           Haircentials.brand = _brand;
           Haircentials.color = _color;
          Haircentials.durability = _durability;
              Haircentials.price = _price;

  
        hairsLength++;
          }

          
     function getHair(uint _index) public view returns (
        address payable,
        string memory,  
        string memory,
        string memory,
        string memory,
        uint
        
        
      
    ) {
        return (  
            hairs[_index].owner,
             hairs[_index].image,
              hairs[_index].brand,
              hairs[_index].color,
               hairs[_index].durability,
                 hairs[_index].price
               
        );
    }


     function replaceHairImage(uint _index, string memory _image) public {
        require(msg.sender == hairs[_index].owner, "Only the owner can change the image");
        hairs[_index].image = _image;
     }

    
      function buyHair(uint _index) public payable  {
        require(
          IERC20Token(cUsdTokenAddress).transferFrom(
            msg.sender,
            hairs[_index].owner,
            hairs[_index].price
          ),
          "Transfer failed."
        );

         hairs[_index].owner = payable(msg.sender);
         
    }

     function gethairsLength() public view returns (uint) {
        return (hairsLength);
    }
}
