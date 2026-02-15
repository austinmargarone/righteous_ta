"use client";

import { useEffect, useRef, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useEnsName, useBalance } from "wagmi";
import { formatUnits } from "viem";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const DropdownUser = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close on ESC
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  // Helpers
  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formattedBalance = balance
    ? `${Number(formatUnits(balance.value, balance.decimals)).toFixed(4)} ${balance.symbol}`
    : "0.00 ETH";

  return (
    <div className="relative">
      {isConnected ? (
        <button
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 md:gap-4"
        >
          {/* Jazzicon avatar – unique per wallet */}
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-primary/30 shadow-sm md:h-12 md:w-12">
            <Jazzicon diameter={48} seed={jsNumberForAddress(address!)} />
          </div>

          {/* Wallet info – more room & bolder */}
          <div className="hidden text-right md:block">
            <div className="text-lg font-semibold leading-tight text-black dark:text-white">
              {ensName || shortenAddress(address!)}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-0.5 text-sm font-medium">
              {formattedBalance}
            </div>
          </div>

          {/* Arrow */}
          <svg
            className="hidden fill-current md:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>
        </button>
      ) : (
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-opacity-90"
            >
              Connect Wallet
            </button>
          )}
        </ConnectButton.Custom>
      )}

      {/* Dropdown – fixed dark mode with your theme colors */}
      {isConnected && (
        <div
          ref={dropdown}
          className={`dark:shadow-dark absolute right-0 mt-4 w-72 overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
            dropdownOpen ? "block" : "hidden"
          }`}
        >
          {/* Wallet info header */}
          <div className="border-b border-stroke bg-gray px-6 py-5 dark:border-strokedark dark:bg-meta-4">
            <div className="text-lg font-semibold text-black dark:text-white">
              {ensName || shortenAddress(address!)}
            </div>
            <div className="mt-1 text-sm font-medium text-body dark:text-bodydark">
              {formattedBalance}
            </div>
          </div>

          {/* Menu items */}
          <ul className="flex flex-col">
            <li>
              <a
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium text-body transition-colors hover:bg-gray dark:text-bodydark dark:hover:bg-meta-4"
              >
                View on Etherscan
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(address!);
                  alert("Address copied to clipboard!");
                }}
                className="flex w-full items-center gap-3.5 px-6 py-4 text-sm font-medium text-body transition-colors hover:bg-gray dark:text-bodydark dark:hover:bg-meta-4"
              >
                Copy Address
              </button>
            </li>
          </ul>

          {/* Disconnect */}
          <div className="border-t border-stroke dark:border-strokedark">
            <button
              onClick={() => {
                disconnect();
                setDropdownOpen(false);
              }}
              className="hover:bg-red-50 flex w-full items-center gap-3.5 px-6 py-4 text-sm font-medium text-meta-1 transition-colors dark:text-meta-7 dark:hover:bg-meta-1/10"
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
