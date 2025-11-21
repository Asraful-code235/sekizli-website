import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

type IntroFeatureSectionProps = {
  title: string;
  subtitle: string;
  image: string; // local or remote
  items: {
    label: string;
    href: string;
  }[];
};

export default function IntroFeatureSection({
  title,
  subtitle,
  image,
  items,
}: IntroFeatureSectionProps) {
  return (
    <section className='bg-white rounded-3xl p-10 lg:p-16'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
        {/* LEFT SIDE IMAGE */}
        <div className='relative'>
          <img
            src={image}
            alt='section-image'
            className='w-full h-auto rounded-xl object-cover'
          />
        </div>

        {/* RIGHT SIDE TEXT */}
        <div>
          <h2 className='text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-6'>
            {title}
          </h2>

          <p className='text-lg text-gray-700 mb-10'>{subtitle}</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {items.map((item, i) => (
              <a
                href={item.href}
                key={i}
                className='flex items-center gap-2 text-gray-700 hover:text-brand-primary transition'
              >
                <div className='group flex items-center rounded-full border hover:bg-brand-primary/80 p-2'>
                  <ChevronRightIcon
                    className='
                           text-muted-foreground
                           pointer-events-none
                           size-4
                           shrink-0
                           translate-y-0.5
                           transition-transform
                           duration-300
                           group-hover:text-white
                           
                           '
                  />
                </div>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
