// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

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

contract Hairs {
    uint256 internal hairsLength = 0;
    address internal cUsdTokenAddress =
        0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Hair {
        address payable owner;
        string image;
        string brand;
        string color;
        string durability;
        uint256 price;
    }
    mapping(uint256 => Hair) internal hairs;

    // Add a new Hair to the hairs mapping
    function addHair(
        string memory _image,
        string memory _brand,
        string memory _color,
        string memory _durability,
        uint256 _price
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

    // get Hair with key @_index from hairs mapping
    function getHair(uint256 _index)
        public
        view
        returns (
            address payable,
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        return (
            hairs[_index].owner,
            hairs[_index].image,
            hairs[_index].brand,
            hairs[_index].color,
            hairs[_index].durability,
            hairs[_index].price
        );
    }

    // replace Hair image at index @_index with image url @_image
    function replaceHairImage(uint256 _index, string memory _image) public {
        require(
            msg.sender == hairs[_index].owner,
            "Only the owner can change the image"
        );
        hairs[_index].image = _image;
    }

    // buy Hair at index @_index
    function buyHair(uint256 _index) public payable {
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

    // get total number of Hairs created
    function getHairsLength() public view returns (uint256) {
        return (hairsLength);
    }
}
