"use client";

import { CategoryCard } from "@/features/home/components/CategoryCard";

export function CategorySection() {
  return (
    <section className="py-12">
      <div className="w-full">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 w-full">
          {/* Section 1 */}
          <CategoryCard
            highlight="Electric"
            title="Crane Systems"
            bgColor="bg-brand-primary"
            image="/elektirik.png"
            position="left"
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
            highlight="Spare"
            title="Parts"
            bgColor="bg-[#3f3f3f]"
            image="/kancablokları.png"
            list={["CRANE SPARE PARTS"]}
            listImages={["/elektirik.png"]}
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
