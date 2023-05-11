import ThemeSwitch from './ThemeSwitch';
import FilterModal from './components/FilterModal/Index';
import FilterSection from './components/FilterSection/Index';

function Index() {
  return (
    <div>
      <FilterSection />
      <ThemeSwitch />
      <FilterModal />
    </div>
  );
}

export default Index;
