import React from 'react';

const PageCover = React.forwardRef((props, ref) => (
  <div className="page page-cover" ref={ref} data-density="hard">
    <div className="page-content">
        <div className="page-cover-text">
      <h2>{props.children}</h2>
      </div>
    </div>
  </div>
));

export default PageCover;
