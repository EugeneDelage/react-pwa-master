import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function PageRequetesCitoyennes() {
  return (
    <>
      <Meta title="Requêtes Citoyennes" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Requêtes citoyennes</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default PageRequetesCitoyennes;
