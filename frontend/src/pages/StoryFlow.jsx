// Page.jsx
import React from 'react';

const Page = React.forwardRef(({ number, imageSrc, textContent, children }, ref) => (
  <div className="pageOne" ref={ref}>
    
    <div className='page-intro-text'>Shape your story...</div>

      <div className="page-text"> Ask questions about beginning, middle, end.</div>
      <div className="page-footer">{number}</div>
      {children}
    </div>

));

export default Page;
