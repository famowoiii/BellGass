import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="shadow-inner lg:h-80 phone:min-h-fit flex phone:pt-10  items-end pb-4 bg-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 sm:mx-8 md:mx-32">
        <div className=" font-signika">
          <p className="text-lg text-red">BellGass</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3439.18259790959!2d152.91357797483235!3d-30.459265750635677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9c21f9156c22d1%3A0x8d943c42ee8d7c1c!2sFullers!5e0!3m2!1sid!2sid!4v1707474304604!5m2!1sid!2sid"
            width="200"
            height="150"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="font-signika">
          <p className="text-lg text-red">Contact Us</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            architecto.
          </p>
        </div>
        <div className="font-signika">
          <p className="text-lg text-red">Useful Links</p>
          <ul>
            <li>
              <Link to="/" className="hover:text-red duration-200">
                Home Page
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-red duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-red duration-200">
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
