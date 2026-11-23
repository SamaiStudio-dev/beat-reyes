import { Link } from "react-router";
import { Button } from "~/components/atoms";

export type FooterLink = {
  label: string;
  to: string;
};

type FooterProps = {
  brand: string;
  homeTo: string;
  links: FooterLink[];
  note: string;
  label: string;
  edgeSrc?: string;
  edgeAlt?: string;
};

export function Footer({ brand, homeTo, links, note, label, edgeSrc, edgeAlt = "" }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer aria-label={label} className={`bg-black ${edgeSrc ? "" : "border-t border-white-smoke/15"}`}>
      {edgeSrc ? <img src={edgeSrc} alt={edgeAlt} className="block w-full" /> : null}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-36 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <Link to={homeTo} className="text-xl font-bold text-white-smoke">
            {brand}
          </Link>
          <p className="mt-3 max-w-sm text-sm text-silver">{note}</p>
        </div>
        <ul className="flex flex-col gap-3 sm:items-end">
          {links.map((link) => (
            <li key={link.to}>
              <Button variant="link" to={link.to} size="sm">
                {link.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl px-5 pb-12 text-xs text-silver sm:px-8">
        © {year} {brand}
      </p>
    </footer>
  );
}
