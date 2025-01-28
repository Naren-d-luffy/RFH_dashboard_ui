import React from 'react';

const ComingSoon = () => {
  const comingsoon = "https://reliancehospital.blob.core.windows.net/reliancehospitalblob/coming soon.png";

  return (
    <div className="coming-soon-container">
      <div >
        <img
          src={comingsoon}
          alt="Coming Soon"
          className='coming-soon-image'
        />
      </div>
      <h1 className="coming-soon-title">Coming Soon</h1>
      <p className="coming-soon-text">
        Stay ahead in your wellness journey with our comprehensive health.<br /> Coming soon with personalized care, tailored just for you!
      </p>
    </div>
  );
};

export default ComingSoon;
