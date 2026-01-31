'use client'

export default function Footer() {
  const handleWeatherLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const confirmLeave = window.confirm("You are leaving this website. Do you want to continue to Weather.com?")
    if (confirmLeave) {
      window.open("https://weather.com/", "_blank", "noopener,noreferrer")
    }
  }

  return (
    <footer className="bg-surface border-t border-surface-hover mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-textSecondary">
            <span className="font-semibold">a site by</span>{' '}
            <a 
              href="https://weather.com/"
              onClick={handleWeatherLinkClick}
              className="text-accent hover:text-white transition-colors font-semibold"
            >
              weather man
            </a>
          </p>
          <p className="text-textSecondary text-sm mt-2">
            © 2024 Forsyth Games. All games remain property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  )
}
