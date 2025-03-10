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
forge script scripts/deploy/Deploy.testnet.s.sol:$target_contract \
 --rpc-url $RPC_URL \
 --private-key $TESTNET_PRIVATE_KEY \
 --broadcast \
 -vvvvv
