import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const FlexBox = styled(Box)({
  display: 'flex',
});

const CenteredFlexBox = styled(FlexBox)({
  justifyContent: 'center',
  alignItems: 'ceflex-start',
});

const FullSizeCenteredFlexBox = styled(CenteredFlexBox)({
  width: '100%',
  height: '100%',
  flexWrap: 'wrap'
});

export { FlexBox, CenteredFlexBox, FullSizeCenteredFlexBox };
