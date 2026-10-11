import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import Div from '../Div';
import Spacing from '../Spacing';
import './TestimonialSlider.scss';

const testimonials = [
  {
    id: 1,
    title: 'OnPoint',
    src: 'https://res.cloudinary.com/dpba9pmxn/video/upload/v1787334862/onpoint.mov',
    liveUrl: 'https://vaconnect.co',
    category: 'Web Design Figma & Webflow Development & SEO',
    description:
      'Designed the website in Figma and developed it in Webflow, transforming a one-page website into a professional online presence that better represented the brand and its Executive Virtual Assistant services.Improved organic search visibility through keyword research, on-page SEO, content optimization, and technical SEO. Generated 81 organic Google clicks and 2.01K impressions from U.S. users within the first 3 months.',
  },
  {
    id: 2,
    title: '47 Consultants',
    src: 'https://res.cloudinary.com/dpba9pmxn/video/upload/Willbarber-SEO-Marketing.mp4',
    liveUrl: 'https://47consultants.com',
    category: 'Web Design Figma & WordPress Development',
    description:
      'Designed the website in Figma and developed it in WordPress for a video marketing agency. Created a professional, user-friendly website that clearly presented the agency’s video marketing services and strengthened its online presence. Also implemented basic SEO to improve search visibility.',
  },
  {
    id: 3,
    title: 'Willbarber SEO & Marketing',
    src: 'https://raw.githubusercontent.com/MuhammadShoaib495/personal_Portfolio/cb8ee084e474370dea5cd701962759c142acda6c/47consultants_1_3.mp4',
    liveUrl: 'https://raw.githubusercontent.com/MuhammadShoaib495/personal_Portfolio/cb8ee084e474370dea5cd701962759c142acda6c/47consultants_1_5.mp4',
    category: 'SEO & Digital Marketing',
    description:
      'Designed the website in Figma and developed it in WordPress for a video marketing agency. Created a professional, user-friendly website that clearly presented the agency’s video marketing services and strengthened its online presence. Also implemented basic SEO to improve search visibility.',
  },
];

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 450,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  const goToPrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <Div className="cs-video-testimonials cs-gradient_bg_1">
      <Spacing lg="100" md="60" />
      <Spacing lg="55" md="35" />

      <Div className="cs-video-testimonial-card">
        <div className="cs-video-testimonial-content">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((video) => (
              <div key={video.id}>
                <div className="cs-video-testimonial-slide">
                  {/* Portrait video */}
                  <div className="cs-video-testimonial-media">
                    <video
                      key={video.src}
                      className="cs-video-testimonial-player"
                      controls
                      playsInline
                      preload="metadata"
                      onContextMenu={(e) => e.preventDefault()}
                      controlsList="nodownload"
                      aria-label={`${video.title} video testimonial`}
                    >
                       <source
                        src={video.src}
                        type='video/mp4'
            
                      />
                      Your browser does not support video playback.
                    </video>
                  </div>
                  {/* Client details */}
                  <div className="cs-video-testimonial-details">
                    <span className="cs-video-testimonial-label">
                      {video.category}
                    </span>

                    <h3>{video.title}</h3>
                    <p>{video.description}</p>

                    {/* Live website link */}
                    <a
                      href={video.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cs-video-testimonial-website-link"
                      aria-label={`Visit ${video.title} live website in a new tab`}
                    >
                      Visit Live Website
                      <Icon icon="bi:box-arrow-up-right" />
                    </a>

                    <div className="cs-video-testimonial-count">
                      <span>{String(video.id).padStart(2, '0')}</span>
                      <span className="cs-video-testimonial-count-line" />
                      <span>
                        {String(testimonials.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Slider navigation */}
        <div className="cs-video-testimonial-navigation">
          <button
            type="button"
            onClick={goToPrevious}
            disabled={activeIndex === 0}
            aria-label="Previous client testimonial"
            className="cs-video-testimonial-arrow"
          >
            <Icon icon="bi:arrow-left" />
          </button>

          <span className="cs-video-testimonial-nav-text">
            {String(activeIndex + 1).padStart(2, '0')}
            <span>/</span>
            {String(testimonials.length).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={goToNext}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next client testimonial"
            className="cs-video-testimonial-arrow"
          >
            <Icon icon="bi:arrow-right" />
          </button>
        </div>
      </Div>

      <Spacing lg="100" md="60" />
    </Div>
  );
}
