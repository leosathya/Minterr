import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import { TransactionContext } from "../context/TransactionContext";

const NavBarItem = ({ title, classprops }) => (
	<li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = React.useState(false);
	const { currentWallet, connectWallet } = useContext(TransactionContext);
	return (
		<nav className="w-full flex md:justify-center justify-between items-center p-4">
			<div className="md:flex-[0.5] flex-initial justify-center items-center ">
				<div className="flex items-center">
					<h1 className="text-3xl text-gray-500 font-bold">Minterr</h1>
					<img
						src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
						alt="eth"
						className="h-10 ml-1.5"
					/>
				</div>
			</div>
			<ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
				{["Minted Nfts", "My Nfts", "WhitePaper"].map((item, index) => (
					<NavBarItem key={item + index} title={item} />
				))}
				{currentWallet.length ? (
					<li className=" py-2 px-7 mx-4 rounded-full bg-[#101420]">
						{currentWallet.slice(0, 5)}...
						{currentWallet.slice(currentWallet.length - 4)}
					</li>
				) : (
					<li
						className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
						onClick={() => connectWallet()}
					>
						Login
					</li>
				)}
			</ul>
			<div className="flex relative">
				{!toggleMenu && (
					<HiMenuAlt4
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(true)}
					/>
				)}
				{toggleMenu && (
					<AiOutlineClose
						fontSize={28}
						className="text-white md:hidden cursor-pointer"
						onClick={() => setToggleMenu(false)}
					/>
				)}
				{toggleMenu && (
					<ul
						className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
					>
						<li className="text-xl w-full my-2">
							<AiOutlineClose onClick={() => setToggleMenu(false)} />
						</li>
						{["Minted Nfts", "My Nfts", "WhitePaper"].map((item, index) => (
							<NavBarItem
								key={item + index}
								title={item}
								classprops="my-2 text-lg"
							/>
						))}
						{currentWallet.length ? (
							<li className=" py-2 px-7 mx-4 rounded-full bg-[#101420]">
								{currentWallet.slice(0, 5)}...
								{currentWallet.slice(currentWallet.length - 4)}
							</li>
						) : (
							<li
								className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
								onClick={() => connectWallet()}
							>
								Login
							</li>
						)}
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
