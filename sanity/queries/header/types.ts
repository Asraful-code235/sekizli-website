export interface HeaderData {
  _id: string
  language: string
  logo: {
    asset: {
      _id: string
      url: string
      metadata: {
        lqip?: string
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  languages: string[]
  navigationItems: NavigationItem[]
  callCta: CallCta
  socialLinks?: SocialLink[]
}

export interface NavigationItem {
  title: string
  link: string
}

export interface CallCta {
  icon?: {
    asset: {
      _id: string
      url: string
    }
  }
  phone: string
}

export interface SocialLink {
  icon: {
    asset: {
      _id: string
      url: string
    }
  }
  link: string
}
