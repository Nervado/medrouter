import React from 'react';
import PropTypes from 'prop-types';

import {
  FaWhatsappSquare,
  FaFacebookSquare,
  FaInstagram,
} from 'react-icons/fa';

import { MdCopyright } from 'react-icons/md';

import Soft from '~/assets/34s0ft.svg';

import { Container } from './styles';

export default function Footer({ spaOn }) {
  return (
    <Container spaOn={spaOn ? 1 : 0}>
      <div className="wrapper">
        <div className="partial">
          <div>
            <span>Powered by </span>
            <a href="https://34s0ft.com.br">
              <img src={Soft} alt="34s0ft" />
            </a>
          </div>
        </div>
        <div className="partial">
          <div>
            <div>
              <MdCopyright style={{ color: 'blue' }} />
              <span>All rights reserved CV Reformas e Construções </span>
            </div>
          </div>
        </div>
        <div className="partial">
          <div>
            <div>
              <span>Nos siga!</span>

              <a href="https://facebook.com" style={{ cursor: 'pointer' }}>
                <FaFacebookSquare style={{ color: '#38539B', width: '20px' }} />
              </a>
              <a
                href="https://www.instagram.com/?hl=pt-br"
                style={{ cursor: 'pointer' }}
              >
                <FaInstagram style={{ color: '#EB4354', width: '20px' }} />
              </a>
              <a href="https://www.whatsapp.com" style={{ cursor: 'pointer' }}>
                <FaWhatsappSquare style={{ color: '#1BD741', width: '20px' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

Footer.propTypes = {
  spaOn: PropTypes.bool,
};

Footer.defaultProps = {
  spaOn: false,
};
