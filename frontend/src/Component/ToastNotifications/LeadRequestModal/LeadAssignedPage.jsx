import React, { useState, useEffect, useRef } from 'react';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import Avatar from '@mui/material/Avatar';
import { Button, Typography, Box } from '@mui/material';
import gsap from 'gsap';

const LeadAssignedPage = ({ isOpen, requestedLeadData, closeHandler }) => {
  const [leadData, setLeadData] = useState(requestedLeadData);
  const [filtersToShow, setFiltersToShow] = useState(
    requestedLeadData.applied_filters
  );
  const [completedTexts, setCompletedTexts] = useState([]);
  const tlRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCompletedTexts([]);

      tlRef.current = gsap.timeline({
        onComplete: function () {
          setCompletedTexts([...filtersToShow]);
        },
      });

      tlRef.current.staggerTo(
        filtersToShow.map((text, index) => ({ text: `.filter-${index}` })),
        1,
        {
          text: (index) => {
            setCompletedTexts((prevTexts) => [
              ...prevTexts,
              filtersToShow[index],
            ]);
          },
        },
        1
      );

      tlRef.current.restart();
    }
  }, [isOpen, filtersToShow]);

  const openHandler = (leadId) => {
    const currentUrl = '/leads/' + leadId;
    window.open(currentUrl, '_blank');
    closeHandler();
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

  const resultScreenPopupStyle = {
    position: 'relative',
    width: '60%',
    height: '75%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '24px',
  };
  const textContainerStyle = {
    marginTop: '10px',
    padding: '10px',
    color: 'black',
    fontSize: 20,
    fontFamily: 'Times New Roman, Times, serif',
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '18px',
    color: 'green',
    marginTop: '5px',
  };

  const MAX_DISPLAYED_FILTERS = 4;

  return (
    <Box style={popupStyle}>
      <Box style={resultScreenPopupStyle}>
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '65%',
            backgroundColor: 'white',
            height: '100%',
            borderRadius: '24px',
          }}
        >
          <Box
            style={{
              textAlign: 'center',
              position: 'relative',
              width: '100%',
              marginTop: '60px',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                width: '100%',
                height: '5px',
                backgroundColor: '#6f00ff',
                top: '50%',
              }}
            ></Typography>
            <Typography
              sx={{
                display: 'inline-block',
                backgroundColor: '#fff',
                padding: '0 70px',
                zIndex: 1,
                position: 'relative',
                color: '#6f00ff',
                fontFamily: 'sans-serif',
                fontSize: '45px',
                fontWeight: 600,
                lineHeight: '125.864%',
              }}
            >
              Brilliant!
            </Typography>
          </Box>

          <Typography
            sx={{
              marginTop: '25px',
              fontFamily: 'sans-serif',
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '125.864%',
            }}
          >
            We Have Found A Good Match For You
          </Typography>
          {completedTexts && (
            <Box style={textContainerStyle}>
              {completedTexts
                .slice(0, MAX_DISPLAYED_FILTERS)
                .map((text, index) => (
                  <Box
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                    }}
                  >
                    <VerifiedRoundedIcon style={iconStyle} />

                    <Typography
                      sx={{
                        fontFamily: 'sans-serif',
                        fontSize: '20px',
                        fontWeight: 600,
                        padding: '3px',
                      }}
                    >
                      {text.displayText}
                    </Typography>
                  </Box>
                ))}
            </Box>
          )}
        </Box>

        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(#6f00ff, #a966ff)',
            width: '35%',
            height: '100%',
            borderRadius: '24px',
          }}
        >
          <Avatar
            sx={{
              bgcolor: 'white',
              marginTop: '70px',
              width: '160px',
              height: '160px',
              color: '#6f00ff',
              fontSize: '50px',
              fontWeight: 600,
            }}
            alt='Remy Sharp'
            src='/broken-image.jpg'
          >
            {leadData.fname.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              marginTop: '30px',
              fontFamily: 'sans-serif',
              fontSize: '30px',
              fontWeight: 600,
              lineHeight: '125.864%',
              color: 'white',
            }}
          >
            {leadData.fname}
          </Typography>
          <Typography
            sx={{
              marginTop: '5px',
              fontFamily: 'sans-serif',
              fontSize: '25px',
              fontWeight: 200,
              lineHeight: '125.864%',
              color: 'white',
            }}
          >
            # {leadData.id}
          </Typography>
          <Button
            onClick={(e) => openHandler(leadData.id)}
            sx={{
              borderRadius: '7px',
              bgcolor: 'white',
              marginTop: 'auto',
              marginBottom: '100px',
              width: '120px',
              height: '40px',
              color: '#6f00ff',
              fontSize: '16px',
              fontWeight: 600,
              textAlign: 'center',
              fontFamily: 'sans-serif',
              transition: 'transform 0.8s, background-color 0.8s',
              '&:hover': {
                backgroundColor: 'white',
                transform: 'scale(1.2)',
              },
            }}
          >
            Open
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LeadAssignedPage;
