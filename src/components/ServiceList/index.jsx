import React, { useState } from "react";
import { Link } from "react-router-dom";
import Div from "../Div";
import "./servicelist.scss";

export default function ServiceList() {
  const serviceData = [
    {
      title: "WordPress Development",
      subtitle:
        "I have expertise in WordPress for designing fast-loading, SEO-optimized websites, Ecommerce stores, and custom business solutions for small businesses.",
      imgUrl: "/images/wordpress-logo.jpg",
      sectionId: "wordpressSection",
    },
    {
      title: "Digital Ads/SEO",
      subtitle:
        "I run high-converting digital ad campaigns on Google and Facebook to drive leads and sales. My goal is to deliver impactful solutions that help businesses grow and thrive in the digital space.",
      imgUrl: "/images/google_ads.webp",
      sectionId: "adsSection",
    },
    {
      title: "Webflow Development",
      subtitle:
        "I have expertise in Webflow for designing fast-loading, SEO-optimized websites, Ecommerce stores, and custom business solutions for small businesses.",
      imgUrl: "/images/webflow-logo.jpg",
      sectionId: "wordpressSection",
    },
  ];

  const [active, setActive] = useState(0);
  const handelActive = (index) => {
    setActive(index);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Div className="cs-iconbox_3_list">
      {serviceData.map((item, index) => (
        <Div
          className={`cs-hover_tab ${active === index ? "active" : ""}`}
          key={index}
          onMouseEnter={() => handelActive(index)}
        >
          <Link
            to={`#${item.sectionId}`}
            className="cs-iconbox cs-style3"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.sectionId);
            }}
          >
            <>
              <Div className="cs-image_layer cs-style1 cs-size_md">
                <Div className="cs-image_layer_in">
                  <img
                    src={item.imgUrl}
                    alt="Thumb"
                    className="w-100 cs-radius_15"
                  />
                </Div>
              </Div>
              <span className="cs-iconbox_icon cs-center">
                <svg
                  width={30}
                  height={29}
                  viewBox="0 0 30 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <Div className="cs-iconbox_in">
                <h2 className="cs-iconbox_title">{item.title}</h2>
                <Div className="cs-iconbox_subtitle">{item.subtitle}</Div>
              </Div>
            </>
          </Link>
        </Div>
      ))}
    </Div>
  );
}
/*/ {
      title: "Reactjs & Nodejs",
      subtitle:
        "I have expertise in React and Node.js for building fast, scalable, and SEO-friendly web applications, integrating APIs, and developing custom solutions for small businesses and enterprises.",
      imgUrl: "/images/react.png",
      sectionId: "reactNodeSection",
    },
    {
      title: "Flutter Apps",
      subtitle:
        "I have expertise in Flutter for building high-performance, scalable, and visually appealing mobile apps with seamless API integration and custom solutions for businesses.",
      imgUrl: "/images/flutter_logo.png",
      sectionId: "flutterSection",
    },{}*/
