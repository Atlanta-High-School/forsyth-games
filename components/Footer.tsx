'use client'

import React from 'react';

export default function Footer() {
  const EXTERNAL_URL = "https://weather.com/";

  const handleWeatherLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const confirmLeave = window.confirm(
      "You are leaving this website. Do you want to continue?"
    );
    
    // If the user cancels, prevent the default navigation of the <a> tag
    if (!confirmLeave) {
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-surface border-t border-surface-hover mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-textSecondary">
            <span className="font-semibold">a site by</span>{' '}
            <a 
              href={EXTERNAL_URL}
              onClick={handleWeatherLinkClick}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-white transition-colors font-semibold"
              aria-label="Visit forsyth.k12.us (opens in a new tab)"
            >
              weather man
            </a>
          </p>
          <p className="text-textSecondary text-sm mt-2">
            © 2026 Forsyth Games. All games remain property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
