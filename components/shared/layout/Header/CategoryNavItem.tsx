import Link from "next/link";

interface CategoryNavItemProps {
  label: string;
  href: string;
  position?: "left" | "right";
}

export default function CategoryNavItem({
  label,
  href,
  position = "right",
}: CategoryNavItemProps) {
  const isLeft = position === "left";

  return (
    <Link
      href={href}
      className={`
        block relative text-[10px] md:text-[13px] tracking-wider font-semibold group max-w-[164px] leading-4
        text-gray-300 hover:text-white transition-colors pb-2 opacity-80 hover:opacity-100 border-b-2 border-dashed border-gray-500
        ${isLeft ? "text-left" : "text-right"}
      `}
    >
      <span className="relative z-10">{label}</span>
      <span
        className="
          block h-0.5 bg-brand-secondary 
          absolute -bottom-1 
          w-0 group-hover:w-full
          transition-all duration-300
        "
      ></span>
    </Link>
  );
}
