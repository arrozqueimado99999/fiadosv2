import { useState } from 'react';
import BtnSolid from './components/buttons/BtnSolid';
import { HiMenu } from 'react-icons/hi';
import SideBar from './SideBar';

function MainNav() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div>
      <nav className="bg-neutral-900 text-white w-full h-12 flex justify-between items-center p-2">
        <span className="sm:hidden">
          <BtnSolid icon={<HiMenu />} click={toggleNav} />
        </span>
      </nav>
    </div>
  );
}

export default MainNav;
