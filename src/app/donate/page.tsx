import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CryptoDonation from "@/components/Donate/CryptoDonation";

export const metadata: Metadata = {
  title: "RighteousTA | Support Us",
  description:
    "RighteousTA is fully community-driven and we rely on donations to keep our servers running. Support us by donating cryptocurrency.",
};

const Donate = () => {
  const cryptoAddresses = [
    {
      name: "Bitcoin",
      address: "bc1qjlqyca5qt42vqruwl7s86szj5s66j2kcmuhyej",
      logo: "/images/QRCodes/BitcoinQR.png",
      qr: "/images/QRCodes/BitcoinQR.png",
    },
    {
      name: "Ethereum",
      address: "0x3FB0Fa8eac9809F843C2D6bE599C222aBdC9eE1d",
      logo: "/images/QRCodes/EthQR.png",
      qr: "/images/QRCodes/EthQR.png",
    },
    {
      name: "XRP",
      address: "rBV4HP4gHaQ72KmXetEXXMbpoU1qUs31ah",
      logo: "/images/QRCodes/XRPQR.png",
      qr: "/images/QRCodes/XRPQR.png",
    },
    {
      name: "Solana",
      address: "5kgyKNf5a2UftC61bErHyMjjNYzY2hizfxPTDzK4JczJ",
      logo: "/images/QRCodes/SolanaQR.png",
      qr: "/images/QRCodes/SolanaQR.png",
    },
    {
      name: "Hedera",
      address: "0.0.6827243",
      logo: "/images/QRCodes/HbarQR.png",
      qr: "/images/QRCodes/HbarQR.png",
    },
    {
      name: "Stellar",
      address: "GAP2OU6P5A5KTEDTMKHQ3UGOQ5JJMPYAKTYSJ6Z525CZ2UUJFCOYPESJ",
      logo: "/images/QRCodes/StellarQR.png",
      qr: "/images/QRCodes/StellarQR.png",
    },
  ];
  return (
    <DefaultLayout>
      <CryptoDonation cryptoAddresses={cryptoAddresses} />
    </DefaultLayout>
  );
};

export default Donate;
