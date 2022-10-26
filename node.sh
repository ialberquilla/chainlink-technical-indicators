#!/bin/sh
mkdir ~/.chainlink-goerli

echo "ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=5
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
ALLOW_ORIGINS=*
ETH_URL=wss://eth-goerli.g.alchemy.com/v2/lfD7fS6YwmZ5Cl_3tk2am-Ewboose24E
DATABASE_URL=postgresql://postgres:qwerty123@0.0.0.0:5432/postgres?sslmode=disable
SKIP_DATABASE_PASSWORD_COMPLEXITY_CHECK=true" > ~/.chainlink-goerli/.env

docker pull postgres:latest

docker run  -e POSTGRES_PASSWORD=qwerty123 -p 5432:5432 postgres:latest 

cd ~/.chainlink-goerli && docker run --network host  --platform linux/amd64 -p 6688:6688 -v ~/.chainlink-goerli:/chainlink -it --env-file=.env smartcontract/chainlink:1.9.0 local n

