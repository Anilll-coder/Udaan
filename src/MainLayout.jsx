// MainLayout.jsx or App.jsx
import SiteLanguageDropdown from '../components/SiteLanguage.jsx';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="relative w-full h-full">
      <header className="flex items-center justify-end p-4">
        <SiteLanguageDropdown />
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  );
}

export default MainLayout