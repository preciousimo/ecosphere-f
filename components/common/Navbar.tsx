// components/common/Navbar.tsx
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { MinusIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Waste Reduction', href: '/waste-reduction' },
    { name: 'Energy Dashboard', href: '/energy-dashboard' },
    { name: 'Community', href: '/community' },
  ]

  return (
    <nav className="bg-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-white text-xl font-bold">EcoSphere</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        router.pathname === item.href
                          ? 'bg-primary text-white'
                          : 'text-gray-300 hover:bg-primary hover:text-white'
                      } px-3 py-2 rounded-md text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button className="bg-primary hover:bg-primary-light text-white font-bold py-2 px-4 rounded">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
