import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Valzzyy',
  subtitle: 'Blog Site',
  lang: 'en',
  themeHue: 250,
  banner: {
    enable: true,
    src: 'assets/images/demo-banner.png',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'WhatsApp',
      url: 'https://wa.me/6285701479245',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/demo-avatar.png',
  name: 'Valzyy`',
  bio: 'Hanya Manusia Biasa yang sedang mengejar Impian.',
  links: [
    {
      name: 'WhatsApp',
      icon: 'fa6-brands:whatsapp',
      url: 'https://wa.me/6285701479245',
    },
    {
      name: 'Instagram',
      icon: 'fa6-brands:instagram',
      url: 'https://instagram.com/@zurakonter',
    },
    {
      name: 'Discord',
      icon: 'fa6-brands:Discord',
      url: 'https://discord.com/users/1003187408751308851',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
