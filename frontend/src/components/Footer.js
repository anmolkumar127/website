import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const homeServices = [
    "AC Service & Repair",
    "TV Service & Repair",
    "Washing Machine Service",
    "RO Water Purifier Service",
    "Refrigerator Service",
    "Plumbing Services",
    "Electrical Services",
    "Geyser Service",
    "CCTV Installation",
  ];

  const vehicleServices = [
    "Car Washing Service",
    "Diesel Car Rental",
    "Petrol Car Rental",
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4" data-testid="footer-brand">Sewawala.com</h3>
            <p className="text-sm mb-4">All Home & Vehicle Services at Your Doorstep</p>
            <div className="space-y-2">
              <a href="tel:+918541051981" data-testid="footer-phone" className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+91 85410 51981</span>
              </a>
              <a href="mailto:jaicom.om@gamil.com" data-testid="footer-email" className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                <Mail className="h-4 w-4" />
                <span>jaicom.om@gamil.com</span>
              </a>
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Block Road, Kahalgaon</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Home Services</h4>
            <ul className="space-y-2 text-sm">
              {homeServices.slice(0, 6).map((service, idx) => (
                <li key={idx}>
                  <Link to="/services" className="hover:text-orange-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Vehicle Services</h4>
            <ul className="space-y-2 text-sm">
              {vehicleServices.map((service, idx) => (
                <li key={idx}>
                  <Link to="/services" className="hover:text-orange-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white font-semibold mt-6 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" data-testid="footer-facebook" className="hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" data-testid="footer-twitter" className="hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" data-testid="footer-instagram" className="hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" data-testid="footer-linkedin" className="hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm">© {currentYear} Sewawala.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}