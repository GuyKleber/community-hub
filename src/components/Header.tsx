import { Link, useLocation } from "react-router-dom";
import churchHero from "@/assets/church-hero.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Beliefs", path: "/beliefs" },
  { label: "Missions", path: "/missions" },
  { label: "Our Purpose", path: "/purpose" },
  { label: "History", path: "/history" },
  { label: "Calendar", path: "/calendar" },
  { label: "Church Rental", path: "/church-rental" },
  { label: "Taco Bar Signup", path: "/taco-bar-signup" },
];

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full">
      {/* Church Name */}
      <div className="text-center py-4 border-b border-border">
        <h1 className="text-3xl md:text-4xl font-heading text-foreground tracking-wide">
          Philomath Community Church
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
