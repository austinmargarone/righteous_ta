"use client";
import React, { useState } from "react";
import Image from "next/image";

interface CryptoAddress {
  name: string;
  address: string;
  logo: string;
  qr: string;
}

interface CryptoDonationProps {
  cryptoAddresses: CryptoAddress[];
}

const CryptoDonation: React.FC<CryptoDonationProps> = ({ cryptoAddresses }) => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [hoveredStates, setHoveredStates] = useState<{
    [key: string]: boolean;
  }>({});

  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates({ ...copiedStates, [name]: true });
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [name]: false });
    }, 2000);
  };

  const handleMouseEnter = (name: string) => {
    setHoveredStates({ ...hoveredStates, [name]: true });
  };

  const handleMouseLeave = (name: string) => {
    setHoveredStates({ ...hoveredStates, [name]: false });
  };

  return (
    <div className="rounded-lg bg-[#3C50E0] p-8 shadow-lg">
      <h2 className="mb-6 text-center text-3xl font-bold text-white">
        Support Us with Crypto
      </h2>
      <p className="mb-4 text-center text-sm text-white">
        Note: QR codes are blurred to prevent accidental scanning. Hover over a
        crypto tile to reveal and scan the correct QR code.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cryptoAddresses.map((crypto, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
            onMouseEnter={() => handleMouseEnter(crypto.name)}
            onMouseLeave={() => handleMouseLeave(crypto.name)}
          >
            <div className="mb-4 flex items-center">
              <h3 className="text-xl font-semibold">{crypto.name}</h3>
            </div>
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Image
                  src={crypto.qr}
                  alt={`${crypto.name} QR code`}
                  width={100}
                  height={100}
                  className={`transition-all duration-300 ${
                    hoveredStates[crypto.name] ? "" : "blur-md"
                  }`}
                />
                {!hoveredStates[crypto.name] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-black">Hover to reveal</span>
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <input
                type="text"
                value={crypto.address}
                readOnly
                className="border-gray-300 bg-gray-100 w-full rounded-md border p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={() => copyToClipboard(crypto.address, crypto.name)}
                className="text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 transform bg-white pl-1 transition-colors hover:text-indigo-600"
              >
                {copiedStates[crypto.name] ? "✓" : "Copy"}
              </button>
            </div>
            {copiedStates[crypto.name] && (
              <p className="mt-1 text-sm text-green-600">
                Copied to clipboard!
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoDonation;
