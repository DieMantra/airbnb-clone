import { useState } from 'react';
import ThemeSwitch from './ThemeSwitch';
import FilterModal from './components/FilterModal/Index';
import FilterSection from './components/FilterSection/Index';

function Index() {
  const [isOpen, setIsOpen] = useState(false);

  const test = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <FilterSection />
      <ThemeSwitch />
      <button onClick={setIsOpen.bind(null, true)}>Open</button>
      <FilterModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <button
          style={{
            backgroundColor: 'red',
            width: '100px',
            height: '100px',
          }}
          onClick={test}
        >
          close
        </button>
      </FilterModal>
    </div>
  );
}

export default Index;
