import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ title }: { title: string[] }) {
  return (
    <div className='border-b border-b-gray-300 w-full pb-3'>
      <nav className='flex items-center text-sm gap-2'>
        {/* Home */}
        <Link href='/' className='text-lg text-gray-600'>
          Sekizli Machine & Crane
        </Link>

        {title.map((item, i) => {
          const isLast = i === title.length - 1;

          return (
            <div key={i} className='flex items-center gap-2'>
              <ChevronRight className='w-4 h-4 text-gray-400' />

              {!isLast ? (
                <span className='text-lg text-gray-600 capitalize'>{item}</span>
              ) : (
                <span className='text-lg font-semibold text-gray-900 capitalize'>
                  {item}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
