import Link from 'next/link';
import '../policies.css';

export const metadata = {
  title: "Privacy Policy | Pythia Scorecard",
  description: "Learn how Pythia Scorecard collects, uses, and protects your personal information in compliance with our commitment to privacy and data security in retail AI analytics.",
  keywords: [
    "Pythia Scorecard privacy",
    "retail AI privacy policy",
    "data protection",
    "customer data privacy",
    "in-store analytics privacy",
    "audio intelligence privacy"
  ],
  openGraph: {
    title: "Privacy Policy | Pythia Scorecard",
    description: "Understand how Pythia Scorecard ensures the privacy and security of your data through our comprehensive privacy policy for retail AI analytics.",
    url: `${process.env.NEXT_PUBLIC_SITE}/privacy-policy`,
    siteName: "Pythia Scorecard",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pythia Scorecard Privacy Policy"
      }
    ],
    type: "website"
  }
};

export default function PrivacyPolicy() {
  return (
    <section className="px-4 sm:px-6 pt-10 sm:pt-14 lg:pt-[120px] pb-[96px] bg-[#f8fafc]">
      <div className="max-w-[1100px] mx-auto w-full min-w-0">
        <div className="mb-10 space-y-3 max-w-3xl">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
            Policies
          </span>
          <h1 className="text-[#0F172A] text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold tracking-tight leading-[1.05]">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-[13px] sm:text-[14px] font-medium">
            Last modified: July 2, 2025
          </p>
        </div>

        <div className="policyPage rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
          <div className="page-content">
        <p>
          <strong className="main">1. Introduction</strong>
          <strong>&nbsp;</strong>Pythia Store LLC (&ldquo;
          <strong>Pythia Store dba Pythia Scorecard</strong>,&rdquo; &ldquo;<strong>we,</strong>&rdquo; &ldquo;
          <strong>our</strong>,&rdquo; or &ldquo;<strong>us</strong>&rdquo;) respect your privacy and are committed to
          protecting it through our compliance with this policy. This policy describes the types of information we may
          collect from you or that you may provide when you visit the website&nbsp;
          <Link href="http://www.pythiascorecard.com/">http://www.pythiascorecard.com/</Link>
          &nbsp;
          <Link href=" http://app.pythiastore.ai "> http://app.pythiastore.ai</Link>
          &nbsp;(our &ldquo;<strong>Websites</strong>&rdquo;) and our practices for collecting, using, maintaining,
          protecting, and disclosing that information. This policy applies to information we collect:
        </p>
        <ul>
          <li>
            <p>On this Website.</p>
          </li>
          <li>
            <p>In email, text, and other electronic messages between you and this Website.</p>
          </li>
        </ul>
        <p>It does not apply to information collected by:</p>
        <ul>
          <li>
            <p>
              Us offline or through any other means, including on any other website operated by us or any third party
              (including our affiliates and subsidiaries); or
            </p>
          </li>
          <li>
            <p>
              Any third party (including our affiliates and subsidiaries), including through any application or content
              (including advertising) that may link to or be accessible from or through the Website.
            </p>
          </li>
        </ul>
        <p>
          Please read this policy carefully to understand our policies and practices regarding your information and how
          we will treat it. If you do not agree with our policies and practices, your choice is not to use our Website.
          By accessing or using this Website, you agree to this privacy policy. This policy may change from time to
          time. Your continued use of this Website after we make changes is deemed to be acceptance of those changes, so
          please check the policy periodically for updates.
        </p>
        <p>
          <strong className="main">2. Children Under the Age of 13</strong>
          <strong>&nbsp;</strong>Our Website is not intended for children under 13 years of age. No one under age 13 may
          provide any information to or on the Website. We do not knowingly collect personal information from children
          under 13. If you are under 13, do not use or provide any information on this Website or on or through any of
          its features. If we learn we have collected or received personal information from a child under 13 without
          verification of parental consent, we will delete that information. If you believe we might have any
          information from or about a child under 13, please contact us at:{' '}
          <Link href={'mailto:info@pythiascorecard.com'}>info@pythiascorecard.com</Link>.<u> </u>
        </p>
        <p>
          <strong className="main">3. Information We Collect About You and How We Collect It</strong>
          <strong>&nbsp;</strong>We collect several types of information from and about users of our Website, including
          information:
        </p>
        <ul>
          <li>
            <p>
              By which you may be personally identified, such as your name and email address (&ldquo;
              <strong>personal information</strong>&rdquo;);
            </p>
          </li>
          <li>
            <p>That is about you but individually does not identify you, such as aggregated information; and/or</p>
          </li>
          <li>
            <p>About your internet connection, the equipment you use to access our Website, and usage details.</p>
          </li>
        </ul>
        <p>We collect this information:</p>
        <ul>
          <li>
            <p>Directly from you when you provide it to us.</p>
          </li>
          <li>
            <p>
              Automatically as you navigate through the site. Information collected automatically may include usage
              details, IP addresses, and information collected through cookies and other tracking technologies.
            </p>
          </li>
        </ul>
        <p>
          <strong className="main">4. Information You Provide to Us</strong>
          &nbsp;The information we collect on or through our Website may include:
        </p>
        <ul>
          <li>
            <p>
              Information that you provide by filling in forms on our Website. We may also ask you for information when
              you report a problem with our Website.
            </p>
          </li>
          <li>
            <p>Records and copies of your correspondence (including email addresses), if you contact us.</p>
          </li>
        </ul>
        <p>
          You also may provide information to be published or displayed (hereinafter, &ldquo;<strong>posted</strong>
          &rdquo;) on public areas of the Website, or transmitted to other users of the Website or third parties
          (collectively, &ldquo;<strong>User Contributions</strong>&rdquo;). Your User Contributions are posted on and
          transmitted to others at your own risk. We cannot control the actions of other users of the Website with whom
          you may choose to share your User Contributions. Therefore, we cannot and do not guarantee that your User
          Contributions will not be viewed by unauthorized persons.
        </p>
        <p>
          <strong className="main">5. Information We Collect Through Automatic Data Collection Technologies</strong>
          As you navigate through and interact with our Website, we may use automatic data collection technologies to
          collect certain information about your equipment, browsing actions, and patterns, including:
        </p>
        <ul>
          <li>
            <p>
              Details of your visits to our Website, including traffic data, location data, logs, and other
              communication data and the resources that you access and use on the Website.
            </p>
          </li>
          <li>
            <p>
              Information about your computer and internet connection, including your IP address, operating system, and
              browser type.
            </p>
          </li>
        </ul>
        <p>
          The information we collect automatically is only statistical data and does not include personal information.
          It helps us to improve our Website and to deliver a better and more personalized service, including by
          enabling us to:
        </p>
        <ul>
          <li>
            <p>Estimate our audience size and usage patterns.</p>
          </li>
          <li>
            <p>
              Store information about your preferences, allowing us to customize our Website according to your
              individual interests.
            </p>
          </li>
          <li>
            <p>Speed up your searches.</p>
          </li>
          <li>
            <p>Recognize you when you return to our Website.</p>
          </li>
        </ul>
        <p>The technologies we use for this automatic data collection may include:</p>
        <ul>
          <li>
            <p>
              <strong>Cookies (or browser cookies)</strong>. A cookie is a small file placed on the hard drive of your
              computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser.
              However, if you select this setting you may be unable to access certain parts of our Website. Unless you
              have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you
              direct your browser to our Website.&nbsp;
            </p>
          </li>
        </ul>
        <p>
          We do not collect personal information automatically, but we may tie non-personal information collected
          automatically to personal information about you that we collect from other sources or that you provide to us.
        </p>
        <p>
          <strong className="main">6. Third-Party Use of Cookies and Other Tracking Technologies</strong>
          Some content or applications on the Website are served by third-parties, such as Google Analytics. These third
          parties may use cookies alone or in conjunction with web beacons or other tracking technologies to collect
          information about you when you use our Website. The information they collect may be associated with your
          personal information or they may collect information, including personal information, about your online
          activities over time and across different websites and other online services. They may use this information to
          provide you with interest-based (behavioral) advertising or other targeted content. We do not control these
          third parties&rsquo; tracking technologies or how they may be used. If you have any questions about an
          advertisement or other targeted content, you should contact the responsible provider directly.&nbsp;
        </p>
        <p>
          <strong className="main">7. How We Use Your Information</strong>
          We use information that we collect about you or that you provide to us, including any personal information:
        </p>
        <ul>
          <li>
            <p>To present our Website and its contents to you.</p>
          </li>
          <li>
            <p>To provide you with information, products, or services that you request from us.</p>
          </li>
          <li>
            <p>To fulfill any other purpose for which you provide it.</p>
          </li>
          <li>
            <p>
              To carry out our obligations and enforce our rights arising from any contracts entered into between you
              and us, including for billing and collection.
            </p>
          </li>
          <li>
            <p>To notify you about changes to our Website or any products or services we offer or provide though it.</p>
          </li>
          <li>
            <p>To allow you to participate in interactive features on our Website.</p>
          </li>
          <li>
            <p>In any other way we may describe when you provide the information.</p>
          </li>
          <li>
            <p>For any other purpose with your consent.</p>
          </li>
        </ul>
        <p>
          We may also use your information to contact you about goods and services that may be of interest to you. If
          you do not want us to use your information in this way, then please contact us at info@pythiascorecard.com or
          select &ldquo;UNSUBCRIBE.&rdquo;&nbsp;
        </p>
        <p>
          <strong className="main">8. Disclosure of Your Information</strong>
          We may disclose personal information that we collect or you provide as described in this privacy policy:
        </p>
        <ul>
          <li>
            <p>To our subsidiaries and affiliates.</p>
          </li>
          <li>
            <p>
              To contractors, service providers, and other third parties we use to support our business and who are
              bound by contractual obligations to keep personal information confidential and use it only for the
              purposes for which we disclose it to them.
            </p>
          </li>
          <li>
            <p>
              To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization,
              dissolution, or other sale or transfer of some or all of Pythia Store LLC&rsquo;s assets, whether as a
              going concern or as part of bankruptcy, liquidation, or similar proceeding, in which personal information
              held by Pythia Store LLC about our Website users is among the assets transferred.
            </p>
          </li>
          <li>
            <p>To fulfill the purpose for which you provide it.</p>
          </li>
          <li>
            <p>For any other purpose disclosed by us when you provide the information.</p>
          </li>
          <li>
            <p>With your consent.</p>
          </li>
        </ul>
        <p>We may also disclose your personal information:</p>
        <ul>
          <li>
            <p>
              To comply with any court order, law, or legal process, including to respond to any government or
              regulatory request.
            </p>
          </li>
          <li>
            <p>To enforce or apply our Terms of Use.</p>
          </li>
          <li>
            <p>
              If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of Pythia
              Store LLC, our customers, or others.
            </p>
          </li>
        </ul>
        <p>We may disclose aggregated information about our users without restriction.</p>
        <p>
          <strong className="main">9. Choices About How We Use and Disclose Your Information</strong>
          We strive to provide you with choices regarding the personal information you provide to us. We have created
          mechanisms to provide you with the following control over your information:
          <strong>
            <u>&nbsp;</u>
          </strong>
        </p>
        <ul>
          <li>
            <p>
              <strong>Tracking Technologies and Advertising.</strong>&nbsp;You can set your browser to refuse all or
              some browser cookies, or to alert you when cookies are being sent. If you disable or refuse cookies,
              please note that some parts of this site may then be inaccessible or not function properly.
            </p>
          </li>
        </ul>
        <p>
          We do not control third parties&rsquo; collection or use of your information to serve interest-based
          advertising. However these third parties may provide you with ways to choose not to have your information
          collected or used in this way. You can opt out of receiving targeted ads from members of the Network
          Advertising Initiative (&ldquo;<strong>NAI</strong>&rdquo;) on the NAI&rsquo;s&nbsp;
          <Link href="http://www.networkadvertising.org/managing/opt_out.asp">
            <u>website</u>
          </Link>
          .
        </p>
        <p>
          <strong className="main">10. Your State Privacy Rights</strong>
          State consumer privacy laws may provide their residents with additional rights regarding our use of their
          personal information. Depending on your state of residence, you may have rights such as:
        </p>
        <ul>
          <li>
            <p>The right to know what personal information we collect and how we use it.</p>
          </li>
          <li>
            <p>The right to request access to, correction of, or deletion of your personal information.</p>
          </li>
          <li>
            <p>The right to opt out of the sale or sharing of your personal information, if applicable.</p>
          </li>
        </ul>
        <p>
          <strong>The exact scope of these rights may vary by state.</strong>
          <strong>
            <u>&nbsp;</u>
          </strong>
          To exercise your rights under applicable state laws, or to learn more about how we handle personal
          information, please contact us at{' '}
          <Link href={'mailto:info@pythiascorecard.com'}>info@pythiascorecard.com</Link>. We will respond to your
          request in accordance with applicable law.
        </p>
        <p>
          <strong className="main">11. Changes to Our Privacy Policy</strong>
          It is our policy to post any changes we make to our privacy policy on this page with a notice that the privacy
          policy has been updated on the Website home page. If we make material changes to how we treat our users&rsquo;
          personal information, we will notify you via your primary email address on file. It is your responsibility to
          ensure that we have your current and accurate contact information. If your email address changes, please
          update your information promptly to avoid missing important notifications. We are not responsible for any
          missed communications due to outdated or incorrect contact details. The date the privacy policy was last
          revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active
          and deliverable email address for you, and for periodically visiting our Website and this privacy policy to
          check for any changes.
        </p>
        <p>
          <strong className="main">12. Contact Information</strong>
          To ask questions or comment about this privacy policy and our privacy practices, contact us at:
          <Link href={'mailto:info@pythiascorecard.com'}>info@pythiascorecard.com</Link>
        </p>
      </div>
        </div>
      </div>
    </section>
  );
}
