"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center md:text-left">
        
        <div>
          <Image
            src="/images/freshcart-logo.svg"
            alt="FreshCart Logo"
            width={150}
            height={50}
            className="mx-auto md:mx-0 mb-4"
          />
          <p className="text-lg font-semibold text-green-700">
            Everything you love. All in one cart.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Categories</h4>
          <ul className="space-y-2">
            {[
              "Women's Fashion",
              "Baby & Toys",
              "Beauty & Health",
              "Electronics",
            ].map((cat) => (
              <li key={cat}>
                <Link
                  href="#"
                  className="text-gray-800 hover:!text-green-600 transition-colors duration-200 cursor-pointer"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[
              "About Us",
              "Contact",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-gray-800 hover:!text-green-600 transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-6 text-2xl">
            <Link
              href="#"
              className="text-gray-600 hover:!text-green-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebook />
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:!text-green-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram />
            </Link>
            <Link
              href="#"
              className="text-gray-600 hover:!text-green-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 mt-10 border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </footer>
  );
}
