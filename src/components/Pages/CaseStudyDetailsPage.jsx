import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import Div from '../Div';
import PageHeading from '../PageHeading';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';

export default function CaseStudyDetailsPage({ caseStudy }) {
  pageTitle(caseStudy.title);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title={caseStudy.title}
        bgSrc={caseStudy.heroImage}
        pageLinkText={caseStudy.title}
      />
      <Spacing lg="145" md="80" />

      <Div className="container">
        <SectionHeading
          title={caseStudy.heading}
          subtitle={caseStudy.category}
          variant="cs-style1 text-center"
        />
        <Spacing lg="90" md="45" />
        <img src={caseStudy.images[0]} alt="Thumb" className="w-100 cs-radius_15" />
        <Spacing lg="140" md="80" />

        <h2 className="cs-font_38 text-center">Case Study Overview</h2>
        <Spacing lg="60" md="45" />
        <p className="cs-m0">{caseStudy.overview}</p>

        <Spacing lg="65" md="45" />
        <Div className="row">
          {caseStudy.images.slice(1, 3).map((img, index) => (
            <Div key={index} className="col-sm-6">
              <img src={img} alt={`Thumb ${index}`} className="w-100 cs-radius_5" />
              <Spacing lg="25" md="25" />
            </Div>
          ))}
        </Div>
        <Spacing lg="125" md="55" />
      </Div>

      {/* Repeat similar structure for Research, Results, and CTA sections */}
    </>
  );
}
