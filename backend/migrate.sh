#!/bin/bash

truffle migrate --network development --reset

cp ./build/contracts/BEP20Token.json ../frontend/abis/
cp ./build/contracts/BEP20RewardToken.json ../frontend/abis/
cp ./build/contracts/ETBStaking.json ../frontend/abis/