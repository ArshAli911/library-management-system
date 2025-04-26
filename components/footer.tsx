import Link from "next/link"
import { CCETLogo } from "@/components/ccet-logo"
import { NewsletterForm } from "@/components/newsletter-form"

export function Footer() {
  return (
    <footer className="border-t bg-primary text-white">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <CCETLogo className="text-white" />
            <p className="text-sm">
              Sector 26, Chandigarh, 160019
              <br />
              India
            </p>
            <p className="text-sm">
              Phone: +91-172-2750947
              <br />
              Email: info@ccet.ac.in
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-sm hover:underline">
                  Book Catalog
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="text-sm hover:underline">
                  E-Books
                </Link>
              </li>
              <li>
                <Link href="/all-books" className="text-sm hover:underline">
                  All Books
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Library Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">Subscribe to our newsletter for updates on new books and library events.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} CCET Library. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
