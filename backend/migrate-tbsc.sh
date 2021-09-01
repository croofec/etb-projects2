#!/bin/bash

truffle migrate --network testnet --reset

cp ./build/contracts/BEP20Token.json ../frontend/abis/
cp ./build/contracts/BEP20RewardToken.json ../frontend/abis/
cp ./build/contracts/ETBStaking.json ../frontend/abis/
cp ./build/contracts/BEP20TokenFaucet.json ../frontend/abis/