import {
  Instagram,
  Linkedin,
  Bird as Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Shield,
  FileText,
  BookOpen,
  Settings,
  ExternalLink,
} from "lucide-react";

export const Footer = () => {
  return (
    <>
      <div className="bg-gray-800 text-white p-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Section 1: Social Media */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Follow Us
            </h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com/greensteps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:text-white group"
              >
                <Instagram size={18} className="mr-2" /> Instagram
              </a>
              <a
                href="https://linkedin.com/company/greensteps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white group"
              >
                <Linkedin size={18} className="mr-2" /> LinkedIn
              </a>
              <a
                href="https://twitter.com/greensteps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-sky-400 hover:text-white group"
              >
                <Twitter size={18} className="mr-2" /> Twitter
              </a>
              <a
                href="https://facebook.com/greensteps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-2 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:text-white group"
              >
                <Facebook size={18} className="mr-2" /> Facebook
              </a>
            </div>
          </section>

          {/* Section 2: Contact Information */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail size={18} className="mr-2" />
                <span>contact@greensteps.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1" />
                <div>
                  <div>123 Green Street</div>
                  <div>Eco City, CA 90210</div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2" />
                <span>Mon-Fri: 9AM-6PM PST</span>
              </div>
            </div>
          </section>

          {/* Section 3: Support & Resources */}
          <section>
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Support & Resources
            </h3>
            <div className="space-y-3">
              <a
                href="/support"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <MessageCircle size={18} className="mr-2" /> Help Center
              </a>
              <a
                href="/faq"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <ExternalLink size={18} className="mr-2" /> FAQ
              </a>
              <a
                href="/privacy"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <Shield size={18} className="mr-2" /> Privacy Policy
              </a>
              <a
                href="/terms"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <FileText size={18} className="mr-2" /> Terms of Service
              </a>
              <a
                href="/resources"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <BookOpen size={18} className="mr-2" /> Climate Resources
              </a>
              <a
                href="/api-docs"
                className="flex items-center hover:text-green-400 transition-colors"
              >
                <Settings size={18} className="mr-2" /> API Documentation
              </a>
            </div>
          </section>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2025 GreenSteps. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};
