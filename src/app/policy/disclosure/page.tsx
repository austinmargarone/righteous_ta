import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "RighteousTA | Not Financial Advice",
  description:
    "RighteousTA is a technical analysis website that provides information on the latest trends in the market.",
};

const NFA = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Not Financial Advice" />
      <div className="flex flex-col gap-6">
        {/* Main Disclaimer Box */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke bg-gray-2 px-6 py-4 dark:border-strokedark dark:bg-meta-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Legal Disclaimer
            </h2>
            <p className="mt-1 text-sm text-body dark:text-bodydark">
              Important information about using RighteousTA
            </p>
          </div>

          <div className="p-6">
            {/* Warning Banner */}
            <div className="mb-6 rounded-lg border-l-4 border-warning bg-warning/10 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-6 w-6 flex-shrink-0 text-warning"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <h3 className="font-semibold text-warning">
                    NOT FINANCIAL ADVICE
                  </h3>
                  <p className="mt-1 text-sm text-body dark:text-bodydark">
                    All content is for informational and entertainment purposes
                    only. Always consult a licensed financial advisor before
                    making any investment decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div className="space-y-6">
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  What This Website Is
                </h3>
                <ul className="space-y-2 text-body dark:text-bodydark">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Educational content about technical analysis and market
                      trends
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>
                      Personal opinions, theories, and speculative analysis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-primary">•</span>
                    <span>Entertainment and informational purposes only</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  What This Website Is NOT
                </h3>
                <ul className="space-y-2 text-body dark:text-bodydark">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-danger">✗</span>
                    <span>Financial advice or investment recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-danger">✗</span>
                    <span>A licensed financial advisory service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-danger">✗</span>
                    <span>
                      A solicitation to buy, sell, long, or short any securities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-danger">✗</span>
                    <span>A guarantee of any specific results or profits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-danger">✗</span>
                    <span>A broker or trading platform recommendation</span>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Important Risk Warnings
                </h3>
                <div className="space-y-3 rounded-lg bg-danger/5 p-4 text-body dark:text-bodydark">
                  <p>
                    <strong className="text-danger">HIGH RISK:</strong> Trading
                    and investing in cryptocurrencies, securities, commodities,
                    and derivatives is extremely high risk and can result in the
                    total loss of your capital.
                  </p>
                  <p>
                    <strong className="text-danger">NO GUARANTEES:</strong> Past
                    performance does not indicate future results. Technical
                    analysis has no proven rate of accuracy and is completely
                    speculative.
                  </p>
                  <p>
                    <strong className="text-danger">
                      YOUR RESPONSIBILITY:
                    </strong>{" "}
                    Always do your own research and consult with a licensed
                    financial advisor before making any trading or investment
                    decisions.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Liability and Terms
                </h3>
                <div className="space-y-3 text-sm text-body dark:text-bodydark">
                  <p>By using RighteousTA, you agree that:</p>
                  <ul className="ml-6 space-y-2">
                    <li className="list-disc">
                      The material on this website has no regard to your
                      specific investment objectives, financial situation, or
                      particular needs
                    </li>
                    <li className="list-disc">
                      All opinions expressed are subject to change without
                      notice and we are under no obligation to update
                      information
                    </li>
                    <li className="list-disc">
                      RighteousTA may have an interest in securities,
                      commodities, cryptocurrencies, or derivatives mentioned on
                      this site
                    </li>
                    <li className="list-disc">
                      RighteousTA accepts no liability whatsoever for any loss
                      or damage arising from the use of any part of this
                      material
                    </li>
                    <li className="list-disc">
                      RighteousTA will not be held liable for any of your
                      personal trading or investing decisions or any
                      losses/damages you may incur
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  Our Recommendation
                </h3>
                <div className="rounded-lg border border-success bg-success/10 p-4">
                  <p className="text-body dark:text-bodydark">
                    <strong className="text-success">
                      Always consult with a licensed and qualified financial
                      professional
                    </strong>{" "}
                    before making any investment or trading decisions. Use this
                    website for educational purposes and do your own thorough
                    research.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Summary Box */}
        <div className="rounded-sm border border-stroke bg-gray-2 p-6 shadow-default dark:border-strokedark dark:bg-meta-4">
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            In Simple Terms
          </h3>
          <p className="text-sm text-body dark:text-bodydark">
            RighteousTA provides technical analysis, charts, and market insights
            purely for educational and entertainment purposes. We are not
            financial advisors, and nothing on this site should be considered
            investment advice. Trading is risky, you can lose money, and you're
            solely responsible for your own decisions. Always consult a
            professional before investing.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NFA;
