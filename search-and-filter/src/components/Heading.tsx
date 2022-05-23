import {Typography} from '@mui/material';
// eslint-disable-next-line node/no-extraneous-import
import {SystemProps} from '@mui/system';
import React, {FunctionComponent} from 'react';

interface HeadingProps extends SystemProps {
  label: string;
}

const Heading: FunctionComponent<HeadingProps> = ({label, ...props}) => {
  return (
    <Typography color="primary" variant="h4" {...props}>
      {label}
    </Typography>
  );
};
export default Heading;
