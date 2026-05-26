import {
  BlogPost,
  DisplayStat,
  FooterContact,
  LegalPageContent,
  NavLink,
  ProductCard
} from '../models/site-content';

export const SITE_TITLE = 'lumocast';

export const SITE_LOGO = 'assets/lumocast-logo.jpeg';
export const IQ_WORLD_LINK =
  'https://play.google.com/store/apps/details?id=com.iqw.iqworld_mobile';
export const HERO_BACKGROUND =
  //  './assets/can 6.png';
  'https://static.wixstatic.com/media/157f6f_d128077e01aa4f2585bf31e20264cd95~mv2.jpg/v1/fill/w_1200,h_790,al_c,q_85,enc_avif,quality_auto/157f6f_d128077e01aa4f2585bf31e20264cd95~mv2.jpg';
export const HERO_SHOWCASE = './assets/can 1.png';
export const ABOUT_IMAGE =
  //  './assets/can 6.png';
  'https://static.wixstatic.com/media/157f6f_c7f9c02edc434a29ab918e170561d723~mv2.jpg/v1/fill/w_998,h_686,al_c,q_85,enc_avif,quality_auto/glass_screen_protector-side-angle.jpg';
export const DISPLAY_IMAGE = './assets/can 7.png';
export const IQ_WORLD_IMAGE = './assets/can 3.png';
export const TECHNOLOGY_HERO_IMAGE = './assets/can 2.png';
export const TECHNOLOGY_MOBILE_IMAGE = './assets/mobileapp.png';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', route: '/' },
  { label: 'Technology', route: '/technology' },
  { label: 'Blog', route: '/blog' },
  { label: 'Contact', route: '/contact' }
];

export const DISPLAY_STATS: DisplayStat[] = [
  { value: '16.7 M', label: 'Colours' },
  { value: '380 Nits', label: 'LED Brightness' }
];

export const PRODUCTS: ProductCard[] = [
  {
    name: 'LUMOCASTLit',
    tagline: 'Best and brightest.',
    image: './assets/can 4.png'
  },
  {
    name: 'LUMOCASTMount',
    tagline: 'True-to-life display.',
    image: './assets/can 5.png'
  },
  {
    name: 'LUMOCASTVue',
    tagline: 'Immersive viewing for premium spaces.',
    image: './assets/can 6.png'
  },
  {
    name: 'LUMOCASTWid',
    tagline: 'See all the details.', image: './assets/can 8.png'
  },
  {
    name: 'LUMOCASTPro',
    tagline: 'Multitask your best.',
    image: './assets/can 9.png'
  },
  {
    name: 'LUMOCASTWalk',
    tagline: 'Walk your best.',
    image: './assets/can 10.png'
  },
  {
    name: 'LUMOCASTDesk',
    tagline: 'Interaction For Desk.',
    image: './assets/can 11.png'
  },
  {
    name: 'LUMOCASTTent',
    tagline: 'Interactive Tent for Desk.',
    image: './assets/can 12.png'
  },
  {
    name: 'LUMOCASTWid',
    tagline: 'Interaction For Desk.',
    image: './assets/can 13.png'
  },
  {
    name: 'LUMOCASTDesk Tab',
    tagline: 'Marketing at Desk.',
    image: './assets/can 14.png'
  },
  {
    name: 'LUMOCASTDesk Mount',
    tagline: 'Interaction on Wall.',
    image: './assets/can 19.png'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Empower Your Digital Signage Experience with IQ World India Ka IQ',
    excerpt:
      'In today’s fast-paced digital world, seamless content management and screen control are crucial for businesses and organizations.',
    image: './assets/can 15.png',
    publishedOn: 'March 7, 2025'
  },
  {
    title: 'The Power of Interactive Desktop Digital Displays',
    excerpt:
      'Interactive digital displays help brands capture attention in fast-moving retail and consumer environments.',
    image: './assets/can 17.png',
    publishedOn: 'March 1, 2025'
  },
  {
    title: 'The Impact of Digital Displays on Marketing',
    excerpt:
      'Digital displays have become a strong way to improve visibility, messaging, and audience engagement.',
    image: './assets/can 18.png',
    publishedOn: 'March 1, 2025'
  }
];

export const LEGAL_LINKS: NavLink[] = [
  {
    label: 'Warranty Policy',
    route: '/privacy-policy'
  },
  {
    label: 'IQ World T&C',
    route: '/privacy-policy-1'
  },
  {
    label: 'Technical Requirement',
    route: '/terms-and-coniditions'
  }
];

export const LEGAL_PAGE_CONTENT: Record<string, LegalPageContent> = {
  warranty: {
    title: 'Warranty Policy',
    label: 'LUMOCAST T&C',
    intro:
      'We offer a 1 year warranty for our product starting from the activation date. This page keeps the main warranty terms clear and easy to review inside the application.',
    note:
      'Service work for issues outside this coverage may include additional charges.',
    highlights: [
      '1 year product warranty from activation date',
      'Software misuse and unauthorized modifications are excluded',
      'Out-of-warranty repairs may require extra service charges'
    ],
    facts: [
      { label: 'Coverage window', value: '1 year from activation' },
      { label: 'Applies to', value: 'Product warranty and software usage conditions' },
      { label: 'Service note', value: 'Non-covered items may include added fees' }
    ],
    sections: [
      {
        title: 'Warranty Period',
        paragraphs: [
          'For our product, we offer a 1 year warranty starting on the activation date.'
        ]
      },
      {
        title: 'User Responsibility For Supplied Software',
        bullets: [
          'The customer must abide by technological restrictions on the software and use it only as intended.',
          'Customers must not circumvent software limits, reverse engineer, decompile, or disassemble the programme.',
          'Customers must not duplicate the software beyond the amount indicated in the agreement or make the software publicly available for replication.'
        ]
      },
      {
        title: 'Items Not Covered',
        paragraphs: [
          'Defects arising from improper modifications, abuse, misuse, or usage for non-intended purposes are not covered by this software warranty.',
          'For items that are not covered by warranty, appropriate extra fees will be assessed.'
        ]
      }
    ]
  },
  'iq-world': {
    title: 'IQ World T&C',
    label: 'LUMOCAST T&C',
    intro:
      'This page combines the main IQ World privacy, platform usage, and license terms so users can review the core conditions directly inside your app.',
    note:
      'The original source also includes privacy-policy language alongside the IQ World software terms.',
    highlights: [
      'Explains what user and customer data IQ World collects',
      'Describes how platform data is used, stored, and shared',
      'Lists software usage limits and out-of-warranty conditions'
    ],
    facts: [
      { label: 'Applies to', value: 'IQ World platform, website, and software portal' },
      { label: 'Data types', value: 'PII, platform uploads, cookies, and usage records' },
      { label: 'Customer control', value: 'Uploaded platform data can be deleted by the customer' }
    ],
    sections: [
      {
        title: 'Preamble',
        paragraphs: [
          'By approving this, users agree to the stated terms and conditions. If a user does not agree with all terms on the page, they should not use the IQ World application or website.',
          'IQ World states that it values privacy and aims to let users enjoy products, services, websites, and online platforms without jeopardising privacy.',
          'The platform refers to IQ World software portal services and its website as a whole.'
        ]
      },
      {
        title: 'What Information We Collect',
        bullets: [
          'Personal information may include name, phone number, email address, location, and information associated with how the platform is used.',
          'Customers may also upload images, videos, documents, and social media handles for digital signage scheduling and performance tracking.',
          'IQ World servers may record browser and usage data such as IP address, browser type, previous pages, searches, and cookie-based session details.'
        ]
      },
      {
        title: 'How The Platform Uses Information',
        bullets: [
          'To deliver and enhance the platform, services, features, and content.',
          'To administer platform use and make the site easier to navigate.',
          'To understand requirements and interests and personalize the customer experience.',
          'To send software updates, product announcements, newsletters, marketing, or promotional material, with opt-out or unsubscribe options.',
          'To store uploaded communication on servers based on customer instructions and display it on digital signage screens according to schedule settings.',
          'To maintain schedule history, help customers with troubleshooting, and support technical administration, usability, and analytics.'
        ]
      },
      {
        title: 'How Information May Be Shared',
        bullets: [
          'Users can review and update account information on their platform account page.',
          'Third-party service providers may help with storage, maintenance, analytics, payment processing, communication, and feature improvement.',
          'Information may be disclosed when required for legal process, safety, rights protection, or law enforcement cooperation.',
          'In the event of merger, acquisition, or reorganisation, information may be transferred as part of business assets.',
          'Analytics providers such as Google may receive visitor behaviour data subject to their own privacy policies.'
        ]
      },
      {
        title: 'Account Control And Data Handling',
        paragraphs: [
          'Users may check, update, amend, or delete registration and account profile information, provided it remains correct and complete.',
          'Linked social media accounts and their associated data can be removed from the IQ World programme at any time.',
          'IQ World states that it takes reasonable precautions to protect information from unauthorized access and may rely on third-party suppliers or hosting partners for hardware, software, networking, storage, and related technology.'
        ]
      },
      {
        title: 'Software Limits And Liability',
        bullets: [
          'Customers must follow technological limits that restrict how the software may be used.',
          'Customers may not circumvent technical limits, reverse engineer, decompile, disassemble, make extra copies, or publish the programme for copying.',
          'Deficiencies, faults, or errors caused by unauthorized changes, misuse, abuse, unintended operation, or malware-related damage are not covered.',
          'If such conditions occur, the product may be considered out of warranty and additional charges may apply.'
        ]
      }
    ]
  },
  technical: {
    title: 'Technical Requirement',
    label: 'LUMOCAST T&C',
    intro:
      'These are the minimum technical requirements for running Android-based IQ World digital signage software, along with a few deployment recommendations from the original source page.',
    note:
      'For demanding environments such as 4K playback or outdoor use, higher hardware capacity may be needed.',
    highlights: [
      'Android operating system is required',
      'At least 1 GB RAM and 8 GB internal storage',
      'Supports HD, Full HD, and 4K display resolutions'
    ],
    facts: [
      { label: 'Operating system', value: 'Android' },
      { label: 'Connectivity', value: 'Wi-Fi and Ethernet, 10 Mbps' },
      { label: 'Supported resolutions', value: '1366 x 768, 1920 x 1080, 3840 x 2160' }
    ],
    sections: [
      {
        title: 'Minimum Hardware Requirements',
        bullets: [
          'Operating System: Android',
          'RAM: 1 GB or more',
          'Storage: 8 GB or more internal storage',
          'Connectivity: Wi-Fi and Ethernet',
          'Network speed: 10 Mbps',
          'USB Port: USB 2.0 or later',
          'Resolution: 1366 x 768, 1920 x 1080, 3840 x 2160'
        ]
      },
      {
        title: 'Things To Consider',
        bullets: [
          'Free hard drive space should generally be around 1.5 to 2 times the amount of RAM for better media player performance.',
          'If you plan to play digital signage at 4K resolution, choose players with stronger GPU performance.',
          'For outdoor digital signage in extreme conditions, consider a cloud-based setup and a physical network connection with the digital signage player.'
        ]
      }
    ]
  }
};

export const SOCIAL_LINKS: NavLink[] = [
  // {
  //   label: 'Facebook',
  //   href: 'https://www.facebook.com/profile.php?id=61557902141460',
  //   external: true
  // },
  // {
  //   label: 'Instagram',
  //   href: 'https://www.instagram.com/cansignage/',
  //   external: true
  // },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@cansignage/',
    external: true
  }
];

export const CONTACT: FooterContact = {
  email: 'sales@lumocast.in',
  phone: '+919152398498',
  address:
    '1st Floor, Bldg No. A4, Babosa Industrial Park, Saravali Village, Nashik-Mumbai Highway Bhiwandi, Maharashtra - 421302',
  copyright: '© 2025 Lumocast Digital Signage Pvt. Ltd.'
};
