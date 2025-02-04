import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Language Movies */}
          <div>
            <h2 className="text-lg font-semibold mb-3">LANGUAGE MOVIES</h2>
            <ul className="space-y-2">
              {[
                "English movie",
                "Tamil movie",
                "Punjabi Movie",
                "Hindi movie",
                "Malyalam movie",
                "English Action movie",
                "Hindi Action movie",
              ].map((movie, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-400 text-sm mr-2">●</span>
                  <a href="#" className="hover:text-blue-400">
                    {movie}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Movies by Presenter */}
          <div>
            <h2 className="text-lg font-semibold mb-3">MOVIES BY PRESENTER</h2>
            <ul className="space-y-2">
              {[
                "Action movie",
                "Romantic movie",
                "Adult movie",
                "Comedy movie",
                "Drama movie",
                "Musical movie",
                "Classical movie",
              ].map((movie, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-400 text-sm mr-2">●</span>
                  <a href="#" className="hover:text-blue-400">
                    {movie}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Online */}
          <div>
            <h2 className="text-lg font-semibold mb-3">BOOKING ONLINE</h2>
            <ul className="space-y-2">
              {[
                "www.example.com",
                "www.hello.com",
                "www.example.com",
                "www.hello.com",
              ].map((link, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-400 text-sm mr-2">●</span>
                  <a href="#" className="hover:text-blue-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h2 className="text-lg font-semibold mb-3">App Available On</h2>
            <p className="text-sm mb-4">
              Download App and Get Free Movie Ticket!
            </p>
            <div className="flex space-x-4">
              <a href="#">
                <img
                  src="images/content/f1.jpg"
                  alt="footer_img"
                  className="w-24"
                />
              </a>
              <a href="#">
                <img
                  src="images/content/f2.jpg"
                  alt="footer_img"
                  className="w-24"
                />
              </a>
            </div>
            <h5 className="mt-4 text-yellow-400 font-semibold">
              <span className="text-lg">$50</span> Payback on App Download
            </h5>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>
            Copyright 2022-23{" "}
            <a href="#" className="text-blue-400">
              Movie Pro
            </a>
            . All rights reserved - Design by{" "}
            <a href="#" className="text-blue-400">
              Webstrot
            </a>
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fa fa-youtube-play"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
