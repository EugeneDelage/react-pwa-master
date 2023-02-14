import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import useOrientation from '@/hooks/useOrientation';

// import reactLogo from './logos/react_ed.svg';
import levisLogo from './logos/levislogo.png';
import { Image } from './styled';

function Home() {
  const isPortrait = useOrientation();

  const width = isPortrait ? '30%' : '20%';
  const height = isPortrait ? '20%' : '30%';

  return (
    <>
      <Meta title="Page principale" />
      <FullSizeCenteredFlexBox flexDirection={isPortrait ? 'column' : 'row'}>
        {/* <Image alt="react" src={reactLogo} sx={{ width, height }} /> */}
        <Image alt="react" src={levisLogo} sx={{ width, height }} />        
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Home;
