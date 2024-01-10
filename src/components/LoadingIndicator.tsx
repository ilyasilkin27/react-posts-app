import React from 'react';

function LoadingIndicator() {
  return (
    <div className="container mt-4 mb-4">
      <div className="mt-4 mb-4 d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only" />
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
