import React from "react";
import "./contactAdmin.css";
export default function ContactAdmin() {
  return (
    <div>
      <div className="containerForm">
        <h1>Hãy nêu lên suy nghĩ của bạn</h1>
        <form target="_blank" action="https://formsubmit.co/" method="POST">
          <div className="max-w-md mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-2xl text-sky-900 font-bold mb-6">
              Góp Ý của bạn là gì?
            </h2>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                for="name"
              >
                Full Name
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="text"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                for="email"
              >
                Email Address
              </label>
              <input
                className="mt-1 p-2 w-full border rounded-md"
                name="email"
                id="email"
                type="email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                for="bio"
              >
                Opinion
              </label>
              <textarea
                className="mt-1 p-2 w-full border rounded-md"
                rows="3"
                name="Opinion"
                id="bio"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button className="buttonForm" type="submit">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
