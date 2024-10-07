import Link from 'next/link'; // Import Link from next/link
import './Footer.css';

const Footer = () => {
  return (
      <footer className="footer">
          <div className="footer-content">
              <p>&copy; 2023 My Coupon Site. All rights reserved.</p>
              <p>Address: 123 Coupon St, Coupon City, CO 12345</p>
              <div className="footer-links">
                  <Link href="/about">About Us</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/privacy">Privacy Policy</Link>
                  <Link href="/terms">Terms of Service</Link>
              </div>
          </div>
      </footer>
  );
};

export default Footer;