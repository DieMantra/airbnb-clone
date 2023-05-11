import { useState } from 'react';
import icons from '../../../../assets/icons.json';
import Container from '../../../../components/Layout/Container';
import Icon from './Icon';
import IconContainer from './IconContainer';

function Index() {
  const [activeId, setActiveId] = useState('');
  const handleUpdateActiveId = (e: string) => {
    setActiveId(e);
  };

  return (
    <Container marginInlineAuto>
      <IconContainer setActiveId={handleUpdateActiveId}>
        {icons.map((iconUrl) => {
          return (
            <Icon
              key={iconUrl}
              dataId={iconUrl.split('.')[0]}
              src={`/icons/sorting/${iconUrl}`}
              title={iconUrl.split('.')[0]}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          );
        })}
      </IconContainer>
      {'ACTIVE: ' + activeId}
    </Container>
  );
}
export default Index;
