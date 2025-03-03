import React, { useEffect } from 'react';
import Card from '../Card';
import FunFact from '../FunFact';
import '../Hero/hero.scss';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Cta from '../Cta';
import LogoList from '../LogoList';
import MovingText from '../MovingText';
import PortfolioSlider from '../Slider/PortfolioSlider';
import PostSlider from '../Slider/PostSlider';
import TestimonialSlider from '../Slider/TestimonialSlider';
import TeamSlider from '../Slider/TeamSlider';
import VideoModal from '../VideoModal';
import TimelineSlider from '../Slider/TimelineSlider';
import { pageTitle } from '../../helper';
import Hero3 from '../Hero/Hero3';
import MovingText2 from '../MovingText/MovingText2';
import Hero5 from '../Hero/Hero5';
// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Youtube',
    links: 'https://www.linkedin.com/in/muhammadshoaib-flutter-fullstack-nodejs-sql/',
  },
  {
    name: 'Linkedin',
    links: 'https://www.linkedin.com/in/muhammadshoaib-flutter-fullstack-nodejs-sql/',
  },
];

// FunFact Data
const funfaceData = [
  {
    title: 'Global Happy Clients',
    factNumber: '40K',
  },
  {
    title: 'Project Completed',
    factNumber: '50K',
  },
  {
    title: 'Team Members',
    factNumber: '245',
  },
  {
    title: 'Digital products',
    factNumber: '550',
  },
];
const portfolioData = [
  {
    title: 'Restaurant Website',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Restaurant-website.png',
  },
  {
    title: 'Ecommerce website',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Ecommerce-website.jpg',
  },
  {
    title: 'Creative Design Demo',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Creative-Design-2.png',
  },
  {
    title: 'Lawyer Appointment System',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Lawyer-Website.jpg',
  },
  {
    title: 'Creative Design Demo2',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Creative-Design.png',
  },
  {
    title: 'Business Consultants',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: '/images/Business-Consultant.jpg',
  },
];

export default function Home() {
  pageTitle('Home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceData1 = [
    {
      title: 'UI/UX Design',
      href: '/service/service-details',
    },
    {
      title: 'Marketing',
      href: '/service/service-details',
    },
    {
      title: 'Branding',
      href: '/service/service-details',
    },
  ];
  const serviceData2 = [
    {
      title: 'SEO',
      href: '/service/service-details',
    },
    {
      title: 'App design',
      href: '/service/service-details',
    },
    {
      title: 'React Developer',
      href: '/service/service-details',
    },
  ];

  return (
    <>
      {/* Start Hero Section */}
       <Hero5
              title="Grow Your Business<br /> With Digital Strategy"
              subtitle="We deliver best problem solving solution for our client and provide finest finishing product in present and upcoming future."
              btnLink="contact"
              btnText="Get Quote"
              socialLinksHeading="Follow Us"
              heroSocialLinks={heroSocialLinks}
            />
      <Hero3
              title="WMFC AGENCY<br />Portfolio"
              btnLink="contact"
              btnText={`Let's talk`}
              socialLinksHeading="Follow Us"
              bgImageUrl="./images/hero_bg_4.jpeg"
            />
      {/* End Hero Section */}

      {/* Start FunFact Section */}
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our Results"
          subtitle="Grow your business with high-converting marketing and stunning web design. We craft strategies that drive leads, sales, and brand impact. Let’s turn clicks into customers—fast and effectively!"
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}

      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Services we can help you with"
                subtitle="What Can We Do"
                btnText="See All Services"
                btnLink="/service"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row">
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="UI/UX design"
                    link="/service/service-details"
                    src="/images/service_1.jpeg"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Web Development"
                    link="/service/service-details"
                    src="/images/service_2.jpeg"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Mobile App"
                    link="/service/service-details"
                    src="/images/service_5.jpeg"
                    alt="Mobile App Development"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Digital Marketing"
                    link="/service/service-details"
                    src="/images/service_4.jpeg"
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

       {/* Start Moving Text Section */}
            <MovingText2 data={serviceData1} />
            <Spacing lg="20" md="10" />
            <MovingText2 reverseDirection data={serviceData2} />
            {/* End Moving Text Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="50" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Web Portfolio to explore"
            subtitle="Latest Projects"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider portfolioData={portfolioData} />
      </Div>

      
      {/* End Portfolio Section */}

      {/* Start Awards Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="We get multiple awards"
                subtitle="Our Awards"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider />
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Awards Section */}

      {/* Start Video Block Section */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          Our agile process is ability to adapt and respond to change. Agile
          organizations view change as an opportunity, not a threat.
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="https://www.youtube.com/watch?v=0vdl9oXEA_I"
          bgUrl="/images/video_bg.jpeg"
        />
      </Div>
      {/* End Video Block Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Awesome team <br/>members"
          subtitle="Our Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Team Section */}

      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

      {/* Start Blog Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Explore recent publication"
                subtitle="Our Blog"
                btnText="View More Blog"
                btnLink="/blog"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Our reputed world wide partners" />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End LogoList Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let’s disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
