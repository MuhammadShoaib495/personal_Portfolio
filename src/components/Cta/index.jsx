import React, { useState } from 'react';
import parse from 'html-react-parser';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import './cta.scss';
import Div from '../Div';
import Spacing from '../Spacing';

export default function Cta({ title, bgSrc, variant }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    captchaToken: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.captchaToken) {
      setStatus('Please verify that you are not a robot.');
      return;
    }

    setStatus('Sending...');

    try {
      const response = await axios.post(
        'https://backend-portfolio-assistent.vercel.app/contact',
        formData
      );

      if (response.data.success) {
        setStatus('Message sent successfully!');

        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          captchaToken: '',
        });
      } else {
        setStatus(
          response.data.message || 'Something went wrong.'
        );
      }
    } catch (error) {
      console.error(error);

      setStatus(
        error.response?.data?.message ||
          'Unable to send message. Please try again.'
      );
    }
  };

  return (
    <Div
      className={`cs-cta cs-style1 cs-bg text-center cs-shape_wrap_1 cs-position_1 ${
        variant ? variant : ''
      }`}
      style={{
        backgroundImage: `url(${bgSrc})`,
      }}
    >
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />

      <Div className="cs-cta_in">
        <h2 className="cs-cta_title cs-semi_bold cs-m0">
          {parse(title)}
        </h2>

        <Spacing lg="20" md="15" />

        <p className="cs-cta_subtitle">
          Tell me a little about your project and I'll get back to you soon.
        </p>

        <Spacing lg="40" md="25" />

        <form
          className="cs-contact_form"
          onSubmit={handleSubmit}
        >
          <div className="cs-form_group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cs-form_group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="cs-form_group">
            <input
              type="tel"
              name="whatsapp"
              placeholder="WhatsApp Number (Optional)"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </div>

          <div className="cs-form_group">
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                What do you need?
              </option>
              <option value="Website">Website</option>
              <option value="Web App">Web App</option>
              <option value="E-commerce">E-commerce</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Branding">Branding</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="cs-form_group">
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                What's your budget?
              </option>
              <option value="Under $500">Under $500</option>
              <option value="$500 - $1,000">$500 - $1,000</option>
              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>

          <div className="cs-form_group">
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                When do you need it?
              </option>
              <option value="ASAP">ASAP</option>
              <option value="1-2 weeks">1–2 weeks</option>
              <option value="1 month">Within 1 month</option>
              <option value="2-3 months">2–3 months</option>
              <option value="Flexible">I'm flexible</option>
            </select>
          </div>

          <div className="cs-form_group">
            <textarea
              name="message"
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <div className="cs-form_group">
            <ReCAPTCHA
              sitekey="6LcPs-UtAAAAAAsJQ6cBczPHMgMye3LmpdmZgO8r"
              onChange={(token) =>
                setFormData({
                  ...formData,
                  captchaToken: token || '',
                })
              }
            />
          </div>

          <button
            type="submit"
            className="cs-btn cs-style1"
          >
            Send Project Details
          </button>

          {status && (
            <p className="cs-form_status">
              {status}
            </p>
          )}
        </form>
      </Div>
    </Div>
  );
}
