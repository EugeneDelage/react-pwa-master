import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function PageDemandesElus() {
  return (
    <>
      <Meta title="Demandes Elus" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Demandes Élus</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageDemandesElus;
