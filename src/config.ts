import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Valzyy',
  subtitle: 'BlogSite',
  lang: 'en',         // 'en', 'zh_CN', 'zh_TW', 'ja', 'ko'
  themeColor: {
    hue: 65,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'https://telegra.ph/file/a356a20bd2fa61aa46bf7.jpg',   // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: 'center', // Equivalent to object-position, defaults center
    credit: {
      enable: true,         // Display the credit text of the banner image
      text: '2018-2024 Valzyy',              // Credit text to be displayed
      url: ''                // (Optional) URL link to the original artwork or artist's page
    }
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'WhatsApp',
      url: 'https://wa.me/6285701479245',     // Internal links should not include the base path, as it is automatically added
      external: true,                               // Show an external link icon and will open in a new tab
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'https://telegra.ph/file/eac8d4dfc9ae80e173f14.jpg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Valzyy',
  bio: 'Content Creator || FJKT48',
  links: [
    {
      name: 'WhatsApp',
      icon: 'fa6-brands:whatsapp',       // Visit https://icones.js.org/ for icon codes
                                        // You will need to install the corresponding icon set if it's not already included
                                        // `pnpm add @iconify-json/<icon-set-name>`
      url: 'https://wa.me/6285701479245',
    },
    {
      name: 'Discord',
      icon: 'fa6-brands:discord',
      url: 'https://discord.com/users/1003187408751308851',
    },
    {
      name: 'Instagram',
      icon: 'fa6-brands:instagram',
      url: 'https://www.instagram.com/valzyycans',
    },
    {
      name: 'YouTube',
      icon: 'fa6-brands:youtube',
      url: 'https://youtube.com/@valzyofc',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
