source .env

target_network=$1
target_contract=$2

if [ -z "$TESTNET_PRIVATE_KEY" ]; then
    echo "Please set the required environment variables (TESTNET_PRIVATE_KEY)."
    exit 1
fi

# Select the network based on the input parameter
if [ "$target_network" == "sepolia" ]; then
    RPC_URL=$SEPOLIA_ENDPOINT
elif [ "$target_network" == "bsctestnet" ]; then
    RPC_URL=$BSC_TESTNET_ENDPOINT
else
    echo "Usage: ./deploy.sh [sepolia|...]"
    exit 1
fi

# Deploy the contract using Foundry
forge script scripts/deploy/Deploy.s.sol:$target_contract \
 --rpc-url $RPC_URL \
 --private-key $TESTNET_PRIVATE_KEY \
 --broadcast \
 -vvvvv

##
##forge verify-contract --chain-id 11155111 -e xxxx --constructor-args $(cast abi-encode "constructor(address)" 0x932161e47821c6F5AE69ef329aAC84be1E547e53)  0x2C497C5f28A8C52082dDf8806F3e85052152bAeD MystikoVoteToken --watch
