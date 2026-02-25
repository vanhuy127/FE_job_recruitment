import { lazy, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { Menu, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { ROLE } from '@/constants';
import { ROUTE_PATH } from '@/constants/router';
import { useAuthService } from '@/service/auth.service';
import { useAuthStore } from '@/store';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const ThemeControl = lazy(() => import('@/components/themeControl'));

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const { logout } = useAuthService();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
  });

  const navigationItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Công việc', href: '/products' },
    { name: 'Đối tác', href: '/services' },
  ];

  const userMenuItems = {
    [ROLE.ADMIN]: [{ name: 'Trang quản trị', href: ROUTE_PATH.ADMIN.DASHBOARD }],
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center space-x-2">
              <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Yuh<span className="text-cyan-600 dark:text-cyan-400">nav</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group relative text-sm font-medium text-slate-600 transition-all duration-200 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-300 transition-all duration-300 group-hover:w-full dark:bg-cyan-400"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center space-x-3 md:flex">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-4 w-4" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="min-w-30">
                  <DropdownMenuLabel className="text-center">
                    Xin chào, {user.email ? user.email : 'user'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userMenuItems[user.role].map((item) => (
                    <DropdownMenuItem key={item.name} className="flex cursor-pointer items-center justify-center">
                      <Link to={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem
                    className="text-destructive flex cursor-pointer items-center justify-center"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
              >
                <Link to={ROUTE_PATH.AUTH.LOGIN}>Đăng nhập</Link>
              </Button>
            )}
            <ThemeControl />
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeControl />

            <button onClick={() => setIsOpen(!isOpen)} className="bg-muted hover:bg-muted/70 rounded-lg p-2 transition">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-border bg-background/95 animate-in fade-in border-t backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-3 px-4 py-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-foreground/70 hover:text-primary text-center font-medium transition"
                >
                  {item.name}
                </a>
              ))}
              {user ? (
                <Button
                  onClick={() => logoutMutation.mutate()}
                  className="bg-destructive text-destructive-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
                >
                  Đăng xuất
                </Button>
              ) : (
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-accent rounded-lg px-6 py-2 font-medium transition"
                >
                  <Link to={ROUTE_PATH.AUTH.LOGIN} onClick={() => setIsOpen(false)}>
                    Đăng nhập
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
