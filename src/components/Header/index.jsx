import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import Div from '../Div';
import DropDown from './DropDown';

export default function Header({ variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 text-uppercase ${
          variant ? variant : ''
        } cs-sticky_header ${isSticky ? 'cs-sticky_header_active' : ''}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              <Div className="cs-main_header_left">
               
              </Div>
              <Div className="cs-main_header_center">
                <Div className="cs-nav cs-primary_font cs-medium">
                  <ul
                    className="cs-nav_list"
                    style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                  >
                    <li>
                      <NavLink to="/" onClick={() => setMobileToggle(false)}>
                        Home
                      </NavLink>
                    </li>
               
                    <li className="menu-item-has-children">
                    
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="service"
                              onClick={() => setMobileToggle(false)}
                            >
                              Services
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/service/service-details"
                              onClick={() => setMobileToggle(false)}
                            >
                              Service Details
                            </Link>
                          </li>
                        </ul>
                      </DropDown>
                    </li>
                    <li className="menu-item-has-children">
                      <NavLink
                        onClick={() => setMobileToggle(false)}
                      >
                        Case Study
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="case-study/vaconnect"
                              onClick={() => setMobileToggle(false)}
                            >
                              Vaconnect
                            </Link>
                          </li>
                         
                        </ul>
                      </DropDown>
                    </li>
                    <li className="menu-item-has-children">
                      <NavLink onClick={() => setMobileToggle(false)}>
                        Free Resources
                      </NavLink>
                      <DropDown>
                        <ul>
                          <li>
                            <Link
                              to="ai-image"
                              onClick={() => setMobileToggle(false)}
                            >
                              Ai Image Background Remover
                            </Link>
                          </li>
                         
                        </ul>
                      </DropDown>
                    </li>
                   
                  </ul>
                  <span
                    className={
                      mobileToggle
                        ? 'cs-munu_toggle cs-toggle_active'
                        : 'cs-munu_toggle'
                    }
                    onClick={() => setMobileToggle(!mobileToggle)}
                  >
                    <span></span>
                  </span>
                </Div>
              </Div>
              <Div className="cs-main_header_right">
               
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

   
    </>
  );
}
