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
      {caseStudy ? (
        <>
          <PageHeading
            title={caseStudy.title}
            bgSrc={caseStudy.heroImage}
            pageLinkText={caseStudy.title}
          />
          <Spacing lg="145" md="80" />

          <Div className="container">
            <SectionHeading
              title={caseStudy.title}
              subtitle={caseStudy.category}
              variant="cs-style1 text-center"
            />
            <Spacing lg="90" md="45" />

            {caseStudy.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Case Study ${i}`}
                className="w-100 cs-radius_15"
              />
            ))}

            <Spacing lg="60" md="45" />
            <h2 className="cs-font_38 text-center">Case Study Overview</h2>
            <Spacing lg="60" md="45" />
            <p className="cs-m0">{caseStudy.overview}</p>

            {caseStudy.research.map((res, idx) => (
              <Div className="row align-items-center" key={idx}>
                <Div className="col-lg-5">
                  <h3 className="cs-font_30 cs-m0">{res.title}</h3>
                  <Spacing lg="45" md="30" />
                  <p className="cs-m0">{res.description}</p>
                </Div>
                <Div className="col-lg-6 offset-lg-1 text-center">
                  <img src={res.image} alt={res.title} className="w-100" />
                  <Spacing lg="0" md="40" />
                </Div>
              </Div>
            ))}

            <Spacing lg="100" md="80" />
            <h2 className="cs-font_38 text-center">Result of The Case Study</h2>
            <Spacing lg="60" md="45" />
            <p className="cs-m0">{caseStudy.result}</p>
          </Div>

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
      ) : (
        <p>Case study not found.</p>
      )}
    </>
  );
}
