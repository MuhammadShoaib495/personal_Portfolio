import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import TestimonialStyle2 from '../Testimonial/TestimonialStyle2';
 const testimonialData = [
    {
      testimonialThumb: '/images/Will-barber-copywriting.jpg',
      testimonialText:'WMFCAGENCY did a great job assisting me with putting together my own webpage for my personal business. His attention to detail was outstanding. He gives the best advice for the use of the proper links and buttons that will contribute to a boost for your business. I highly recommend WMFCAGENCY. for Web Development of a Personal or Company Webpage and Content Marketing.',
      avatarName: 'William BarBer',
      avatarDesignation: 'Branding',
      ratings: '5',
    },
    {
      testimonialThumb: '/images/team2.jpg',
      testimonialText:'WMFC is best in the Google Ads campaign, I got better result from them.',
      avatarName: 'Sarah',
      avatarDesignation: 'Clothing Brand Student',
      ratings: '4',
    },
    {
      testimonialThumb: '/images/team4.jpg',
      testimonialText:
        'If you looking Elegant web for your business. I strongly recommend WMFC.',
      avatarName: 'David',
      avatarDesignation: 'Body Fitness Owner.',
      ratings: '5',
    },
    {
      testimonialThumb: '/images/testimonial_3.jpeg',
      testimonialText:
      "I suffered from digital advertisement for long time ago. one day i saw expert digital marketers who are WMFC",
      avatarName: 'Ada Kanachki',
      avatarDesignation: 'Princpal of Dentist',
      ratings: '4.5',
    },

  ];


export default function TestimonialSliderStyle4() {
  /** Team Member Data **/

  /** Slider Settings **/
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
      {testimonialData.map((item, index) => (
        <Div key={index}>
          <TestimonialStyle2 {...item} />
        </Div>
      ))}
    </Slider>
  );
}
