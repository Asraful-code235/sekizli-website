'use client';

import { CategoryCard } from "@/features/home/components/CategoryCard";


export function CategorySection() {
  return (
    <section className='py-16'>
      <div className=''>
        <div className='grid md:grid-cols-2 gap-8'>
          {/* Section 1 */}
          <CategoryCard
            highlight='Electric'
            title='Crane Systems'
            bgColor='bg-[#0f766e]'
            image='/elektirik.png'
            position='left'
            list={[
              "OVERHEAD TRAVELING CRANES",
              "LIFTING GROUPS",
              "GANTRY CRANES",
              "JIB CRANES",
              "SPECIAL PROCESS CRANES",
              "CABIN CRANES",
            ]}
            listImages={[
              "/elektirik.png",
              "/kancablokları.png",
              "/elektirik.png",
              "/kancablokları.png",
              "/elektirik.png",
              "/kancablokları.png",
            ]}
            description={[
              "Strong carrying capacity,",
              "Horizontal and vertical maneuverability,",
              "Electric and manual operation option,",
              "User-friendly electric crane systems offering easy",
              "operation with remote control",
            ]}
          />

          {/* Section 2 */}
          <CategoryCard
            highlight='Spare'
            title='Parts'
            bgColor='bg-[#3f3f3f]'
            image='/kancablokları.png'
            list={["CRANE SPARE PARTS"]}
            listImages={[
              "/elektirik.png",
            ]}
            description={[
              "Strong Durability",
              "Adaptability in All Directions,",
              "High Performance,",
              "5,000+ Spare Parts",
              "Easy Installation and Use Crane Spare Parts",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
