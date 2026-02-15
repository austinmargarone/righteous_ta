import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "RighteousTA | Terms of Service",
  description:
    "RighteousTA is a technical analysis website that provides information on the latest trends in the market.",
};

const Terms = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Terms of Service" />
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke bg-gray-2 px-6 py-4 dark:border-strokedark dark:bg-meta-4">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Terms of Service
            </h2>
            <p className="mt-1 text-sm text-body dark:text-bodydark">
              Last updated: February 15, 2026
            </p>
          </div>

          <div className="p-6">
            <div className="mb-6 rounded-lg border-l-4 border-primary bg-primary/10 p-4">
              <p className="text-sm text-body dark:text-bodydark">
                By accessing and using RighteousTA, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to these terms, please do not use this website.
              </p>
            </div>

            <div className="space-y-6">
              {/* Section 1 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  1. Acceptance of Terms
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    By accessing RighteousTA ("the Website"), you agree to
                    comply with and be bound by these Terms of Service. These
                    terms apply to all visitors, users, and others who access or
                    use the Website.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  2. Use of Service
                </h3>
                <div className="space-y-3 text-body dark:text-bodydark">
                  <p>
                    You agree to use the Website only for lawful purposes and in
                    accordance with these Terms. You agree not to:
                  </p>
                  <ul className="ml-6 space-y-2">
                    <li className="list-disc">
                      Use the Website in any way that violates any applicable
                      federal, state, local, or international law or regulation
                    </li>
                    <li className="list-disc">
                      Engage in any conduct that restricts or inhibits anyone's
                      use or enjoyment of the Website
                    </li>
                    <li className="list-disc">
                      Attempt to gain unauthorized access to any portion of the
                      Website or any other systems or networks
                    </li>
                    <li className="list-disc">
                      Use any automated system, including "robots," "spiders,"
                      or "scrapers" to access the Website without our express
                      written permission
                    </li>
                    <li className="list-disc">
                      Transmit any viruses, malware, or other harmful code
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  3. Intellectual Property Rights
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    The Website and its entire contents, features, and
                    functionality (including but not limited to all information,
                    software, text, displays, images, video, audio, charts, and
                    technical analysis) are owned by RighteousTA and are
                    protected by United States and international copyright,
                    trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                  <p>
                    You may not reproduce, distribute, modify, create derivative
                    works of, publicly display, publicly perform, republish,
                    download, store, or transmit any of the material on our
                    Website without our prior written consent.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  4. User Accounts
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    If you create an account on the Website, you are responsible
                    for maintaining the confidentiality of your account and
                    password. You agree to accept responsibility for all
                    activities that occur under your account.
                  </p>
                  <p>
                    We reserve the right to suspend or terminate your account at
                    any time if we believe you have violated these Terms of
                    Service.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  5. Content and Information Disclaimer
                </h3>
                <div className="space-y-2 rounded-lg bg-warning/5 p-4 text-body dark:text-bodydark">
                  <p>
                    <strong className="text-warning">IMPORTANT:</strong> All
                    content on RighteousTA, including technical analysis,
                    charts, predictions, and market insights, is provided for
                    informational and educational purposes only.
                  </p>
                  <p>
                    This content does not constitute financial advice,
                    investment advice, trading advice, or any other sort of
                    advice. You should not treat any of the Website's content as
                    such. RighteousTA does not recommend that any
                    cryptocurrency, security, commodity, or derivative should be
                    bought, sold, or held by you.
                  </p>
                  <p>
                    Always conduct your own due diligence and consult with a
                    licensed financial advisor before making any investment
                    decisions.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  6. Third-Party Links and Services
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    The Website may contain links to third-party websites or
                    services that are not owned or controlled by RighteousTA. We
                    have no control over, and assume no responsibility for, the
                    content, privacy policies, or practices of any third-party
                    websites or services.
                  </p>
                  <p>
                    You acknowledge and agree that RighteousTA shall not be
                    responsible or liable for any damage or loss caused by or in
                    connection with the use of any such third-party content,
                    goods, or services.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  7. Limitation of Liability
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO
                    EVENT SHALL RIGHTEOUSTA, ITS AFFILIATES, DIRECTORS,
                    EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                    SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING
                    WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR
                    OTHER INTANGIBLE LOSSES, RESULTING FROM:
                  </p>
                  <ul className="ml-6 space-y-2">
                    <li className="list-disc">
                      Your access to or use of or inability to access or use the
                      Website
                    </li>
                    <li className="list-disc">
                      Any conduct or content of any third party on the Website
                    </li>
                    <li className="list-disc">
                      Any trading or investment decisions made based on
                      information from the Website
                    </li>
                    <li className="list-disc">
                      Unauthorized access, use, or alteration of your
                      transmissions or content
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  8. Disclaimer of Warranties
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    THE WEBSITE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                    BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                    IMPLIED. RIGHTEOUSTA DISCLAIMS ALL WARRANTIES, INCLUDING BUT
                    NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                  <p>
                    We do not warrant that the Website will be uninterrupted,
                    secure, or error-free, or that any defects will be
                    corrected.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  9. Indemnification
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    You agree to defend, indemnify, and hold harmless
                    RighteousTA and its affiliates from and against any claims,
                    damages, obligations, losses, liabilities, costs, or
                    expenses arising from:
                  </p>
                  <ul className="ml-6 space-y-2">
                    <li className="list-disc">Your use of the Website</li>
                    <li className="list-disc">
                      Your violation of these Terms of Service
                    </li>
                    <li className="list-disc">
                      Your violation of any third-party rights, including
                      intellectual property rights
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 10 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  10. Privacy Policy
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    Your use of the Website is also governed by our Privacy
                    Policy. Please review our Privacy Policy to understand our
                    practices regarding the collection and use of your
                    information.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  11. Changes to Terms
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    We reserve the right to modify or replace these Terms of
                    Service at any time at our sole discretion. If a revision is
                    material, we will provide at least 30 days' notice prior to
                    any new terms taking effect.
                  </p>
                  <p>
                    Your continued use of the Website after any changes to these
                    Terms constitutes acceptance of those changes.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  12. Governing Law
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    These Terms shall be governed and construed in accordance
                    with the laws of the United States, without regard to its
                    conflict of law provisions.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  13. Severability
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    If any provision of these Terms is held to be unenforceable
                    or invalid, such provision will be changed and interpreted
                    to accomplish the objectives of such provision to the
                    greatest extent possible under applicable law, and the
                    remaining provisions will continue in full force and effect.
                  </p>
                </div>
              </section>

              {/* Section 14 */}
              <section>
                <h3 className="mb-3 text-lg font-semibold text-black dark:text-white">
                  14. Contact Information
                </h3>
                <div className="space-y-2 text-body dark:text-bodydark">
                  <p>
                    If you have any questions about these Terms of Service,
                    please contact us through our website contact form or at the
                    email address provided on our contact page.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Acknowledgment Box */}
        <div className="rounded-sm border border-stroke bg-gray-2 p-6 shadow-default dark:border-strokedark dark:bg-meta-4">
          <h3 className="mb-2 font-semibold text-black dark:text-white">
            Acknowledgment
          </h3>
          <p className="text-sm text-body dark:text-bodydark">
            By using RighteousTA, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Service. If you
            do not agree with any part of these terms, you must not use our
            Website.
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Terms;
