import React from "react";

const Contact = () => {
  return (
    <div className="p-6 bg-gray-800 text-gray-300">
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
  );
};

export default Contact;