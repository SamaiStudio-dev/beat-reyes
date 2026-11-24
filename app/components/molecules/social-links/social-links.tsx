import { Icon, type IconName } from "~/components/atoms";

export type SocialLink = {
  href: string;
  label: string;
  icon: IconName;
};

type SocialLinksProps = {
  label: string;
  links: readonly SocialLink[];
};

const iconSurface: Partial<Record<IconName, string>> = {
  whatsapp: "bg-[#25D366]",
  instagram: "bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_55%,#6228d7_100%)]",
};

export function SocialLinks({ label, links }: SocialLinksProps) {
  return (
    <nav aria-label={label} className="fixed right-5 bottom-5 z-30 flex gap-3">
      {links.map((link) => (
        <a
          key={link.icon}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`inline-flex size-12 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white-smoke ${iconSurface[link.icon] ?? ""}`}
        >
          <Icon name={link.icon} className="size-6" />
        </a>
      ))}
    </nav>
  );
}
