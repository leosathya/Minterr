import React, { useContext } from "react";
import {
	AiFillPlayCircle,
	AiOutlineGithub,
	AiFillLinkedin,
} from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { Loader } from ".";
import { Toaster } from "react-hot-toast";

const Input = ({ placeholder, name, type, value, handleChange }) => (
	<input
		placeholder={placeholder}
		type={type}
		value={value}
		onChange={(e) => handleChange(e, name)}
		className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
	/>
);

const Welcome = () => {
	const {
		connectWallet,
		currentWallet,
		formData,
		handleChange,
		mintNft,
		isLoading,
	} = useContext(TransactionContext);

	const handleSubmit = (e) => {
		const { amount } = formData;
		if (!amount) return;

		mintNft();
	};

	return (
		<div className="flex w-full justify-center items-center">
			<div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
				<div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
					<h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
						Mint Our Asome <br /> Nfts and start a <br />
						Great Journey with Us
					</h1>
					<p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
						Be a part Revolutionary Journey. Hold Nfts from our Uniq 20item
						Collectibles.
					</p>
					<p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
						Net supply 20. You can mint upto 2 items in single Transaction.{" "}
						<br /> 4 items per each Address.
					</p>

					{currentWallet.length ? (
						<button
							type="button"
							className="flex flex-row justify-center items-center my-5 bg-[#101420] p-3 rounded-full"
						>
							<AiFillPlayCircle className="text-white mr-2" />
							<p className="text-white text-base font-semibold">Connected...</p>
						</button>
					) : (
						<button
							type="button"
							className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
							onClick={() => connectWallet()}
						>
							<AiFillPlayCircle className="text-white mr-2" />
							<p className="text-white text-base font-semibold">
								Connect Wallet
							</p>
						</button>
					)}

					<div className="flex items-center">
						<a
							href="https://testnets.opensea.io/collection/cartoonnfts"
							class="bg-purple-500 hover:bg-purple-400 border-b-4 border-purple-700 hover:border-purple-500 text-white text-white text-center py-1 px-3 rounded flex items-center mr-3"
						>
							OpenSea-Testnet
						</a>
						<a
							href="https://rinkeby.etherscan.io/address/0xa692643cecf2956f604abc2277df483b3fd78258"
							class="bg-purple-500 hover:bg-purple-400 border-b-4 border-purple-700 hover:border-purple-500 text-white text-white text-center py-1 px-3 rounded flex items-center"
						>
							EtherScan
						</a>
					</div>
				</div>

				<div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
					<div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
						<img src="/images/1.png" />

						<div className="h-[1px] w-full bg-gray-400 my-2" />
						<Input
							placeholder="Mint max upto 2 in a Tx"
							name="amount"
							type="number"
							handleChange={handleChange}
						/>

						<div className="h-[1px] w-full bg-gray-400 my-2" />

						{isLoading ? (
							<Loader />
						) : (
							<button
								type="button"
								onClick={handleSubmit}
								className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
							>
								Mint now
							</button>
						)}

						<Toaster position="top-center" reverseOrder={false} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
