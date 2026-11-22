import { useEffect, useState } from "react";
import { Link } from "react-router";

export type NavbarLink = {
  label: string;
  to: string;
};

type NavbarProps = {
  brand: string;
  homeTo: string;
  links: NavbarLink[];
};

export function Navbar({ brand, homeTo, links }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="relative z-50 flex items-center justify-between bg-coffee-bean/45 px-5 py-4 backdrop-blur-md sm:px-8"
        aria-label="Principal"
      >
        <Link
          to={homeTo}
          className="text-xl font-bold text-white-smoke sm:text-2xl"
          onClick={close}
        >
          {brand}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-base text-white-smoke transition-colors hover:text-neon-grass"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded text-white-smoke lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <MenuIcon open={open} />
        </button>
      </nav>

      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex-col justify-center bg-coffee-bean px-8 lg:hidden ${open ? "flex" : "hidden"}`}
      >
        <ul className="flex flex-col gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-4xl font-bold text-white-smoke transition-colors hover:text-neon-grass"
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      {open ? (
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
