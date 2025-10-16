import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // State to manage the mobile menu's visibility
  const [isOpen, setIsOpen] = useState(false);

  // Common styles for nav links, adapted for the light theme
  const linkStyles = "px-3 py-2 rounded-md text-base font-medium transition-all duration-300";
  const activeLinkStyles = "text-indigo-600 font-semibold";
  const inactiveLinkStyles = "text-gray-500 hover:text-indigo-600";
  
  // Function to handle link clicks and close the mobile menu
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo/Brand Name with Image */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
              {/* Replace with your logo image */}
              <img 
                className="h-20 w-20 rounded-full" 
                src="./logos/fs.png" 
                alt="Future Scope Computer Center" 
              />
              <div className="grid leading-none">
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Future <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Scope</span>
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Computer <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Center</span>
                </span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>About</NavLink>
            <NavLink to="/courses" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Courses</NavLink>
            <NavLink to="/notice" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Notice</NavLink>
            <NavLink to="/hall-of-fame" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Hall of Fame</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Gallery</NavLink>
            <NavLink to="/contact-us" className="bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300">Contact Us</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for menu: hamburger or close */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Animates with a smooth transition */}
      <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <NavLink to="/" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Home</NavLink>
          <NavLink to="/about" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>About</NavLink>
          <NavLink to="/courses" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Courses</NavLink>
          <NavLink to="/notice" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Notice</NavLink>
          <NavLink to="/hall-of-fame" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Hall of Fame</NavLink>
          <NavLink to="/gallery" onClick={handleLinkClick} className={({ isActive }) => `block ${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Gallery</NavLink>
          <NavLink to="/contact-us" onClick={handleLinkClick} className="block bg-indigo-600 text-white text-center mt-2 mx-2 px-3 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300">Contact Us</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;