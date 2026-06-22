import React, { useEffect, useRef } from 'react';

export default function AdBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Check if script is already injected to prevent duplicates
    if (!bannerRef.current || bannerRef.current.querySelector('script')) {
      return;
    }

    const confScript = document.createElement('script');
    confScript.type = 'text/javascript';
    confScript.innerHTML = `
      atOptions = {
        'key' : '2da0ea1860bb5157c5ae4533357fd255',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;
    bannerRef.current.appendChild(confScript);

    const invokeScript = document.createElement('script');
    invokeScript.src = "https://bogavoidmemorize.com/2da0ea1860bb5157c5ae4533357fd255/invoke.js";
    invokeScript.async = true;
    invokeScript.type = 'text/javascript';
    
    bannerRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="flex justify-center items-center mt-6 w-full overflow-hidden">
      <div ref={bannerRef} className="text-center w-full flex justify-center min-h-[60px]" />
    </div>
  );
}
