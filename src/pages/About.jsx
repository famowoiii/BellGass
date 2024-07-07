import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

function About() {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
      initClassName: false,
      animatedClassName: "animated",
    });
  }, []);

  return (
    <div className="container mx-auto p-6 my-9">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div data-aos="fade-right" data-aos-duration="1500">
          <h2 className="text-4xl font-semibold mb-4 text-center text-red">
            Welcome to BellGas
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-700">
            Welcome to BellGas, your trusted destination for all your gas refill
            and new purchase needs. Located in the heart of Bellingen,
            Australia, BellGas offers a wide range of gas products to suit every
            requirement. Whether you need a quick refill for your BBQ, a new
            cylinder for your home heating, or commercial gas solutions, we have
            you covered. At BellGas, we pride ourselves on providing top-notch
            customer service and convenient solutions. Our delivery and pickup
            services are designed to bring our products directly to your
            doorstep, saving you time and effort. Simply place your order online
            or give us a call, and our friendly team will ensure your gas is
            delivered promptly and safely.
          </p>
        </div>
        <div data-aos="fade-left" data-aos-duration="1500">
          <p className="text-lg leading-relaxed text-gray-700">
            Our extensive selection includes high-quality gas cylinders of
            various sizes and types, ensuring you find the perfect match for
            your needs. We partner with leading suppliers to guarantee that our
            products meet the highest standards of safety and reliability.
            Customer satisfaction is at the core of our business. We strive to
            make your experience with BellGas seamless and enjoyable. Our
            knowledgeable staff is always ready to assist you with any questions
            or concerns, providing expert advice to help you make informed
            decisions. Discover the BellGas difference today. Enjoy the
            convenience of our delivery and pickup services, competitive
            pricing, and exceptional customer support. Join the growing
            community of satisfied customers who trust BellGas for their gas
            needs in Bellingen and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
