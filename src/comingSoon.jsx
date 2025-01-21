import React from 'react';
import { Clock } from 'lucide-react';
// import comingSoon from "../src/Assets/Images/comingsoon1.png"
const ComingSoon = () => {
    
const comingsoon="https://reliancehospital.blob.core.windows.net/reliancehospitalblob/pngtree-green-product-coming-soon-design-png-image_3995201-removebg-preview.png"
  return (
    <div className='coming-soon-container'>
        <div >
          <img 
            src={comingsoon}
            alt="Coming Soon"    
          />
        </div>
        <p>
          We're working hard to bring you something amazing. Stay tuned!
        </p> 
        
    </div>
  );
};

export default ComingSoon;