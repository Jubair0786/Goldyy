// app/contact/page.tsx
import React from 'react';

export default function Contact() {
  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="w-full border px-4 py-2 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
