# Use yarn to install packages
`yarn install`

# Put your metamask account's private key in .env
`cp .env.example .env`

# Compile smart contract into an artifact file

`npx hardhat compile`

# Create a local hardhat node test network

`npx hardhat node`

# Deploy contract to the hardhat network

`npx hardhat run scripts/deploy.js --network localhost`
