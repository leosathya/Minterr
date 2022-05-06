import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";
import toast from "react-hot-toast";

export const TransactionContext = React.createContext();

let ethereum;
if (typeof window !== "undefined") {
	ethereum = window.ethereum;
}

// Contract Related
const getContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const cartoonNftContract = new ethers.Contract(
		contractAddress,
		contractAbi,
		signer
	);

	//console.log(provider, signer, transactionContract);
	return cartoonNftContract;
};

// Provider
export const TransactionProvider = ({ children }) => {
	const [currentWallet, setCurrentWallet] = useState({});
	const [formData, setFormData] = useState({
		amount: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	// Updating forn data value on real time
	const handleChange = (e, name) => {
		setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
	};

	// Toasts
	const transactionSuccess = (toastHandler = toast) => {
		toastHandler.success(`Nft Minted Successfully ✔✔✔`, {
			style: {
				background: "#04111d",
				color: "#fff",
			},
		});
	};

	// Send Ethereum Function.
	const mintNft = async () => {
		if (!ethereum) return alert("Please Install Metamask");
		try {
			const { amount } = formData;
			const nftContract = getContract();

			if (amount > 2) {
				return alert("Can't mint more than 2 in a Single Transaction.");
			}
			const currBal = await nftContract.balanceOf(currentWallet);

			console.log(parseInt(currBal, 16) + parseInt(amount, 10));

			if (parseInt(currBal, 16) + parseInt(amount, 10) > 4) {
				return alert("Exceeding max Nft holding for a Account");
			}

			// minting
			const transactionHash = await nftContract.freeMint(amount);

			setIsLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);
			await transactionHash.wait();

			transactionSuccess();
			setIsLoading(false);
			console.log(`success -${transactionHash.hash}`);
		} catch (error) {
			console.error(error);
			throw new Error("nO Ethereum Object found.");
		}
	};

	// Check for any connected wallet.
	const checkForConnectedWallet = async () => {
		try {
			if (!ethereum)
				return alert("Please Install Matamask To Use Our Services.");

			const account = await ethereum.request({ method: "eth_accounts" });
			if (account.length) {
				setCurrentWallet(account[0]);
			} else console.log("No accounts found.");
		} catch (error) {
			console.error(error);
			throw new Error("No Ethereum Object Found.");
		}
	};

	// Wallet connection with site
	const connectWallet = async () => {
		try {
			if (!ethereum)
				return alert("Please Install Matamask To Use Our Services.");

			const account = await ethereum.request({ method: "eth_requestAccounts" });
			setCurrentWallet(account[0]);
		} catch (error) {
			console.error(error);
			throw new Error("No Ethereum Object Found.");
		}
	};

	useEffect(() => {
		checkForConnectedWallet();
	}, [currentWallet]);

	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentWallet,
				formData,
				handleChange,
				mintNft,
				isLoading,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
