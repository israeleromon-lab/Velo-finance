import React, { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Check if script is already injected to prevent duplicates
    if (!bannerRef.current || bannerRef.current.querySelector('script')) {
      return;
    }

    const script = document.createElement('script');
    script.src = "https://pl29841604.effectivecpmnetwork.com/d5/76/c8/d576c838e07cf6e032598902579244d0.js";
    script.async = true;
    script.type = 'text/javascript';
    
    bannerRef.current.appendChild(script);
  }, []);

  return (
    <div className="flex justify-center items-center mt-6 w-full overflow-hidden">
      <div ref={bannerRef} className="text-center w-full flex justify-center" />
    </div>
  );
}
