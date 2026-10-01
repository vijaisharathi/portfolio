
import React from 'react';
    import MagnetButton from '../common/MagnetButton';

    const Header = () => {
      const handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

      const handleConnectClick = () => {
        window.location.href = "mailto:hello@example.com";
      };

      return (
        <div className="absolute top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 pointer-events-none">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={handleLogoClick}
            className="pointer-events-auto text-white font-black text-3xl tracking-tighter mix-blend-difference hover:opacity-70 transition-opacity select-none cursor-pointer"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Vijai Sharathi T Ma
          </a>

          {/* Connect Button with Magnet Effect - HIDDEN ON MOBILE */}
          {/* Updated: Removed background, only border remains */}
          <MagnetButton 
            onClick={handleConnectClick}
            className="pointer-events-auto group relative hidden md:flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300 overflow-hidden"
          >
            <span className="relative z-10 text-sm font-medium uppercase tracking-widest">Connect</span>
          </MagnetButton>
        </div>
      );
    };

    export default Header;