import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface FeatureProps {
  title: string
  description: string
  icon?: string
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
}

interface FeaturesProps {
  features?: FeatureProps[]
}

function Feature({ title, description, icon, image }: FeatureProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      {image && (
        <div className="mb-4 relative h-48">
          <Image
            src={urlFor(image.asset).url()}
            alt={title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      {icon && (
        <div className="text-4xl mb-4">{icon}</div>
      )}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export function Features({ features }: FeaturesProps) {
  if (!features || features.length === 0) return null

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}