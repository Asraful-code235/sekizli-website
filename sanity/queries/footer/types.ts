export interface FooterData {
  _id: string
  language: string
  logo?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  craneImage?: {
    asset: {
      _id: string
      url: string
    }
  }
  copyrightText?: string
  socialLinks?: {
    platform: string
    url: string
    icon?: string
  }[]
  supportPhone?: string
  sections?: {
    title: string
    links?: {
      label: string
      url: string
    }[]
  }[]
  contact?: {
    address?: string
    phones?: string[]
  }
}

