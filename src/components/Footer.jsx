import React from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaClock } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="mb-6 md:mb-0">
             <h2 className="text-2xl font-bold text-white mb-2">Future Scope</h2>
             <p className="text-sm">Your gateway to excellence in computer education. Join us to shape your future.</p>
             <div className="mt-4 flex items-center space-x-4">
                {/* IMPORTANT: Replace '/path/to/your/msme-logo.png' 
                with the actual path to your MSME logo image.
                */}
                <img 
                    src="https://images.seeklogo.com/logo-png/48/1/msme-logo-png_seeklogo-480293.png" 
                    alt="MSME Registered Logo" 
                    className="h-25 w-auto" // Adjust size as needed
                />

                {/* IMPORTANT: Replace '/path/to/your/iso-logo.png' 
                with the actual path to your ISO certification logo image.
                */}
                <img 
                    src="https://static.cdnlogo.com/logos/i/51/iso.svg" 
                    alt="ISO Certified Logo" 
                    className="h-25 w-auto" // Adjust size as needed
                />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <a href="tel:+919832011163" className="hover:text-indigo-400 transition-colors duration-300">+91-9832011163</a>
                <span> &nbsp;|&nbsp; </span>
                <a href="tel:+919800811163" className="hover:text-indigo-400 transition-colors duration-300">+91-9800811163</a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <a href="mailto:sfsec.siliguri@gmail.com" className="hover:text-indigo-400 transition-colors duration-300">sfsec.siliguri@gmail.com</a>
              </li>
              <li className="flex items-start">
                 <svg className="w-5 h-5 mr-3 text-indigo-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>Ward 39, Haidar Para, Siliguri, West Bengal, 734006, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                 <FaFacebook className="w-7 h-7" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaInstagram className="w-7 h-7" />
              </a>
              <a href="https://wa.me/9800811163" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
                <FaWhatsapp className="w-7 h-7" />
              </a>
            </div>
          </div>
          
          {/* Map Preview */}
          <div className="lg:col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Our Location</h3>
            <div className="overflow-hidden rounded-lg shadow-lg h-48">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.355184281703!2d88.43338957596089!3d26.73236396898864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e4410b6c0b9727%3A0x735e38cfc057aa33!2sFuture%20Scope%20Computer%20Centre!5e0!3m2!1sen!2sin!4v1695758151241!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location of Future Scope Computer Center"
              ></iframe>
            </div>
          </div>
          
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} Future Scope Computer Center. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
