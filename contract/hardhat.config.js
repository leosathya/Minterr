
require("@nomiclabs/hardhat-waffle");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	solidity: "0.8.4",
	networks: {
		rinkeby: {
			url: process.env.API,
			accounts: [
				process.env.ACCOUNT
			],
		},
	},
};
