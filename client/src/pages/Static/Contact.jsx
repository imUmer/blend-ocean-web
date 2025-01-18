import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
    <div className="p-6 text-center sm:text-start text-xs text-gray-300 sm:h-screen flex-1 py-12 px-6 sm:px-12">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-6">
        We’d love to hear from you! Please fill out the form below to get in
        touch with us.
      </p>
      <form className="grid gap-4 max-w-md">
        <input
          type="text"
          placeholder="Your Name"
          className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none"
        />
        <textarea
          placeholder="Your Message"
          className="py-2 px-4 bg-gray-700 rounded text-gray-300 focus:outline-none h-32 resize-none"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-lime-500 text-black rounded hover:bg-lime-600"
        >
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
};

export default Contact;