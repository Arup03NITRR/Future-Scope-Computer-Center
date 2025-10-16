import React from 'react';

// --- SVG Icon Components ---
const FaMapMarkerAlt = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" {...props}>
    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 01-35.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
  </svg>
);

const FaPhone = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props}>
    <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path>
  </svg>
);

const FaEnvelope = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props}>
    <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
  </svg>
);

const FaClock = (props) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props}>
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-22.4 30.8c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
  </svg>
);
// --- End of SVG Icon Components ---

const ContactUs = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 mt-2">Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            <div className="flex items-start mb-6">
              <FaMapMarkerAlt className="w-6 h-6 mr-4 mt-1 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Our Address</p>
                <p className="text-gray-600">Future Scope Computer Centre, Ward 39, Haidar Para, Siliguri, West Bengal, 734006, India</p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <FaPhone className="w-6 h-6 mr-4 mt-1 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Call Us</p>
                <p className="text-gray-600">+91-9832011163</p>
                <p className="text-gray-600">+91-9800811163</p>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <FaEnvelope className="w-6 h-6 mr-4 mt-1 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Email Us</p>
                <p className="text-gray-600"><a href="mailto:sfsec.siliguri@gmail.com">sfsec.siliguri@gmail.com</a></p>
              </div>
            </div>
            <div className="flex items-start">
              <FaClock className="w-6 h-6 mr-4 mt-1 text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-700">Opening Hours</p>
                <p className="text-gray-600"><span className="font-medium">Mon - Sat:</span> 8:00 AM - 8:00 PM</p>
                <p className="text-gray-600"><span className="font-medium">Sunday:</span> 8:00 AM - 2:00 PM</p>
              </div>
            </div>
            
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send a Message</h3>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfZ5hBjSr6RskSJfPw66UloFgYBxO-QVS8Hcd_vh7Nms56N7Q/viewform?embedded=true"
              width="100%"
              height="520"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0">
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
