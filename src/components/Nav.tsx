// src/components/Nav.tsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from './Nav.module.css'
import Link from 'next/link';

const NavLinks = () => {
    return (
        <>
            <Link className={styles.NavLinks} href="/[genre]" as="/action">Action</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/adventure">Adventure</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/animation">Animation</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/comedy">Comedy</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/crime">Crime</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/drama">Drama</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/fantasy">Fantasy</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/horror">Horror</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/mystery">Mystery</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/romance">Romance</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/sci-fy">Sci-Fy</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/thriller">Thriller</Link>
            <Link className={styles.NavLinks} href="/[genre]" as="/documentary">Documentary</Link>
        </>
    );
}

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
        <nav className="flex justify-end">
            <div className="hidden w-full justify-between lg:flex">
                <NavLinks />
            </div>
            <div className="lg:hidden">
                <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
            </div>
        </nav>
        {isOpen && (
            <div className="flex flex-col items-center basis-full">
                <NavLinks/>
            </div>
        )}
    </>
    );
};

export default Nav;