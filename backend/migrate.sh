#!/bin/bash

truffle migrate --network development --reset

cp ./build/contracts/SampleToken.json ../frontend/abis/
cp ./build/contracts/ETBStaking.json ../frontend/abis/