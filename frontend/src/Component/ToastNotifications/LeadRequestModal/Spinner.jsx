import * as React from 'react';
import { Typography, Box } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const Spinner = ({ props, modalStyle, textStyle, text, SpinnerStyle }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        width: modalStyle ? modalStyle.width : '100px',
        height: modalStyle ? modalStyle.height : '100px',
        borderRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <CircularProgress
        variant='indeterminate'
        sx={{
          color: SpinnerStyle ? SpinnerStyle.color : '#308fe8',
          background: 'transparent',
          animationDuration: '1000ms',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={SpinnerStyle ? SpinnerStyle.size : 40}
        thickness={SpinnerStyle ? SpinnerStyle.thickness : 10}
        {...props}
      />
      {text && (
        <Typography
          variant='body1'
          fontWeight='bold'
          sx={{
            marginTop: '15px',
            fontSize: textStyle ? textStyle.fontSize : '15px',
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  );
};

export default Spinner;
