import React, { useEffect } from 'react';
import CaseStudy from '../CaseStudy';
import Cta from '../Cta';
import Div from '../Div';
import Hero3 from '../Hero/Hero3';
import LogoList from '../LogoList';
import MovingText from '../MovingText';
import Portfolio2 from '../Portfolio/Portfolio2';
import Portfolio3 from '../Portfolio/Portfolio3';
import SectionHeading from '../SectionHeading';
import TestimonialSlider from '../Slider/TestimonialSlider';
import Spacing from '../Spacing';
import { pageTitle } from '../../helper';

export default function CreativePortfolioHome() {
  pageTitle('Creative Portfolio');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const heroSocialLinks = [
    {
      name: 'Generate PDF',
      links: '/',
    },
    {
      name: 'In 10 Seconds',
      links: '/',
    },
  ];
  const portfolioData = [
    {
      title: 'Project report in Microsoft Word (.doc) format. The file is fully editable, so you can make any necessary modifications or additions before submitting or presenting the report.',
      subtitle: '.doc',
      btnText: 'Download Word File',
      btnLink: '/portfolio/portfolio-details',
      imageUrl: '/images/portfolio_35.jpeg',
      category: 'Editable File',
    },
    {
      title: 'Portable Document Format (.pdf) version of the report.',
      subtitle: '.pdf',
      btnText: 'Download PDF File',
      btnLink: '/portfolio/portfolio-details',
      imageUrl: '/images/portfolio_36.jpeg',
      category: 'PDF File',
    },
    {
      title: 'Report that checks for any instances of plagiarism in the project report. This is especially useful for students or professionals who want to ensure the originality and authenticity of their work.',
      subtitle: '.pdf',
      btnText: 'Downlaod Pagiarism Report',
      btnLink: '/portfolio/portfolio-details',
      imageUrl: '/images/portfolio_37.jpeg',
      category: 'Plagiarism Checked',
    },
    
    {
      title: 'List of all the sources cited in the project report, including books, articles, websites, and other materials. The bibliography is formatted according to the citation style specified by you and is an essential part of any academic or research report.',
      subtitle: '.doc',
      btnText: 'Downlaod References',
      btnLink: '/portfolio/portfolio-details',
      imageUrl: '/images/portfolio_37.jpeg',
      category: 'Reference File',
    },
  ];
  return (
    <>
      {/* Start Hero Section */}
      <Hero3
        title="Arino Creative <br />Portfolio"
        btnLink="contact"
        btnText={`Let's talk`}
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl="./images/hero_bg_4.jpeg"
      />
       

      {/* End Hero Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="80" />
      {portfolioData.map((item, index) =>
        index % 2 === 0 ? (
          <Div key={index}>
            <Portfolio2
              title={item.title}
              subtitle={item.subtitle}
              btnText={item.btnText}
              btnLink={item.btnLink}
              imageUrl={item.imageUrl}
              category={item.category}
            />
            <Spacing lg="100" md="70" />
          </Div>
        ) : (
          <Div key={index}>
            <Portfolio3
              title={item.title}
              subtitle={item.subtitle}
              btnText={item.btnText}
              btnLink={item.btnLink}
              imageUrl={item.imageUrl}
              category={item.category}
            />
            <Spacing lg="100" md="70" />
          </Div>
        ),
      )}
      {/* End Portfolio Section */}

      {/* Start Case Study Section */}
      <Spacing lg="45" md="10" />
      <Div className="container">
        <SectionHeading
          title="Enjoy your project!"
          subtitle="Download ZIP"
          variant="cs-style1 text-center"
        />
        <Spacing lg="90" md="45" />
      </Div>
      <CaseStudy
        title="Analysis lead <br /> more efficiently"
        bgUrl="/images/case_study_2.jpeg"
        href="/case-study/case-study-details"
        variant="cs-style2"
      />
      <CaseStudy
        title="Ubar food app <br /> case study"
        bgUrl="/images/case_study_1.jpeg"
        href="/case-study/case-study-details"
      />
      <Spacing lg="150" md="80" />
      {/* End Case Study Section */}

      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

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
          bgSrc="/images/cta_bg_3.jpeg"
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
