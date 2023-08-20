import Link from 'next/link';
import { useState } from 'react';
import { MenuBookOutlined, MenuOutlined } from '@mui/icons-material';
import Image from 'next/image';


 const Navbar = () => {
  const [isOpen, setIsOpen] =
 useState(false);
  const [currentLink, setCurrentLink] = useState(false)







  const toggleMenu = () => { setIsOpen(!isOpen) };

 

  return (
    <div className='navbar' id='nav-menu'>
      <div className='nav-logo'>

        <Image alt="nav-logo" src="https://res.cloudinary.com/admitad-gmbh/image/upload/h_0.5,f_auto/ixaa8tyj24yv45cmgysl.png" height="33" width="95"/>
      </div>

      <div className='menu-button' onClick={toggleMenu}><MenuOutlined className='menu' /></div>
      <nav className={!isOpen ? 'nav-close' : 'nav-open'}>
      
        <Link href="About" className={currentLink==='about'?'nav-link_about_current':'nav-link_about'} >About</Link>
        <Link href="Events" className= {currentLink==='instructions'?'nav-link_instructions_current':'nav-link_instructions'}>Bengluru Events</Link>
        <Link href='/' className={currentLink==='home'?'nav-link_home_current':'nav-link_home'} >Home</Link>
        <Link href='/contact' className={currentLink==='contact'?'nav-link_contact_current':'nav-link_contact'} >Contact</Link>



        <Link href='/privacypolicy'>Privacy Policy</Link>
  
  
      </nav>
      <div className='changer'><MenuBookOutlined className='menu' /></div></div>
)
}




export default Navbar