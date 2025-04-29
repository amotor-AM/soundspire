import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-12 border-t border-cyan-900/30 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="flex mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] via-[#C651F2] to-[#8C39E0]">
                Soundspire
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              Cutting-edge advertising solutions for social media and podcast channels that drive measurable results.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                <Link
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center hover:bg-cyan-800/50 transition-colors border border-cyan-500/30"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-cyan-400 mask-image" />
                </Link>
              ))}
            </div>
          </div>

          {/* <div>
            <h4 className="text-lg font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Podcast Advertising",
                "Social Media Campaigns",
                "Influencer Marketing",
                "Audio Production",
                "Performance Analytics",
                "Creative Production",
              ].map((service) => (
                <li key={service}>
                  <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h4 className="text-lg font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { name: "About Us", link: "/about" },
                { name: "Our Team", link: "/about#team" },
                { name: "Careers", link: "#" },
                { name: "Blog", link: "#" },
                { name: "Press Kit", link: "#" },
                { name: "Contact", link: "/#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* <div>
            <h4 className="text-lg font-bold text-white mb-4">Subscribe</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest industry insights and company news.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                placeholder="Your email"
              />
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0">
                Subscribe
              </Button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-cyan-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Soundspire Media. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
