const hre = require("hardhat");

async function main() {
  const Image = await hre.ethers.getContractFactory("Image");
  const image = await Image.deploy("https://i.imgur.com/dVbdxIb.jpg");
  await image.deployed();
  console.log("Greeter deployed to:", image.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
