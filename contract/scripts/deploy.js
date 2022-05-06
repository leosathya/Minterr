const main = async () => {
	const Transaction = await hre.ethers.getContractFactory("cartoonNft");
	const transaction = await Transaction.deploy();

	await transaction.deployed();

	console.log("Transaction deployed to:", transaction.address);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

runMain();

// deployed address :: 0xA692643CECf2956F604aBc2277Df483b3fd78258
