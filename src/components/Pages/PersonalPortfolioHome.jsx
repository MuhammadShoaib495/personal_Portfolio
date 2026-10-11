import React, { useEffect, useState } from 'react';
import Hero11 from '../Hero/Hero11';
import SectionHeading from '../SectionHeading';
import ServiceList from '../ServiceList';
import Spacing from '../Spacing';
import Div from '../Div';
import Cta from '../Cta';
import FunFact from '../FunFact';
import { pageTitle } from '../../helper';
import Portfolio from '../Portfolio';
import { Icon } from '@iconify/react';
import TestimonialSlider from '../Slider/TestimonialSlider';
import MovingText2 from '../MovingText/MovingText2';
import './video-responsive.scss'
import CaseStudy from '../CaseStudy';
import Header from '../Header';
import ResumeSection from '../Resume/ResumeSection';
import SeoResults from '../seo/SeoResults';






const funfaceData = [
  {
    title: 'HTML5',
    factNumber: '90%',
  },
  {
    title: 'CSS3',
    factNumber: '95%',
  },
  {
    title: 'JavaScript',
    factNumber: '92%',
  },
  {
    title: 'WordPress',
    factNumber: '85%',
  },
   {
    title: 'Webflow',
    factNumber: '85%',
  },
  {
    title: 'Mysql Database',
    factNumber: '70%',
  },
];
const portfolioData = [
   {
    title: 'Vaconnect',
    subtitle: 'See Details Webflow Executive Virtual Assistant',
    href: 'https://www.vaconnect.co',
    src: '/images/Vaconnect-Home-Page.jpg',
    category: 'webflow_design',
  },
   {
    title: 'Sport',
    subtitle: 'See Details Webflow',
    href: 'http://sport64.webflow.io/',
    src: '/images/sport-64.jpg',
    category: 'webflow_design',

  },
   {
    title: 'Ibercia - 3d Website',
    subtitle: 'See Details Webflow (Still Dev)',
    href: 'http://jordan64.webflow.io/pop-up',
    src: '/images/materials.jpg',
    category: 'webflow_design',

  },
  {
    title: 'Jordan',
    subtitle: 'See Details Webflow',
    href: 'http://jordan64.webflow.io/',
    src: '/images/jump-man-jpg.jpg',
    category: 'webflow_design',

  },
   {
    title: 'NYC Furniture Assembly',
    subtitle: 'See Details Wordpress',
    href: 'https://nyc-furniture-assembly.com',
    src: '/images/nyc-furniture-assembly.png',
    category: 'wordpress_design',

  },
  {
    title: 'Real Estate',
    subtitle: 'See Details Wordpress',
    href: 'http://realestate.wmfcagency.com',
    src: '/images/realestate.png',
    category: 'wordpress_design',

  },
  {
    title: 'Ecommerce website',
    subtitle: 'See Details Wordpress',
    href: 'https://eshop.wmfcagency.com',
    src: '/images/Ecommerce-website.jpg',
    category: 'wordpress_design',

  },
  {
    title: '47 Consultant',
    subtitle: 'See Details Wordpress',
    href: 'https://47consultants.com/',
    src: '/images/47consultant.png',
    category: 'wordpress_design',

  },

  {
    title: 'Lawyer Appointment System',
    subtitle: 'See Details Wordpress',
    href: '/',
    src: '/images/Lawyer-Website.jpg',
    category: 'wordpress_design',

  },
  {
    title: 'Agency Website ',
    subtitle: 'See Details MERN',
    href: 'https://react-js-next-js-liard.vercel.app/',
    src: '/images/React_website.png',
    category: 'web_design',
  },
  {
    title: 'Creative Design Demo2',
    subtitle: 'See Details MERN',
    href: '/',
    src: '/images/Creative-Design.png',
    category: 'web_design',

  },
  {
    title: 'Weather App',
    subtitle: 'See Details',
    href: 'https://github.com/MuhammadShoaib495/weather_app',
    src: '/images/weather_app.png',
    category: 'mobile_apps',

  },
  {
    title: 'Foodi App',
    subtitle: 'See Details',
    href: 'https://github.com/MuhammadShoaib495',
    src: '/images/foodie_app.png',
    category: 'mobile_apps',

  },
  {
    title: 'Fintech',
    subtitle: 'See Details',
    href: 'https://github.com/MuhammadShoaib495',
    src: '/images/fintech.png',
    category: 'mobile_apps',

  },
  {
    title: 'Real Estate VR',
    subtitle: 'See Details',
    href: 'https://github.com/MuhammadShoaib495',
    src: '/images/realestate_vrr.png',
    category: 'mobile_apps',

  },
  {
    title: 'Business Consultants',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Business-Consultant.jpg',
    category: 'web_design',
  },
 
];
const categoryMenu = [
  {
    title: 'Web Design',
    category: 'web_design',
  }, 
  {
    title: 'Webflow',
    category: 'webflow_design',
  },
  {
    title: 'Wordpress',
    category: 'wordpress_design',
  },
];
const serviceData1 = [
  {
    title: 'Custom Coding',
    href: '',
  },
  {
    title: 'Webflow',
    href: '',
  },
  {
    title: 'Branding',
    href: '',
  },
];
const serviceData2 = [
  {
    title: 'SEO',
    href: '',
  },
  {
    title: 'Website design',
    href: '',
  },
  {
    title: 'Wordpress Developer',
    href: '',
  },
];

const educationData = [
  {
    title: 'CS 50 WEB DESIGN Python & JavaScript',
    subTitle: 'University Of Harvad | 2020',
  },
  {
    title: 'React Nextjs Developer',
    subTitle: 'Coursea | 2013 - 2015',
  },
  {
    title: 'Webflow Developer', 
    subTitle: 'FluxAcademy | 2018',
  },
  {
    title: 'Wordpress & SEO Marketing ',
    subTitle: 'Coursea | 2018',
  },
  {
    title: 'Figma UI/UX Design',
    subTitle: 'FluxAcademy | 2020',
  },
];

const experienceData = [
  {
    company: "OnPoint Vaconnect",
    companyDuration: "2025 – Present | Aurora Colorado USA",
    roles: [
      {
        title: "SEO Specialist",
        duration: "2025 – Present",
        description:
          "Improved organic search visibility through keyword research, on-page SEO, content optimization, and technical SEO. Generated 81 organic Google clicks and 2.01K impressions from U.S. users within the first 3 months.",
        link: "/case-study/vaconnect",
        linkText: "View Case Study",
      },
      {
        title: "Web Designer & Webflow Developer",
        duration: "2025 – Present",
        description:
          "Designed the website in Figma and developed it in Webflow, transforming a one-page website into a professional online presence that better represented the brand and its Executive Virtual Assistant services.",
        link: "/case-study/vaconnect",
        linkText: "View Case Study",
      },
    ],
  },
  {
  company: "47Consulting",
  companyDuration: "2024 – 2025 | Seattle, Washington USA",
  roles: [
    {
      title: "Web Designer & WordPress Developer",
      duration: "2024 – 2025",
      description:
        "Designed the website in Figma and developed it in WordPress for a video marketing agency. Created a professional, user-friendly website that clearly presented the agency’s video marketing services and strengthened its online presence. Also implemented basic SEO to improve search visibility.",
      link: "https://47consultants.com/",
      linkText: "Visit 47consulting",
    },
  ],
},
{
  company: "NYC Furniture Assembly",
  companyDuration: "2024 – 2025 | New York, USA",
  roles: [
    {
      title: "Web Designer & WordPress Developer",
      duration: "2024 – 2025",
      description:
        "Designed and developed a professional website for a furniture assembly service in New York. Focused on clear service presentation, user-friendly navigation, mobile responsiveness, and basic SEO to improve local search visibility and help potential customers find and contact the business.",
      link: "https://nyc-furniture-assembly.com",
      linkText: "Nyc furniture Assembly",
    },
  ],
},
];

const testimonials = [
  {
    id: 1,
    title: "OnPoint",
    src: "https://res.cloudinary.com/dpba9pmxn/video/upload/v1787334862/onpoint.mov",
  },
  {
    id: 2,
    title: "47 Consultants",
    // Replace with your Cloudinary URL after uploading the video
    src: "https://raw.githubusercontent.com/MuhammadShoaib495/personal_Portfolio/cb8ee084e474370dea5cd701962759c142acda6c/47consultants_1_3.mp4",
  },
  {
    id: 3,
    title: "Willbarber SEO & Marketing",
    // Replace with your Cloudinary URL after uploading the video
    src: "https://raw.githubusercontent.com/MuhammadShoaib495/personal_Portfolio/cb8ee084e474370dea5cd701962759c142acda6c/47consultants_1_5.mp4",
  },
];


export default function PersonalPortfolioHome() {
  pageTitle('Personal Portfolio');
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(6);

  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
  <Header />
      <Hero11
        introTitle="Hello, I am 👋"
        title="Muhammad Shoaib "
        subtitle="I build modern, high-converting websites and smart digital solutions that help businesses attract more visitors, generate leads, and grow online.Specializing in Web Design, Figma UI/UX, Webflow, WordPress, SEO, and AI Automation, I combine creative design with technology to create websites that don't just look great—they deliver results."
        btnLink="mailto:muhammadshoaib.w72@gmail.com"
        btnText="Contact"
        imgUrl="/images/Shoaib_large.png"
        experienceTitle="years experience in website Design"
        experienceNumber="07+"
        projectTitle="250+"
        projectNumber="Project completed"
      />
      {/* Start Services Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="My Providing Services"
          subtitle="Services"
          variant="cs-style1 text-center"
        />
        <Spacing lg="70" md="45" />
        <ServiceList variant="cs-style2" />
      </Div>
      <Spacing lg="120" md="50" />
      {/* End Services Section */}
      {/* End Service Section */}
      <section
        className="cs-bg"
        style={{ backgroundImage: 'url(images/funfact_bg.jpeg)' }}
      >
        <div className="container">
          <FunFact
            variant="cs-type2"
            title="My tech skills"
subtitle="I help businesses grow with modern, high-converting websites, SEO, and AI automation. From UI/UX design and Webflow or WordPress development to custom solutions and API integrations, I build digital experiences designed to attract, convert, and support more customers."
            data={funfaceData}
          />
        </div>
      </section>
      {/* Start Portfolio Section */}
      <Spacing lg="115" md="55" />
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
           <MovingText2 data={serviceData1} />
                      <Spacing lg="20" md="10" />
                      <MovingText2 reverseDirection data={serviceData2} />
          <SectionHeading title="Some recent work" subtitle="Our Portfolio" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === 'all' ? 'active' : ''}>
                <span onClick={() => setActive('all')}>All</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={active === item.category ? 'active' : ''}
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
        <Spacing lg="90" md="45" />
        <Div className="cs_portfolio_grid_2">
          {portfolioData.slice(0, itemShow).map((item, index) => (
            <Div
              className={`${
                active === 'all'
                  ? ''
                  : !(active === item.category)
                  ? 'd-none'
                  : ''
              }`}
              key={index}
            >
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
                variant="cs-style1 cs-type1"
              />
            </Div>
          ))}
        </Div>

        <Div className="text-center">
          {portfolioData.length <= itemShow ? (
            ''
          ) : (
            <>
              <Spacing lg="65" md="40" />
              <span
                className="cs-text_btn"
                onClick={() => setItemShow(itemShow + 4)}
              >
                <span>Load More</span>
                <Icon icon="bi:arrow-right" />
              </span>
            </>
          )}
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      {/* End Portfolio Section */}
       {/**Google Search Console */}
        <SeoResults />
 {/*End Google Search Console*/}
      {/* Start Resume Section */}
 <ResumeSection
  educationData={educationData}
  experienceData={experienceData}
/>
      {/* End Resume Section */}
  {/* Start Testimonial Section */}
          <section>
        <div className="cs-height_145 cs-height_lg_75" />
        <div className="container">
          <SectionHeading
            title="What clients say <br>about my skill"
            subtitle="Testimonial"
          />
          <div className="cs-height_90 cs-height_lg_45" />
          <TestimonialSlider />
          
        </div>
        <div className="cs-height_150 cs-height_lg_80" />
      </section>
     
      {/* End Testimonial Section */}
      {/* Case Study Section */}

<section>
        <div className="cs-height_145 cs-height_lg_75" />
        <div className="container">
          <SectionHeading
            title="Case Study <br>of my work"
            subtitle="Case Study"
          />
          <div className="cs-height_90 cs-height_lg_45" />
            <CaseStudy
                  title="VA Connect One Page to Marketing Website"
                  bgUrl="/images/case_study_img_3.jpeg"
                  href="/case-study/vaconnect"
                  variant="cs-style2"
                />
          
        </div>
        <div className="cs-height_150 cs-height_lg_80" />
      </section>
      

      {/* Start CTA Section */}
      <Cta
        title="Let’s discuss make <br />something <i>cool</i> together"
        btnText="Send Project Details"
        btnLink="mailto:muhammadshoaib.w72@gmail.com"
        bgSrc="/images/cta_bg_5.jpeg"
        variant="cs-type_1"
      />

    </>
  );
}
