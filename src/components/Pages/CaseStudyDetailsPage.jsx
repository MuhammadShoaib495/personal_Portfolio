import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../../data/caseStudies';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import Div from '../Div';
import PageHeading from '../PageHeading';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';

export default function CaseStudyDetailsPage() {
  const { id } = useParams();
  const caseStudy = caseStudies.find((cs) => cs.id === id);

  // ✅ Hooks always called unconditionally
  useEffect(() => {
    if (caseStudy) {
      pageTitle(caseStudy.title);
    }
    window.scrollTo(0, 0);
  }, [caseStudy]);

  return (
    <>
      {/* Page Hero */}
      <PageHeading
        title={caseStudy.title}
        bgSrc={caseStudy.heroImage || '/images/contact_hero_bg.jpeg'}
        pageLinkText={caseStudy.title}
      />
      <Spacing lg="145" md="80" />

      {/* Case Study Intro */}
      <Div className="container">
        <SectionHeading
          title={caseStudy.title}
          subtitle={caseStudy.category}
          variant="cs-style1 text-center"
        />
        <Spacing lg="90" md="45" />

        <img
          src={caseStudy.images[0]}
          alt="Thumb"
          className="w-100 cs-radius_15"
        />
        <Spacing lg="140" md="80" />

        <h2 className="cs-font_38 text-center">Case Study Overview</h2>
        <Spacing lg="60" md="45" />
        <p className="cs-m0">{caseStudy.overview}</p>
        <Spacing lg="65" md="45" />

        <Div className="row">
          {caseStudy.images.slice(1, 3).map((img, idx) => (
            <Div className="col-sm-6" key={idx}>
              <img src={img} alt={`Thumb ${idx}`} className="w-100 cs-radius_5" />
              <Spacing lg="25" md="25" />
            </Div>
          ))}
        </Div>
        <Spacing lg="125" md="55" />
      </Div>

      {/* Research Section */}
      <Div className="cs-gradient_bg_1 cs-shape_wrap_6">
        <Div className="cs-shape_2"></Div>
        <Div className="cs-shape_2"></Div>
        <Div className="container">
          <Spacing lg="145" md="80" />
          <h2 className="cs-font_38 text-center">Case Study Research</h2>
          <Spacing lg="90" md="45" />

          {caseStudy.research.map((res, idx) => (
            <Div
              className={`row align-items-center ${idx % 2 === 0 ? 'cs-column_reverse_lg' : ''}`}
              key={idx}
            >
              <Div className="col-lg-5">
                <h3 className="cs-font_30 cs-m0">{res.title}</h3>
                <Spacing lg="45" md="30" />
                <p className="cs-m0">{res.description}</p>
              </Div>
              <Div className="col-lg-6 offset-lg-1 text-center">
                <Div className="cs-portfolio_img_in cs-shine_hover_1 rounded-circle">
                  <img src={res.image} alt={res.title} className="w-100 cs-radius_5" />
                </Div>
                <Spacing lg="0" md="40" />
              </Div>
            </Div>
          ))}

          <Spacing lg="150" md="80" />
        </Div>
      </Div>

      {/* Result Section */}
      <Spacing lg="140" md="80" />
      <Div className="container text-center">
        <Div className="row col-lg-10 offset-lg-1">
          <h2 className="cs-font_38 cs-m0">Result of The Case Study</h2>
          <Spacing lg="60" md="45" />
          <p className="cs-m0">{caseStudy.result}</p>
        </Div>
      </Div>

      {/* CTA Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss and make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc="/images/cta_bg.jpeg"
        />
      </Div>
    </>
  );
}
