source .env

ETHERSCAN_API_KEY=$1

forge verify-contract --chain-id 11155111 -e $ETHERSCAN_API_KEY --constructor-args $(cast abi-encode "constructor(address)" 0x932161e47821c6F5AE69ef329aAC84be1E547e53)  $VOTE_XZK_ADDRESS MystikoVoteToken --watch
forge verify-contract --chain-id 11155111 -e $ETHERSCAN_API_KEY --constructor-args $(cast abi-encode "constructor(uint256)" 120) $TIMELOCK_ADDRESS MystikoTimelockController --watch
forge verify-contract --chain-id 11155111 -e $ETHERSCAN_API_KEY --constructor-args $(cast abi-encode "constructor(address, address, uint48, uint32, uint48)" $VOTE_XZK_ADDRESS $TIMELOCK_ADDRESS 120 600 120)  $GOVERNOR_ADDRESS MystikoGovernor --watch
forge verify-contract --chain-id 11155111 -e $ETHERSCAN_API_KEY --constructor-args $(cast abi-encode "constructor()")  $DAO_REGISTRY_ADDRESS MystikoGovernorRegistry --watch
