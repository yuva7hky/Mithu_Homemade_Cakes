import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Cake, BookOpen, Info } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      id: 'home',
      name: 'Home',
      icon: Home,
      path: '/',
      action: () => {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
      isActive: location.pathname === '/'
    },
    {
      id: 'cakes',
      name: 'Cakes',
      icon: Cake,
      path: '/category/cakes',
      action: () => {
        navigate('/category/cakes');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: location.pathname === '/category/cakes'
    },
    {
      id: 'menu',
      name: 'Menu',
      icon: BookOpen,
      path: '/menu',
      action: () => {
        navigate('/menu');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: location.pathname === '/menu'
    },
    {
      id: 'about',
      name: 'About',
      icon: Info,
      path: '/about',
      action: () => {
        navigate('/about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      isActive: location.pathname === '/about'
    }
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-softPink shadow-[0_-4px_20px_rgba(233,30,99,0.08)] transition-all duration-300"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Mobile Navigation"
      role="navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = item.isActive;

          return (
            <button
              key={item.id}
              onClick={item.action}
              aria-current={active ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all duration-200 group active:scale-95 focus:outline-none ${
                active ? 'text-primary' : 'text-textMuted hover:text-primary'
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                  active ? 'bg-softPink text-primary scale-110 shadow-sm' : 'text-textMuted group-hover:bg-softPink/40'
                }`}
              >
                <IconComponent size={20} strokeWidth={active ? 2.5 : 2} />
              </div>
              <span
                className={`text-[10px] mt-0.5 tracking-tight transition-all duration-200 ${
                  active ? 'font-bold text-primary scale-105' : 'font-medium text-textMuted group-hover:text-primary'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
