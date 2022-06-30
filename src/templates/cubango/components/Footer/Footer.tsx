import React from 'react';
import './Footer.scss';
import logo from '../../assets/logo-footer.png';

interface Props {

}

const Footer: React.FC<Props> = () => {
  return (
    <footer className='footer'>
      <img src={logo} />
      <div className='footer__credits'>
        <b>Credits</b>
        <span>© 2022. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;