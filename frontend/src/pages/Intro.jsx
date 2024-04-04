// Page.jsx
import React from 'react';

const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => (
  <div className="pageOne" ref={ref}>
    

      <div className="page-intro-text">Once Upon A Time...</div>
      <div className="page-text">An adventure began... <br></br> <br></br> 
      In this interactive tale, you are the master of your destiny. Embark on a journey where every decision you make shapes the unfolding story. 
      Your choices will lead you down paths filled with mystery, danger, and wonder.
      <br></br> Dare to step into the unknown. Your adventure begins now.</div>
      <div className="page-footer">{number}</div>
      {children}
    </div>

));

export default Page;
