// src/components/Header.tsx
import Image from 'next/image';
import Nav from "./Nav";
import Link from 'next/link';
import LogoImage from '../styles/logo.png'

const Header = () => {
    return (
        <header className="bg-back_header sticky top-0 flex-wrap z-[20] w-full mx-auto flex items-center justify-between p-5 box-border">
            <Link href="/" className="h-8 w-12">
                <Image src={LogoImage} alt='Logo' className=''/>
            </Link>
            <h1 className='text-xl font-bold italic text-title'>Cinema 4D</h1>
            <Nav/>
        </header>
    );
};

export default Header;