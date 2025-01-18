import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 bg-gray-800 text-gray-300">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At Blend Ocean, we take your privacy seriously. This policy outlines how
        we handle your data.
      </p>

      <h2 className="text-2xl font-semibold mb-2">License</h2>
      <p className="mb-4">
        Our content is available for use under the CCO license, meaning you can
        use it for any purpose, including commercial projects, without any
        restrictions.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Who Are We?</h2>
      <p className="mb-4">
        At Blend Ocean, we provide top-quality 3D models, textures, and HDRIs
        for various projects. With our easy-to-use platform, you can download
        assets in high resolution (up to 4K) without registration or payment.
      </p>

      <h2 className="text-2xl font-semibold mb-2">What is CCO?</h2>
      <p className="mb-4">
        All of our content is created for public usage under the CCO license.
        <a
          href="https://creativecommons.org/publicdomain/zero/1.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 underline"
        >
          Learn more here.
        </a>{" "}
        or visit{" "}
        <a
          href="https://wiki.creativecommons.org/wiki/CCO_FAQ"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 underline"
        >
          CCO FAQ
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
      <p className="mb-4">
        Some of our models, textures, or other assets may contain copyrighted
        designs (e.g., brand names or logos). It is the user’s responsibility to
        ensure that the use of these assets does not infringe on any copyrights.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Third-Party Cookies</h2>
      <p className="mb-4">
        We use cookies and technologies from third-party vendors, including
        Google, to serve ads based on your browsing history. Vendors may
        collect information to personalize ads.
      </p>
      <p>
        For more information, review{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lime-500 underline"
        >
          Google’s Privacy Policy
        </a>
        . If you prefer not to receive personalized ads, adjust your Ads
        settings or use an ad-blocking tool.
      </p>
    </div>
  );
};

export default PrivacyPolicy;