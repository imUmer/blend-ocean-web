import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-6 bg-gray-800 text-gray-300">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        By using our website, you agree to the following terms and conditions.
        Please read them carefully.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Cookies & Data Retention</h2>
      <p className="mb-4">
        By logging in with your Patreon account on our website, you have the
        option to access exclusive perks and benefits as an active patron.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          We only collect necessary information, such as your name, email, and
          patron status.
        </li>
        <li>
          This information is saved in cookies for 24 hours for your
          convenience.
        </li>
        <li>
          We do not have access to your password or payment information, and any
          data collected will be automatically deleted if your patron status is
          deactivated.
        </li>
      </ul>
      <p>
        You can update your personal information in your Patreon account at any
        time.{" "}
        <a
          href="https://www.patreon.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 underline"
        >
          View Patreon’s Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default TermsAndConditions;