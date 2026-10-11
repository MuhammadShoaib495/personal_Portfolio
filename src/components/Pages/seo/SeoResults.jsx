
import React from 'react';
import Div from '../Div';
import Spacing from '../Spacing';
import SectionHeading from '../SectionHeading';
import './SeoResults.scss';

export default function SeoResults() {
  return (
    <section className="seo-results-section">
      <Div className="cs-height_145 cs-height_lg_75" />

      <div className="container">
        <Div className="cs-height_145 cs-height_lg_75" />

        <SectionHeading
          title="Real SEO Results"
          subtitle="SEO"
          variant="cs-style1 text-center"
        />

        <Spacing lg="70" md="45" />

        <div className="seo-results-frame">
          <img
            src="/images/caseStudy/vaconnect/real_results.jpg"
            alt="Real SEO results and performance improvements"
            loading="lazy"
          />
        </div>
      </div>

      <Div className="cs-height_150 cs-height_lg_80" />
    </section>
  );
}
