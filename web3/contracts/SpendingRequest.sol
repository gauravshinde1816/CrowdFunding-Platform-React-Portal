// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract SpendingRequestContract {
    struct SpendingRequest {
        address recipient;
        string title;
        string database_id;
        string description;
        uint256 minCount;
        uint256 target;
        uint256 amountCollected;
        address[] donators;
        uint256[] donations;
        address[] voters;
    }

    mapping(uint256 => SpendingRequest) public SP;

    uint256 public noSpendingRequest = 0;

    function createSpendingRequest(
        address _recipient,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _minCount,
        string memory _database_id
    ) public returns (uint256) {
        SpendingRequest storage spendingRequest = SP[noSpendingRequest];

        spendingRequest.recipient = _recipient;
        spendingRequest.title = _title;
        spendingRequest.description = _description;
        spendingRequest.target = _target;
        spendingRequest.amountCollected = 0;
        spendingRequest.minCount = _minCount;
        spendingRequest.database_id = _database_id;

        noSpendingRequest++;

        return noSpendingRequest - 1;
    }

    function donateToSpendingRequest(uint256 _id) public payable {
        uint256 amount = msg.value;

        SpendingRequest storage spendingRequest = SP[_id];
        require(
            spendingRequest.voters.length > spendingRequest.minCount,
            "Approval Count Should be greater than min Count"
        );

        spendingRequest.donators.push(msg.sender);
        spendingRequest.donations.push(amount);

        (bool sent, ) = payable(spendingRequest.recipient).call{value: amount}(
            ""
        );

        if (sent) {
            spendingRequest.amountCollected =
                spendingRequest.amountCollected +
                amount;
        }
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (SP[_id].donators, SP[_id].donations);
    }

    function getSP() public view returns (SpendingRequest[] memory) {
        SpendingRequest[] memory allCampaigns = new SpendingRequest[](
            noSpendingRequest
        );

        for (uint i = 0; i < noSpendingRequest; i++) {
            SpendingRequest storage item = SP[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

     

    function getAmountCollected(uint256 _id) public view returns (uint256) {
        SpendingRequest storage spendingRequest = SP[_id];
        return spendingRequest.amountCollected;
    }

    function vote(uint256 _id, address voterAddress) public returns (uint) {
        SpendingRequest storage spendingRequest = SP[_id];

        for (uint i = 0; i < spendingRequest.voters.length; i++) {
            if (spendingRequest.voters[i] == voterAddress) {
                return 0;
            }
        }

        spendingRequest.voters.push(voterAddress);
        return spendingRequest.voters.length;
    }
}
