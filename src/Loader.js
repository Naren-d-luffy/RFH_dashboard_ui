import React from 'react';
import { FadeLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="global-loader">
      <FadeLoader color="var(--sky-blue-color)" size={50} />
    </div>
  );
};

export default Loader;
