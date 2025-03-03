import React from 'react'
import Div from '../Div'
import './logolist.scss'

export default function LogoList() {
  const partnerLogos = [
    {
      src: '/images/47consultant-logo.webp', 
      alt:'Partner'
    },
    {
      src: '/images/roycehosting-e1.png', 
      alt:'Partner'
    },
    {
      src: '/images/meta-certified.png', 
      alt:'Partner'
    },
    {
      src: '/images/google-Premier.png', 
      alt:'Partner'
    },

  ]
  return (
    <Div className="cs-partner_logo_wrap">
      {partnerLogos.map((partnerLogo, index)=><div className="cs-partner_logo" key={index}><img src={partnerLogo.src} alt={partnerLogo.alt} /></div>)}
    </Div>
  )
}
