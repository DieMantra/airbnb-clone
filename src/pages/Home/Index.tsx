import ThemeSwitch from './ThemeSwitch';
import FilterSection from './components/FilterSection/Index';

function Index() {
  return (
    <>
      <FilterSection />
      <ThemeSwitch />
      <ReturnFullHeight amt={1000} />
    </>
  );
}

export default Index;

function ReturnFullHeight({ amt }: { amt: number }) {
  console.log();
  return (
    <>
      {Array.from({ length: amt }, (_, i) => (
        <div key={i}>Hello World</div>
      ))}
    </>
  );
}
