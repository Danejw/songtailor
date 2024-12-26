import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent">
              SongTailor
            </h3>
            <p className="text-muted-foreground">Your Story, Your Song, Your Way</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/public-songs" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Public Songs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refund" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                <Mail className="w-5 h-5 mr-3" />
                <a href="mailto:support@songtailor.com">support@songtailor.com</a>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200">
                <Phone className="w-5 h-5 mr-3" />
                <a href="tel:1-800-SONG">1-800-SONG</a>
              </div>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} SongTailor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};