
import React, { useState } from 'react';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import './ResumeSection.css';

export default function ResumeSection({
  educationData = [],
  experienceData = [],
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      className={`cs-fixed_bg resume-section ${
        isExpanded ? 'resume-expanded' : 'resume-collapsed'
      }`}
      style={{
        backgroundImage: 'url("/images/resume_bg.jpeg")',
      }}
    >
      <div className="cs-height_145 cs-height_lg_75" />

      <div className="container">
        <SectionHeading
          title="Education & experience"
          subtitle="Resume"
          variant="cs-style1 text-center"
        />

        <Spacing lg="70" md="40" />

        <div className="resume-content-wrapper">
          <div className="cs-list_2_group resume-list-group">
            {/* Education */}
            <ul className="cs-list cs-style_2 cs-mp0 resume-list">
              {educationData.map((item, index) => (
                <li key={index}>
                  <div className="experience-role">
                    <div className="experience-dot" />

                    <div className="experience-role-content">
                      <h4>{item.title}</h4>

                      <p className="experience-duration">
                        {item.subTitle}
                      </p>

                      {item.description && (
                        <p className="mb-0">{item.description}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Work experience */}
            <ul className="cs-list cs-style_2 cs-mp0 resume-list">
              {experienceData.map((company, index) => (
                <li className="resume-company" key={index}>
                  <div className="experience-company-header">
                    <div className="experience-company-icon">
                      {/* Add your existing company SVG here */}
                    </div>

                    <div>
                      <h3 className="resume-company-name">
                        {company.company}
                      </h3>

                      <p>{company.companyDuration}</p>
                    </div>
                  </div>

                  <div className="experience-roles">
                    {company.roles?.map((role, roleIndex) => (
                      <div
                        className="experience-role"
                        key={roleIndex}
                      >
                        <div className="experience-dot" />

                        <div className="experience-role-content">
                          <h4>{role.title}</h4>

                          <p className="experience-duration">
                            {role.duration}
                          </p>

                          <p>{role.description}</p>

                          {role.link && (
                            <a
                              className="resume-role-link"
                              href={role.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {role.linkText || 'View Details'}
                            </a>
                          )}

                          <Spacing lg="25" md="20" />
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="resume-toggle-wrapper">
          <button
            type="button"
            className="resume-toggle-button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : 'Show More'}

            <span
              className={`resume-toggle-icon ${
                isExpanded ? 'is-rotated' : ''
              }`}
              aria-hidden="true"
            >
              ↓
            </span>
          </button>
        </div>
      </div>

      <div className="cs-height_150 cs-height_lg_80" />
    </section>
  );
}
