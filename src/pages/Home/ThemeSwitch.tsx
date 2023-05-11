import { useTheme } from 'mantra-theme-switcher';
function ThemeSwitch() {
  const { toggleTheme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        bottom: '0',
        left: '0',
        fontSize: '1rem',
      }}
    >
      <button
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          padding: '1rem',
        }}
        onClick={toggleTheme.bind(null, 'dark')}
      >
        Dark
      </button>
      <button
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          padding: '1rem',
        }}
        onClick={toggleTheme.bind(null, 'light')}
      >
        light
      </button>
    </div>
  );
}
export default ThemeSwitch;
