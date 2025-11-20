import Link from "next/link";

interface SidebarItem {
  label: string;
  href?: string;
  children?: SidebarItem[];
}

interface SidebarMenuProps {
  items: SidebarItem[];
}

export function SidebarMenu({ items }: SidebarMenuProps) {
  return (
    <aside className="w-full max-w-xs text-white py-4 space-y-6 border-r border-gray-500">
      <nav className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <Link
              href={item.href || "#"}
              className="font-semibold block hover:text-brand-secondary"
            >
              {item.label}
            </Link>

            {/* CHILDREN */}
            {item.children && item.children.length > 0 && (
              <ul className="text-sm space-y-2">
                {item.children.map((child, i) => (
                  <li key={i}>
                    <Link
                      href={child.href || "#"}
                      className="hover:text-brand-secondary"
                    >
                      » {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
