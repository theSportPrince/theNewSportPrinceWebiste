import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import TextTyper from './LeadRequestModal/TypeWritterEffect';
import LeadAssignedPage from './LeadRequestModal/LeadAssignedPage';

const LeadRequestModal = ({ isOpen, requestedLeadData, closeHandler }) => {
  const [progress, setProgress] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const tlRef = useRef(null);
  const [filtersToShow, setFiltersToShow] = useState(
    requestedLeadData.applied_filters
  );

  useEffect(() => {
    if (isOpen) {
      setProgress(0);

      tlRef.current = gsap.timeline({
        onComplete: function () {
          setShowCongrats(true);
          resetToInitialStep();
          this.time(0).clear();
        },
      });
      // Duration of the progress bar
      const duration = filtersToShow.length * 3.5 + 1;

      filtersToShow.forEach((color, index) => {
        tlRef.current.to('.progress-bar', {
          width: `${(index + 1) * (100 / filtersToShow.length)}%`,
          background: 'linear-gradient(to right, #e2ccff, #6f00ff)',
          duration: duration / filtersToShow.length,
          ease: 'linear',
        });
      });

      tlRef.current.duration(duration);
      tlRef.current.restart();
    }
  }, [isOpen, filtersToShow]);

  const resetToInitialStep = () => {
    if (tlRef.current) {
      tlRef.current.progress(0);
      tlRef.current.clear();
    }
  };

  const popupStyle = {
    display: isOpen ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const modalStyle = {
    position: 'relative',
    width: '65%',
    height: '75%',
    backgroundColor: 'white',
    borderRadius: '24px',
    padding: '55px',
  };

  const progressBarContainerStyle = {
    marginTop: '20px',
    borderRadius: '20px',
    border: '1.5px solid #6f00ff ',
    display: 'flex',
  };

  const progressBarStyle = {
    height: '20px',
    width: `${progress}%`,
    borderRadius: '20px',
    boxSizing: 'border-box',
    margin: '4px',
  };

  return (
    <>
      {showCongrats ? (
        <LeadAssignedPage
          closeHandler={closeHandler}
          isOpen={isOpen}
          requestedLeadData={requestedLeadData}
        />
      ) : (
        <div style={popupStyle}>
          <div style={modalStyle}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={progressBarContainerStyle}>
                <div
                  className='progress-bar'
                  style={progressBarStyle}
                />
              </div>

              <TextTyper filters={filtersToShow} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadRequestModal;
