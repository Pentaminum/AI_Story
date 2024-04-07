// Page.jsx
import React from 'react';

const Page1 = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => (
  <div className="pageOne" ref={ref}>
    

      {/* <div className="page-intro-text">Once Upon A Time...</div> */}
      <div className="page-text"> image + Caption</div>
      <div className="page-footer">{number}</div>
      {children}
    </div>

));

export default Page1;
