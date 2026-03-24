import { useEffect } from 'react';

/**
 * useGrainFilter
 * A custom hook that injects a dynamic SVG noise filter into the DOM
 * to create a subtle "grain" or "parchment" texture across the background.
 */
export default function useGrainFilter(frequency = 0.65, opacity = 0.04) {
  useEffect(() => {
    // Create the SVG element if it doesn't exist
    let svg = document.getElementById('grain-filter-svg');
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.id = 'grain-filter-svg';
      svg.style.position = 'fixed';
      svg.style.top = '0';
      svg.style.left = '0';
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.pointerEvents = 'none';
      svg.style.zIndex = '-1';
      
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.id = 'noiseFilter';
      
      const turbulence = document.createElementNS('http://www.w3.org/2000/svg', 'feTurbulence');
      turbulence.setAttribute('type', 'fractalNoise');
      turbulence.setAttribute('baseFrequency', frequency.toString());
      turbulence.setAttribute('numOctaves', '3');
      turbulence.setAttribute('stitchTiles', 'stitch');
      
      filter.appendChild(turbulence);
      svg.appendChild(filter);
      document.body.appendChild(svg);
    }

    // Create the overlay div if it doesn't exist
    let overlay = document.getElementById('grain-overlay-div');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'grain-overlay-div';
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.pointerEvents = 'none';
      overlay.style.zIndex = '40';
      overlay.style.opacity = opacity.toString();
      overlay.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';
      document.body.appendChild(overlay);
    }

    return () => {
      // Cleanup if needed, though usually we want it to persist across pages
      // If we want it to be page-specific, we could remove it here.
    };
  }, [frequency, opacity]);
}
