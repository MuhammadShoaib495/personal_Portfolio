import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Hero7 from '../Hero/Hero7';
import { caseStudies } from '../../data/caseStudies';

export default function CaseStudyShowcaseHome() {
  pageTitle('Case Study Showcase');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroSocialLinks = [
    { name: 'Facebook', links: 'https://web.facebook.com/mshoaibceowmfc/' },
    { name: 'Linkedin', links: 'https://www.linkedin.com/in/muhammadshoaib-wordpress-seo-copywriter/' },
  ];

  const showcaseData = caseStudies.map((cs) => ({
    title: cs.title,
    imgUrl: cs.heroImage,
    href: `/case-study/${cs.id}`, // dynamic link to detail page
  }));

  return (
    <Hero7
      heroSocialLinks={heroSocialLinks}
      socialLinksHeading="Follow Us"
      showcaseData={showcaseData}
    />
  );
}
