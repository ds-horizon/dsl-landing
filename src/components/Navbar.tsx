import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Featured Projects", href: "/#featured-projects" },
    { name: "Upcoming Projects", href: "/#upcoming-projects" },
    { name: "Community", href: "/#community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-md shadow-md border-b border-border/50"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="./lovable-uploads/9f532731-868c-4fe5-93e2-734f0b13849b.png" 
            alt="DreamSportsLabs Logo" 
            className="h-8 w-8"
          />
          <span className="font-bold text-xl md:text-2xl flex items-center">
            Dream<span className="text-gradient relative">SportsLabs</span>
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-yellow-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ${isScrolled ? 'opacity-100' : 'opacity-70'}`}></span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-4 transition-all duration-500 ${isScrolled ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}>
          {navLinks.map((link, index) => (
            link.href.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.href}
                className="nav-link text-foreground/80 hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link text-foreground/80 hover:text-foreground transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            )
          ))}
          <a
            href="https://github.com/ds-horizon"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="social-icon-hover"
          >
            <Github className="h-5 w-5 text-foreground/80 hover:text-foreground transition-colors duration-300" />
          </a>
          <div className="transition-transform duration-300 hover:rotate-12">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="relative"
          >
            <span className={`absolute inset-0 bg-primary/10 rounded-full scale-0 transition-transform duration-300 ${isMobileMenuOpen ? 'scale-100' : ''}`}></span>
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 relative z-10" />
            ) : (
              <Menu className="h-6 w-6 relative z-10" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 transform transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="container mx-auto px-4 flex flex-col gap-6 py-8">
          {navLinks.map((link, index) => (
            link.href.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.href}
                className="text-xl py-3 border-b border-border relative overflow-hidden group"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-xl py-3 border-b border-border relative overflow-hidden group"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 100}ms`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            )
          ))}
          <a
            href="https://github.com/dreamsportslabs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-3 border-b border-border group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Github className="h-5 w-5 group-hover:text-primary transition-colors duration-300" />
            <span className="group-hover:text-primary transition-colors duration-300">GitHub</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;