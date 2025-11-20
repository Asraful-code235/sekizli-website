"use client";

import { CategoryCard } from "@/features/home/components/CategoryCard";
import { CategorySectionData } from "@/features/home/types";
import { urlFor } from "@/sanity/lib/image";

interface CategorySectionProps {
  data?: CategorySectionData;
}

export function CategorySection({ data }: CategorySectionProps) {
  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 w-full">
          {data.categories.map((category) => {
            const mainImageUrl = category.image?.asset
              ? urlFor(category.image.asset)?.url() || ""
              : "";

            const listItems = category.listItems.map((item) => ({
              title: item.title,
              link: item.link,
              image: item.image?.asset
                ? urlFor(item.image.asset)?.url() || undefined
                : undefined,
            }));

            return (
              <CategoryCard
                key={category._key}
                highlight={category.highlight}
                title={category.title}
                bgColor={category.bgColor}
                image={mainImageUrl}
                position={category.position}
                listItems={listItems}
                descriptions={category.descriptions}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
