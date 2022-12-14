#!/bin/sh
mkdir ~/.chainlink-goerli

echo "ROOT=/chainlink
LOG_LEVEL=debug
ETH_CHAIN_ID=5
CHAINLINK_TLS_PORT=0
SECURE_COOKIES=false
ALLOW_ORIGINS=*
ETH_URL=wss://eth-goerli.g.alchemy.com/v2/lfD7fS6YwmZ5Cl_3tk2am-Ewboose24E
DATABASE_URL=postgresql://fabri:qwerty123@192.168.1.4:5432/postgres?sslmode=disable
SKIP_DATABASE_PASSWORD_COMPLEXITY_CHECK=true
CHAINLINK_DEV=true
FEATURE_WEBHOOK_V2=true
" > ~/.chainlink-goerli/.env

echo "givememoney@keyko.io" > ~/.chainlink-goerli/.api
echo "password" >> ~/.chainlink-goerli/.api
echo "Ciaociaociaobanana1!" > ~/.chainlink-goerli/.password




docker pull postgres:latest

docker run  -e POSTGRES_USER=fabri -e POSTGRES_PASSWORD=qwerty123 -p 5432:5432 postgres:latest 

cd ~/.chainlink-goerli && docker run -p 6688:6688 -v ~/.chainlink-goerli:/chainlink -it --env-file=.env smartcontract/chainlink:1.9.0 local n 
-p /chainlink/.password -a /chainlink/.api


