import styles from './Home.module.scss';
import ThemeSwitch from './ThemeSwitch';
import FilterSection from './components/FilterSection/Index';
import Header from './components/Header/Index';

function Index() {
  return (
    <div className={styles.homeContainer}>
      <Header />
      <FilterSection />
      <ThemeSwitch />
      <ReturnFullHeight amt={1000} />
    </div>
  );
}

export default Index;

function ReturnFullHeight({ amt }: { amt: number }) {
  return (
    <>
      <div>hdakshdksfasfsaaf</div>
      {Array.from({ length: amt }, (_, i) => (
        <div key={i}>Hello World</div>
      ))}
    </>
  );
}
