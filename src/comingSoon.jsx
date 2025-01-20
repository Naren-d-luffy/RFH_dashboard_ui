import React from 'react';
import { Clock } from 'lucide-react';
import comingSoon from "../src/Assets/Images/comingsoon1.png"
const ComingSoon = () => {

  return (
    <div className='coming-soon-container'>
        <div >
          <img 
            src={comingSoon}
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