// components/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown } from 'lucide-react'; // Assuming lucide-react for icons; install if needed: npm install lucide-react

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Sample cart item count; in real app, use context or state management like Redux/Zustand
  const cartCount: number = 0; // Replace with actual cart count logic

  // Sample drone categories; adjust as needed
  const droneCategories = [
    { name: 'Racing Drones', href: '/products/racing' },
    { name: 'Photography Drones', href: '/products/photography' },
    { name: 'Professional Drones', href: '/products/professional' },
    { name: 'Accessories', href: '/products/accessories' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-black">
          DroneDT
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="text-black hover:text-gray-600 flex items-center">
              Products
              <ChevronDown size={16} className="ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-2 w-48">
                {droneCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2 text-black hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/cart" className="text-black hover:text-gray-600 flex items-center">
            <ShoppingCart size={20} className="mr-1" />
            Cart ({cartCount})
          </Link>
          <Link href="/checkout" className="text-black hover:text-gray-600">
            Checkout
          </Link> {/* Placeholder for payment gateway integration; adjust later */}
          <Link href="/login" className="text-black hover:text-gray-600">
            Login
          </Link>
          <Link href="/register" className="text-black hover:text-gray-600">
            Register
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <div>
              <button
                className="text-black hover:text-gray-600 flex items-center w-full justify-between"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Products
                <ChevronDown size={16} className={`ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {droneCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block text-black hover:text-gray-600"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/cart" className="text-black hover:text-gray-600 flex items-center" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCart size={20} className="mr-1" />
              Cart ({cartCount})
            </Link>
            <Link href="/checkout" className="text-black hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Checkout
            </Link> {/* Placeholder for payment gateway */}
            <Link href="/login" className="text-black hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link href="/register" className="text-black hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;