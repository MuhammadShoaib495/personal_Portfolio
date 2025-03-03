import React from 'react';
import { Link } from 'react-router-dom';
import Div from '../Div';

export default function PageHeading({ title, bgSrc, pageLinkText }) {
  return (
    <Div>
      <Div className="container">

          <h1 className="cs-page_title cs-font_50 cs-white_color">{title}</h1>
          <ol className="breadcrumb text-uppercase">
            <li className="breadcrumb-item active">{pageLinkText}</li>
          </ol>
        </Div>
    </Div>
  );
}
