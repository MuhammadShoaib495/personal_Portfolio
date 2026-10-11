import React from 'react';
import Div from '../Div';
import Spacing from '../Spacing';
import SectionHeading from '../SectionHeading';
import './SeoResults.scss';

const seoMetrics = [
  {
    value: '75+',
    previousValue: '33',
    label: 'Organic Clicks',
    change: '+127.3%',
    changeType: 'positive',
    description: 'Previous 3 months: 33 clicks',
  },
  {
    value: '4.83K',
    previousValue: '660',
    label: 'Search Impressions',
    change: '+631.8%',
    changeType: 'positive',
    description: 'Previous 3 months: 660 impressions',
  },
  {
    value: '11.8',
    previousValue: '17.9',
    label: 'Average Position',
    change: 'Improved by 6.1',
    changeType: 'positive',
    description: 'Previous 3 months: 17.9',
  },
  {
    value: '1.6%',
    previousValue: '5%',
    label: 'Average CTR',
    change: '-3.4 percentage points',
    changeType: 'neutral',
    description: 'Previous 3 months: 5%',
  },
];

export default function SeoResults() {
  return (
    <section className="seo-results-section">
      <Div className="cs-height_145 cs-height_lg_75" />

      <div className="container">
        <Div className="cs-height_145 cs-height_lg_75" />

        <SectionHeading
          title="Growing Organic Search Visibility"
          subtitle="SEO RESULTS"
          variant="cs-style1 text-center"
        />

        <Spacing lg="25" md="20" />

        <p className="seo-results-intro">
          I help businesses strengthen their online presence through
          strategic SEO, technical improvements, and data-driven
          optimization focused on sustainable organic growth.
        </p>

        

        <Spacing lg="35" md="25" />

        <div className="seo-results-metrics">
          {seoMetrics.map((metric) => (
            <div className="seo-results-card" key={metric.label}>
              <h3>{metric.value}</h3>

              <h4>{metric.label}</h4>

              <p className="seo-results-change">
                {metric.change}
              </p>

              <p className="seo-results-previous">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        <Spacing lg="45" md="30" />

        <div className="seo-results-frame">
          <img
            src="/images/caseStudy/vaconnect/real_results.jpg"
            alt="Google Search Console report showing organic clicks, impressions, click-through rate, and average search position"
            loading="lazy"
          />
        </div>

        <Spacing lg="20" md="15" />

      </div>

      <Div className="cs-height_150 cs-height_lg_80" />
    </section>
  );
}