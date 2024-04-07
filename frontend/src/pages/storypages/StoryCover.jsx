import React from 'react';

const PageCover = React.forwardRef((props, ref) => (
  <div className="story-page-cover" ref={ref} data-density="hard">
    <div className="story-cover">
        <div className="page-cover-text">
      <h2>{props.children}</h2>
      </div>
    </div>
  </div>
));

export default PageCover;
