import Vector_1 from '../../assets/images/Vector_1.svg';
import Vector_2 from '../../assets/images/Vector_2.svg';

import './Footer.css';

const Footer = () => {
    return (
        <footer className="vectors-footer">
            <img className="vectors-img-left" src={Vector_2} alt="Vector 2"/>
            <img className="vectors-img-right" src={Vector_1} alt="Vector 1"/>
        </footer>
    );
}

export default Footer;