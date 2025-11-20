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
        block relative text-xs tracking-wider font-medium group
        text-gray-300 hover:text-white transition-colors py-1
        ${isLeft ? "text-left" : "text-right"}
      `}
    >
      {/* Text */}
      <span className='relative z-10'>{label}</span>



      {/* Underline */}
      <span
        className='
          block h-0.5 bg-yellow-300 
          absolute -bottom-1 
          w-0 group-hover:w-full
          transition-all duration-300
        '
      ></span>
    </Link>
  );
}
