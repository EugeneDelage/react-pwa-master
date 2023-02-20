import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

function Home() {
  const isPortrait = useOrientation();

  return (
    <>
      <Meta title="Page principale" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Home;
