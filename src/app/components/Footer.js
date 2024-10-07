import './Footer.css';

const Footer = () => {
  return (
      <footer className="footer">
          <div className="footer-content">
              <p>&copy; 2023 My Coupon Site. All rights reserved.</p>
              <p>Address: 123 Coupon St, Coupon City, CO 12345</p>
              <div className="footer-links">
                  <a href="/about">About Us</a>
                  <a href="/contact">Contact</a>
                  <a href="/privacy">Privacy Policy</a>
                  <a href="/terms">Terms of Service</a>
              </div>
          </div>
      </footer>
  );
};

export default Footer;