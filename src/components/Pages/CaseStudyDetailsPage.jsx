import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../../data/caseStudies';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import './video-responsive.scss';
import ScrollLaptopVideo from '../Scrollanimation/ScrollMobileVideo';
import ScrollLaptopImage from '../Scrollanimation/ScrollLaptopImage';

export default function CaseStudyDetailsPage() {
  const { id } = useParams();

  // Find the correct case study
  const caseStudy = caseStudies.find(
    (cs) => String(cs.id) === String(id)
  );

  // Update browser title and scroll to top
  useEffect(() => {
    if (caseStudy) {
      pageTitle(caseStudy.title);
    }

    window.scrollTo(0, 0);
  }, [caseStudy]);

  // Prevent "Cannot read properties of undefined" errors
  if (!caseStudy) {
    return (
      <Div className="container text-center">
        <Spacing lg="145" md="80" />

        <h2 className="cs-font_38">
          Case Study Not Found
        </h2>

        <Spacing lg="30" md="20" />

        <p className="cs-m0">
          The case study you're looking for doesn't exist.
        </p>

        <Spacing lg="100" md="60" />
      </Div>
    );
  }

  return (
    <>
      {/* =====================================================
          HERO / PROJECT INTRO
      ====================================================== */}

      <Spacing lg="145" md="80" />

      <Div className="container">

        <SectionHeading
          title={caseStudy.title}
          subtitle={caseStudy.category}
          variant="cs-style1 text-center"
        />

        <Spacing lg="35" md="25" />

        {/* Project Information */}
        {caseStudy.meta && (
          <p className="text-center cs-m0">
            {caseStudy.meta}
          </p>
        )}

        <Spacing lg="80" md="45" />

        {/* Hero Image */}
       

        <Spacing lg="140" md="80" />
      </Div>

      <ScrollLaptopImage   imageSrc="/images/casestudy/vaconnect/onpoint_Dawnisha.jpg"  imageSrc2 =
    "/images/casestudy/vaconnect/onpoint_vaconnect_home.jpg"
  imageSrc3 = "/images/casestudy/vaconnect/onpoint_2.jpg"/>
      <Spacing lg="145" md="80" />


      {/* =====================================================
          PROJECT OVERVIEW
      ====================================================== */}

      <Div className="container">

        <h2 className="cs-font_38 text-center">
          Project Overview
        </h2>

        <Spacing lg="55" md="40" />

        <Div className="row">
          <Div className="col-lg-10 offset-lg-1">

            <p className="cs-m0">
              {caseStudy.overview}
            </p>

          </Div>
        </Div>

        <Spacing lg="70" md="45" />

        {/* Additional Project Images */}
        {caseStudy.images?.length > 1 && (
          <Div className="row">

            {caseStudy.images.slice(1).map((img, index) => (
              <Div
                className="col-sm-6 mb-4"
                key={index}
              >
                <img
                  src={img}
                  alt={`${caseStudy.title} ${index + 2}`}
                  className="w-100 cs-radius_5"
                />
              </Div>
            ))}

          </Div>
        )}

        <Spacing lg="140" md="80" />

      </Div>


      {/* =====================================================
          THE CHALLENGE
      ====================================================== */}

      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            The Challenge
          </h2>

          <Spacing lg="55" md="40" />

          <Div className="row">

            <Div className="col-lg-10 offset-lg-1">

              <p className="cs-m0">
                {caseStudy.challenge}
              </p>

            </Div>

          </Div>

          <Spacing lg="70" md="45" />

          {/* Challenge Cards */}
          {caseStudy.challengePoints?.length > 0 && (
            <Div className="row">

              {caseStudy.challengePoints.map(
                (item, index) => (
                  <Div
                    className="col-lg-6 mb-4"
                    key={index}
                  >

                    <Div className="p-4">

                      <h3 className="cs-font_30 cs-m0">
                        {item.title}
                      </h3>

                      <Spacing lg="20" md="15" />

                      <p className="cs-m0">
                        {item.description}
                      </p>

                    </Div>

                  </Div>
                )
              )}

            </Div>
          )}

          <Spacing lg="145" md="80" />

        </Div>

      </Div>


      {/* =====================================================
          PROJECT GOALS
      ====================================================== */}

      <Div className="container">

        <Spacing lg="145" md="80" />

        <h2 className="cs-font_38 text-center">
          Project Goals
        </h2>

        <Spacing lg="70" md="45" />

        {caseStudy.goals?.map(
          (goal, index) => (
            <Div
              className="row align-items-center mb-5"
              key={index}
            >

              <Div className="col-lg-2 text-center mb-5 ">

                <span className="cs-font_30">
                  {String(index + 1).padStart(2, '0')}
                </span>

              </Div>

              <Div className="col-lg-9 offset-lg-1">

                <h3 className="cs-font_30 cs-m0">
                  {goal.title}
                </h3>

                <Spacing lg="20" md="15" />

                <p className="cs-m0">
                  {goal.description}
                </p>

              </Div>

            </Div>
          )
        )}

        <Spacing lg="145" md="80" />

      </Div>


      {/* =====================================================
          DISCOVERY & STRATEGY
      ====================================================== */}

      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            Discovery & Strategy
          </h2>

          <Spacing lg="55" md="40" />

          <Div className="row">

            <Div className="col-lg-10 offset-lg-1">

              <p className="cs-m0">
                {caseStudy.strategy}
              </p>

            </Div>

          </Div>

          <Spacing lg="85" md="50" />

          {/* Research / Strategy Items */}
          <Div className="row g-4">
            {caseStudy.research?.map(
              (research, index) => (
                <Div className="col-lg-6" key={index}>
                  <Div className="h-100 p-4 cs-radius_15 cs-gradient_bg_2">
                    <h3 className="cs-font_30 cs-m0">
                      {research.title}
                    </h3>

                    <Spacing lg="30" md="20" />

                    <p className="cs-m0">
                      {research.description}
                    </p>
                  </Div>
                </Div>
              )
            )}
          </Div>

          <Spacing lg="145" md="80" />

        </Div>

      </Div>


      {/* =====================================================
          UX / INFORMATION ARCHITECTURE
      ====================================================== */}

      <Div className="container">

        <Spacing lg="145" md="80" />

        <h2 className="cs-font_38 text-center">
          UX & Information Architecture
        </h2>

        <Spacing lg="55" md="40" />

        <Div className="row">

          {/* BEFORE */}
          <Div className="col-lg-5">

            <h3 className="cs-font_30 cs-m0">
              Before
            </h3>

            <Spacing lg="25" md="20" />

            <p className="cs-m0">
              {caseStudy.beforeStructure}
            </p>

            <Spacing lg="60" md="25" />

                  {/* UX Image */}
        {caseStudy.uxImageBefore && (
          <img
            src={caseStudy.uxImageBefore}
            alt="UX information architecture"
            className="w-60 cs-radius_15"
          />
        )}
                     <Spacing lg="40" md="25" />


          </Div>



          <Div className="col-lg-2"></Div>


          {/* AFTER */}

          <Div className="col-lg-5">


            <h3 className="cs-font_30 cs-m0 mb-6">
              After
            </h3>

            <Spacing lg="25" md="20" />

            <p className="cs-m0">
              {caseStudy.afterStructure}
            </p>

            
            <Spacing lg="40" md="25" />

                  {/* UX Image */}
        {caseStudy.uxImageAfter && (
          <img
            src={caseStudy.uxImageAfter}
            alt="UX information architecture"
            className="w-100 cs-radius_15"
          />
        )}

          </Div>

        </Div>

        <Spacing lg="80" md="50" />

       
        <Spacing lg="145" md="80" />

      </Div>


      {/* =====================================================
          FIGMA / VISUAL DESIGN
      ====================================================== */}

      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            Designing the New Experience
          </h2>

          <Spacing lg="55" md="40" />

          <Div className="row">

            <Div className="col-lg-10 offset-lg-1">

              <p className="cs-m0">
                {caseStudy.designDescription}
              </p>

            </Div>

          </Div>

          <Spacing lg="75" md="45" />

          {/* Figma Images */}
          {caseStudy.designImages?.map(
            (image, index) => (

              <Div
                className="mb-5"
                key={index}
              >

                <img
                  src={image}
                  alt={`Figma design ${index + 1}`}
                  className="w-100 cs-radius_15"
                />

              </Div>

            )
          )}

          <Spacing lg="145" md="80" />

        </Div>

      </Div>


      {/* =====================================================
          RESPONSIVE DESIGN
      ====================================================== */}

      {caseStudy.responsiveImages?.length > 0 && (

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            Responsive Design
          </h2>

          <Spacing lg="55" md="40" />

          <Div className="row">

            {caseStudy.responsiveImages.map(
              (image, index) => (

                <Div
                  className="col-md-4 mb-4"
                  key={index}
                >

                  <img
                    src={image}
                    alt={`Responsive design ${index + 1}`}
                    className="w-100 cs-radius_15"
                    style={{
                      height: '500px',
                      width: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />

                </Div>

              )
            )}

          </Div>

          <Spacing lg="145" md="80" />

        </Div>

      )}


      {/* =====================================================
          MOTION & INTERACTION
      ====================================================== */}

      {caseStudy.video && (

        <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

          <Div className="cs-shape_2"></Div>
          <Div className="cs-shape_2"></Div>

          <Div className="container">

            <Spacing lg="145" md="80" />

            <h2 className="cs-font_38 text-center">
              Motion & Interaction Design
            </h2>

            <Spacing lg="45" md="30" />

            <Div className="row">

              <Div className="col-lg-10 offset-lg-1">

                <p className="cs-m0 text-center">
                  {caseStudy.motionDescription}
                </p>

              </Div>

            </Div>

            <Spacing lg="60" md="45" />

            {/* Website Video */}
        

            <Spacing lg="145" md="80" />

          </Div>

        </Div>

      )}


      {/* =====================================================
          WEBFLOW DEVELOPMENT
      ====================================================== */}

      <Div className="container">

        <Spacing lg="145" md="80" />

        <h2 className="cs-font_38 text-center">
          From Figma to Webflow
        </h2>

        <Spacing lg="55" md="40" />

        <Div className="row">

          <Div className="col-lg-10 offset-lg-1">

            <p className="cs-m0">
              {caseStudy.development}
            </p>

          </Div>

        </Div>

        <Spacing lg="70" md="45" />

        {caseStudy.developmentImages?.map(
          (image, index) => (

            <Div
              className="mb-5"
              key={index}
            >

              <img
                src={image}
                alt={`Webflow development ${index + 1}`}
                className="w-100 cs-radius_15"
              />

            </Div>

          )
        )}

        <Spacing lg="145" md="80" />

      </Div>


      {/* =====================================================
          SEO
      ====================================================== */}

      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            SEO & Organic Search
          </h2>

          <Spacing lg="55" md="40" />

          <Div className="row">

            <Div className="col-lg-10 offset-lg-1">

              <p className="cs-m0">
                {caseStudy.seo}
              </p>

            </Div>

          </Div>

          <Spacing lg="70" md="45" />

          {/* SEO Points */}
         {caseStudy.seoPoints?.map((item, index) => (
  <Div
    className="row align-items-center mb-4"
    key={index}
  >
    <Div className="col-lg-2 text-center mb-5 mb-lg-0">
      <span className="cs-font_30">
        {String(index + 1).padStart(2, "0")}
      </span>
    </Div>

    <Div className="col-lg-9 offset-lg-1">
      <h3 className="cs-font_30 cs-m0">
        {item.title}
      </h3>

      <Spacing lg="15" md="10" />

      <p className="cs-m0">
        {item.description}
      </p>
    </Div>
  </Div>
))}

          <Spacing lg="80" md="50" />

          {/* GSC Screenshot */}
          {caseStudy.gscImage && (
            <img
              src={caseStudy.gscImage}
              alt="Google Search Console results"
              className="w-100 cs-radius_15"
            />
          )}

          <Spacing lg="145" md="80" />

        </Div>

      </Div>


      {/* =====================================================
          RESULTS
      ====================================================== */}

      <Div className="container">

        <Spacing lg="145" md="80" />

        <h2 className="cs-font_38 text-center">
          Results
        </h2>

        <Spacing lg="55" md="40" />

        <Div className="row">

          <Div className="col-lg-10 offset-lg-1">

            <p className="cs-m0 text-center">
              {caseStudy.result}
            </p>

          </Div>

        </Div>

        <Spacing lg="70" md="45" />

        {/* Result Numbers */}
        {caseStudy.stats?.length > 0 && (

          <Div className="row text-center">

            {caseStudy.stats.map(
              (stat, index) => (

                <Div
                  className="col-md-4 mb-5"
                  key={index}
                >

                  <h3 className="cs-font_38 cs-m0">
                    {stat.value}
                  </h3>

                  <Spacing lg="15" md="10" />

                  <p className="cs-m0">
                    {stat.label}
                  </p>

                </Div>

              )
            )}

          </Div>

        )}

        <Spacing lg="40" md="25" />

      </Div>


      {/* =====================================================
          CLIENT TESTIMONIAL
      ====================================================== */}

      {caseStudy.testimonialVideo && (

        <Div className="cs-gradient_bg_1 cs-shape_wrap_6">

          <Div className="cs-shape_2"></Div>
          <Div className="cs-shape_2"></Div>

          <Div className="container">

            <Spacing lg="145" md="80" />

            <h2 className="cs-font_38 text-center">
              What the Client Had to Say
            </h2>

            <Spacing lg="35" md="25" />

            <p className="text-center">
              Hear directly from Dawnisha Taylor about
              her experience working on the project.
            </p>

            <Spacing lg="60" md="45" />

             {/* 3D SCROLL LAPTOP */}
              <ScrollLaptopVideo
      videoSrc={caseStudy.testimonialVideo}
      poster={caseStudy.testimonialPoster} />

            <Spacing lg="145" md="80" />

          </Div>

        </Div>

      )}


      {/* =====================================================
          BEFORE / AFTER
      ====================================================== */}

      {caseStudy.beforeAfterImages?.length > 0 && (

        <Div className="container">

          <Spacing lg="145" md="80" />

          <h2 className="cs-font_38 text-center">
            Before & After
          </h2>

          <Spacing lg="60" md="45" />

          <Div className="row">

            {caseStudy.beforeAfterImages.map(
              (image, index) => (

                <Div
                  className="col-md-6 mb-4"
                  key={index}
                >

                  <img
                    src={image}
                    alt={
                      index === 0
                        ? 'Original website'
                        : 'Redesigned website'
                    }
                    className="w-100 cs-radius_15"
                  />

                </Div>

              )
            )}

          </Div>

          <Spacing lg="145" md="80" />

        </Div>

      )}


      {/* =====================================================
          FINAL OUTCOME
      ====================================================== */}

      <Div className="container">

        <h2 className="cs-font_38 text-center">
          The Final Outcome
        </h2>

        <Spacing lg="55" md="40" />

        <Div className="row">

          <Div className="col-lg-10 offset-lg-1">

            <p className="cs-m0 text-center">
              {caseStudy.outcome}
            </p>

          </Div>

        </Div>

        <Spacing lg="80" md="50" />

        {/* Live Website Button */}
        {caseStudy.link && (

          <Div className="text-center">

            <a
              href={caseStudy.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn_primary"
            >
              View Live Website
            </a>

          </Div>

        )}

        <Spacing lg="145" md="80" />

      </Div>


      {/* =====================================================
          CTA
      ====================================================== */}

      <Div className="container">

        <Cta
          title="Let’s discuss and make <br />something <i>cool</i> together"
          btnText="Start a Project"
          btnLink="mailto:wmfcagency@gmail.com"
          bgSrc="/images/cta_bg.jpeg"
        />

      </Div>

      <Spacing lg="60" md="40" />

    </>
  );
}
