"use client";

/**
 * Scroll to a specific element with smooth animation and header offset
 */
export function scrollToElement(elementId: string) {
  // Remove the # if it was included
  const id = elementId.startsWith('#') ? elementId.substring(1) : elementId;
  
  const element = document.getElementById(id);
  
  if (element) {
    // Get the height of the fixed header (64px or 4rem)
    const headerOffset = 64;
    
    // Calculate the element's position relative to the top of the page
    const elementPosition = element.getBoundingClientRect().top;
    
    // Calculate the current scroll position
    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
    // Use native smooth scrolling
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
}

/**
 * Custom hook to use smooth scroll for components
 */
export function useSmoothScroll() {
  const scrollTo = (target: string | HTMLElement, options = {}) => {
    if (typeof target === 'string') {
      scrollToElement(target);
    } else if (target instanceof HTMLElement) {
      // Get the height of the fixed header (64px or 4rem)
      const headerOffset = 64;
      
      // Calculate the element's position relative to the top of the page
      const elementPosition = target.getBoundingClientRect().top;
      
      // Calculate the current scroll position
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  
  return { scrollTo };
} 