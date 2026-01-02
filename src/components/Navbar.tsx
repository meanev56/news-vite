import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Search, X } from 'lucide-react';
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser
} from '@clerk/clerk-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Business', href: '/' },
  { name: 'Banking', href: '/banking' },
  { name: 'Economy', href: '/' },
  { name: 'Markets', href: '/markets' },
  { name: 'Technology', href: '/' },
  { name: 'Sports', href: '/sports' },
  { name: 'About Us', href: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();


  return (
    <nav className="bg-[#0A2647] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            Nairametrics
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#144272] transition-colors ${
                  location.pathname === item.href && item.href !== '/'
                    ? 'bg-[#144272]'
                    : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
              className="hover:bg-[#144272]"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  className="hidden md:inline-flex hover:bg-[#144272]"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <span className="hidden md:inline text-sm font-medium">
                Hi, {user?.firstName}
              </span>

              <Link
                to="/dashboard"
                className="hidden md:inline-flex px-3 py-2 text-sm font-medium hover:bg-[#144272] rounded-md"
              >
                Dashboard
              </Link>

              <UserButton afterSignOutUrl="/" />
          </SignedIn>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-[#144272]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="py-3 border-t border-[#144272]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#144272]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 rounded-md hover:bg-[#205295]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="block w-full text-left px-3 py-2 hover:bg-[#205295]">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="px-3 py-2 text-sm text-white/80">
                Signed in as {user?.fullName}
              </div>

              <Link
                to="/dashboard"
                className="block px-3 py-2 hover:bg-[#205295]"
              >
                Dashboard
              </Link>
          </SignedIn>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
