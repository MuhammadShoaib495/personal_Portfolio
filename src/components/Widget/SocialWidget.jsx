import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget() {
  return (
    <Div className="cs-social_btns cs-style1">
      <Link to='https://www.linkedin.com/in/muhammadshoaib-flutter-fullstack-nodejs-sql/' className="cs-center"  target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:linkedin-in" />
      </Link>
      <Link to='https://github.com/muhammadShoaib495' className="cs-center"  target="_blank" rel="noopener noreferrer">
        <Icon icon="fa6-brands:git" />
      </Link>
    </Div>
  )
}
