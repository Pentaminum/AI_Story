// Page.jsx
import React from 'react';
import pageImage from '../utils/page.jpg';
const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => (
  <div className="pageOne" ref={ref}>
    
      <h2 className="page-header">Page {number}</h2>

      <div className="page-text"> Ask questions about beginning, middle, end.</div>
      <div className="page-footer">{number}</div>
      {children}
    </div>

));

export default Page;
