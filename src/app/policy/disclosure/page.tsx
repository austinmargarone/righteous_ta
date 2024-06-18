import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "RighteousTA | Not Financial Advice",
  description:
    "RighteousTA is a technial analysis website that provides information on the latest trends in the market.",
};

const NFA = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Not Financial Advice" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h2>RigheousTA</h2>
            <p className="py-[1.25rem]">
              By using our website, you hereby consent to our disclaimer and
              agree to its terms. The material on this website has no regard to
              the specific investment objectives, financial situation, or
              particular needs of any user. This website is presented solely for
              informational and entertainment purposes and is not to be
              construed as a recommendation, solicitation, or an offer to buy or
              sell / long or short any securities, commodities,
              cryptocurrencies, or any related financial instruments. Nor should
              any of its content be taken as investment advice.
              http://righteousta.com/ content is not a financial advisor. The
              views expressed in this video are completely speculative opinions
              and do not guarantee any specific result or profit. Trading and
              investing is extremely high risk and can result in the loss of all
              of your capital. Any opinions expressed in this video are subject
              to change without notice. http://righteousta.com/ is not under any
              obligation to update or keep current the information contained
              herein. http://righteousta.com/ may have an interest in the
              securities, commodities, cryptocurrencies, and/or derivatives of
              any entities referred to in this material. http://righteousta.com/
              accepts no liability whatsoever for any loss or damage of any kind
              arising out of the use of all or any part of this material.
              http://righteousta.com/ recommends that you consult with a
              licensed and qualified professional before making any investment
              or trading decisions.
            </p>
            <p>
              The content covered in this website is NOT to be considered as
              investment advice. I’m NOT a financial adviser. These are only my
              own personal and speculative opinions, ideas, theories,
              hypotheses, charts, technical analysis (TA), insights, curated
              news publications, and price prediction(s). The technical analysis
              in this website is completely speculative and does NOT guarantee
              any specific result or profit. The technical analysis in this
              website has NO proven rate of accuracy and past performance does
              NOT indicate future results. Do NOT trade or invest based upon the
              analysis presented on this website. Always do your own research
              and only invest solely based on your own findings and personal
              judgment after consulting with a professional/licensed financial
              adviser. I’ll never tell you what to do with your capital, trades,
              or investments. I’ll also never recommend for you to buy or sell
              any asset, security commodity, derivative, or
              cryptocurrency-related instrument. I’m NOT a broker. I DON’T
              recommend or endorse the use of any brokerages or trading exchange
              platforms. Trading and/or investing in cryptocurrency and/or any
              related commodities/securities/derivatives/instruments is
              extremely HIGH RISK and you can very easily lose all of your
              investment capital! You should always consult with a
              professional/licensed financial adviser before trading or
              investing in any asset, security, commodity, derivative, or
              cryptocurrency-related instrument! I will NOT be held liable for
              any of your personal trading or investing decisions or any
              losses/damages that you may incur if you decide to speculate in
              the market. This website is purely for entertainment purposes
              only!
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NFA;
