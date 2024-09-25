import "./footer.css";
import { assets } from "../../assets/frontend_assets/assets";

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            earum velit quo voluptatibus, provident voluptas saepe asperiores!
            Numquam, deleniti nulla!
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>contact@mosalah.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
