/**
 * Example script to create initial homepage documents in Sanity
 * Run this in Sanity Studio Vision or create documents manually
 */

// English Homepage
const englishHomepage = {
  _type: "page",
  language: "en",
  pageKey: "homepage",
  pageTitle: "Homepage (English)",

  sections: [
    {
      _type: "heroSection",
      _key: "hero-1",
      title: "Hassasiyet\ndenge ve\ngüvenin adresi;",
      subtitle: "1987'den beri\nSekizli Vinç",
      ctaText: "İletişime Geçin",
      ctaLink: "/contact",
      slides: [
        {
          _key: "slide-1",
          mediaType: "image",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "YOUR_IMAGE_ASSET_ID", // Replace with actual uploaded image ID
            },
            alt: "Sekizli crane service hero image",
          },
        },
        {
          _key: "slide-2",
          mediaType: "video",
          video: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: "YOUR_VIDEO_ASSET_ID", // Replace with actual uploaded video ID
            },
          },
          videoPoster: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "YOUR_POSTER_IMAGE_ID", // Replace with poster image ID
            },
          },
        },
      ],
    },
  ],

  // SEO Configuration
  seoTitle: "Sekizli Vinç - Crane Services Since 1987",
  seoDescription:
    "Professional crane services with precision, balance, and trust. Serving since 1987.",
  seoKeywords: [
    "crane services",
    "vinç",
    "construction",
    "lifting equipment",
    "Turkey",
  ],

  ogTitle: "Sekizli Vinç - Professional Crane Services",
  ogDescription:
    "Expert crane services with over 35 years of experience. Precision, balance, and trust.",
  ogImage: {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: "YOUR_OG_IMAGE_ID", // Replace with OG image ID (1200x630px)
    },
    alt: "Sekizli Crane Services",
  },

  twitterCard: "summary_large_image",
  noIndex: false,
  noFollow: false,
};

// Turkish Homepage
const turkishHomepage = {
  _type: "page",
  language: "tr",
  pageKey: "homepage",
  pageTitle: "Ana Sayfa (Türkçe)",

  sections: [
    {
      _type: "heroSection",
      _key: "hero-1",
      title: "Hassasiyet\ndenge ve\ngüvenin adresi;",
      subtitle: "1987'den beri\nSekizli Vinç",
      ctaText: "İletişime Geçin",
      ctaLink: "/iletisim",
      slides: [
        {
          _key: "slide-1",
          mediaType: "image",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "YOUR_IMAGE_ASSET_ID",
            },
            alt: "Sekizli vinç hizmetleri ana görsel",
          },
        },
      ],
    },
  ],

  seoTitle: "Sekizli Vinç - 1987'den Beri Vinç Hizmetleri",
  seoDescription:
    "Hassasiyet, denge ve güven ile profesyonel vinç hizmetleri. 1987'den beri hizmetinizdeyiz.",
  seoKeywords: [
    "vinç hizmetleri",
    "kule vinç",
    "inşaat",
    "kaldırma ekipmanları",
    "Türkiye",
  ],

  ogTitle: "Sekizli Vinç - Profesyonel Vinç Hizmetleri",
  ogDescription:
    "35 yılı aşkın deneyimi ile uzman vinç hizmetleri. Hassasiyet, denge ve güven.",

  twitterCard: "summary_large_image",
  noIndex: false,
  noFollow: false,
};

// Arabic Homepage
const arabicHomepage = {
  _type: "page",
  language: "ar",
  pageKey: "homepage",
  pageTitle: "الصفحة الرئيسية (عربي)",

  sections: [
    {
      _type: "heroSection",
      _key: "hero-1",
      title: "عنوان الدقة\nالتوازن والثقة",
      subtitle: "سيكيزلي رافعة\nمنذ عام 1987",
      ctaText: "اتصل بنا",
      ctaLink: "/ar/contact",
      slides: [
        {
          _key: "slide-1",
          mediaType: "image",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "YOUR_IMAGE_ASSET_ID",
            },
            alt: "خدمات الرافعات سيكيزلي",
          },
        },
      ],
    },
  ],

  seoTitle: "سيكيزلي رافعة - خدمات الرافعات منذ 1987",
  seoDescription:
    "خدمات رافعات احترافية بدقة وتوازن وثقة. نخدمكم منذ عام 1987.",
  seoKeywords: ["خدمات الرافعات", "رافعة", "بناء", "معدات الرفع", "تركيا"],

  twitterCard: "summary_large_image",
  noIndex: false,
  noFollow: false,
};

// Russian Homepage
const russianHomepage = {
  _type: "page",
  language: "ru",
  pageKey: "homepage",
  pageTitle: "Главная страница (Русский)",

  sections: [
    {
      _type: "heroSection",
      _key: "hero-1",
      title: "Адрес точности\nбаланса и доверия",
      subtitle: "Sekizli Кран\nс 1987 года",
      ctaText: "Связаться с нами",
      ctaLink: "/ru/contact",
      slides: [
        {
          _key: "slide-1",
          mediaType: "image",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: "YOUR_IMAGE_ASSET_ID",
            },
            alt: "Услуги кранов Sekizli",
          },
        },
      ],
    },
  ],

  seoTitle: "Sekizli Кран - Услуги кранов с 1987 года",
  seoDescription:
    "Профессиональные услуги кранов с точностью, балансом и доверием. Обслуживаем с 1987 года.",
  seoKeywords: [
    "услуги кранов",
    "кран",
    "строительство",
    "подъемное оборудование",
    "Турция",
  ],

  twitterCard: "summary_large_image",
  noIndex: false,
  noFollow: false,
};

/**
 * INSTRUCTIONS
 *
 * 1. Go to Sanity Studio (usually http://localhost:3333)
 * 2. Navigate to Pages > Homepage
 * 3. Click "Create" to create a new homepage document
 * 4. Copy the relevant language object above
 * 5. Fill in the fields in Sanity Studio based on the structure
 * 6. Upload your images/videos first, then reference them in the slides
 * 7. Save and publish
 *
 * OR use Sanity CLI/API to import:
 *
 * import sanityClient from '@sanity/client'
 *
 * const client = sanityClient({
 *   projectId: 'your-project-id',
 *   dataset: 'production',
 *   token: 'your-write-token',
 *   useCdn: false
 * })
 *
 * // Create documents
 * client.create(englishHomepage).then(console.log)
 * client.create(turkishHomepage).then(console.log)
 * client.create(arabicHomepage).then(console.log)
 * client.create(russianHomepage).then(console.log)
 */

export { englishHomepage, turkishHomepage, arabicHomepage, russianHomepage };
