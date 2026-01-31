import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Forsyth Games - Educational Games for Students',
  description: 'A curated collection of 293+ educational and brain-training games designed for students. Perfect for school breaks, study breaks, and educational entertainment. Safe, fun, and engaging games that help develop critical thinking, problem-solving, and cognitive skills.',
  keywords: [
    'educational games',
    'student games',
    'school games',
    'learning games',
    'brain training',
    'educational entertainment',
    'student activities',
    'safe games for students',
    'cognitive development',
    'problem solving games',
    'educational technology',
    'classroom games',
    'study break games',
    'interactive learning',
    'educational gaming'
  ],
  authors: [{ name: 'Forsyth Games' }],
  creator: 'Forsyth Games',
  publisher: 'Forsyth Games',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://forsyth-games.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Forsyth Games - Educational Games for Students',
    description: '293+ educational games designed for students. Safe, fun, and engaging games that help develop critical thinking and problem-solving skills.',
    url: 'https://forsyth-games.vercel.app',
    siteName: 'Forsyth Games',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Forsyth Games - Educational Gaming Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forsyth Games - Educational Games for Students',
    description: '293+ educational games designed for students. Safe, fun, and engaging games that help develop critical thinking skills.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'education',
  classification: 'Educational Content',
  rating: 'general',
  language: 'en',
  geoRegion: 'US',
  targetAudience: 'students, teachers, parents, educators',
  educationalUse: 'instruction, recreation, cognitive development',
  learningResourceType: 'interactive resource, educational game',
  interactivityType: 'active',
  typicalAgeRange: '8-18',
  timeRequired: 'PT5M',
  accessMode: ['visual', 'textual'],
  accessibilityFeature: ['navigation', 'readingOrder'],
  accessibilityHazard: 'none',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
        <meta name="application-name" content="Forsyth Games" />
        <meta name="apple-mobile-web-app-title" content="Forsyth Games" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Structured Data for Education */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Forsyth Games",
              "description": "Educational gaming platform offering 293+ brain-training games for students",
              "url": "https://forsyth-games.vercel.app",
              "logo": "https://forsyth-games.vercel.app/logo.png",
              "sameAs": [],
              "educationalUse": "instruction, recreation, cognitive development",
              "learningResourceType": "interactive resource, educational game",
              "typicalAgeRange": "8-18",
              "targetAudience": {
                "@type": "EducationalAudience",
                "educationalRole": "student"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "mainEntity": {
                "@type": "ItemList",
                "name": "Educational Games Collection",
                "description": "Collection of 293+ educational games for students",
                "numberOfItems": 293,
                "itemListElement": [
                  {
                    "@type": "Game",
                    "name": "Educational Games",
                    "description": "Brain training and educational games",
                    "educationalUse": "cognitive development",
                    "learningResourceType": "interactive resource"
                  }
                ]
              }
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
