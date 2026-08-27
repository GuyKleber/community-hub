import { Link, useLocation } from "react-router-dom";
import churchHero from "@/assets/church-hero.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Missions", path: "/missions" },
  { label: "Calendar", path: "/calendar" },
  { label: "This Week", path: "/this-week" },
  { label: "Legacy Sunday", path: "/legacy-sunday" },
  { label: "Women's Tea", path: "/womens-tea" },
  { label: "Newsletter", path: "/newsletter" },
  { label: "Church Rental", path: "/church-rental" },
];

const Header = () => {
  const location = useLocation();
  const { content: siteSettings } = useSiteContent("siteSettings");

  return (
    <header className="w-full">
      {/* Church Name */}
      <div className="text-center py-4 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-heading text-foreground tracking-wide">
          {siteSettings.churchName}
        </h1>
      </div>

      {/* Hero Image */}
      <div className="relative w-full max-w-4xl mx-auto px-4 py-4">
        <img
          src={churchHero}
          alt="Philomath Community Church building"
          className="w-full h-auto rounded shadow-md"
        />
      </div>

      {/* Navigation */}
      <nav className="bg-nav-bg">
        <div className="max-w-4xl mx-auto px-4">
          <ul className="flex flex-wrap justify-center gap-1 md:gap-2 py-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
