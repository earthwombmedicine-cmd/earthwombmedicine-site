import { Link } from "react-router-dom";
import { Sparkles, Instagram, Youtube, MessageCircle } from "lucide-react";
import JaguarEyes from "./JaguarEyes";
import JaguarPrintField from "./JaguarPrintField";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-forest text-parchment py-20 px-6 relative overflow-hidden">
      <JaguarPrintField 
        variant="forest" 
        count={8} 
        edgeBias={true} 
        opacity={0.5} 
        animate={false} 
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Logo variant="footer" light={true} />
          <p className="font-body italic text-parchment/60 text-lg">"It's time to land back."</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl text-gold mb-2">Explore</h3>
          <Link to="/my-story" className="hover:text-gold transition-colors">My Story</Link>
          <Link to="/how-it-works" className="hover:text-gold transition-colors">How It Works</Link>
          <Link to="/transformation-stories" className="hover:text-gold transition-colors">Transformation Stories</Link>
          <Link to="/offerings" className="hover:text-gold transition-colors">Offerings</Link>
          <Link to="/connect" className="hover:text-gold transition-colors">Connect</Link>
        </div>

        {/* Lumina Trigger */}
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-xl text-gold mb-2">Support</h3>
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent('open-lumina-chat'))}
          >
            <span className="font-body">Find Your Way In</span>
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold/40 transition-all">
              <Sparkles size={16} className="text-gold" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-parchment/10 text-center text-sm text-parchment/40 relative z-10">
        <div className="flex justify-center gap-5 mb-8">
          <a 
            href="https://www.instagram.com/earthwombmedicine" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4AF64] hover:opacity-80 transition-opacity"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a 
            href="https://www.youtube.com/@earthwombmedicine" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4AF64] hover:opacity-80 transition-opacity"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
          <a 
            href="https://wa.me/PLACEHOLDER" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#D4AF64] hover:opacity-80 transition-opacity"
            aria-label="WhatsApp"
          >
            <MessageCircle size={24} />
          </a>
        </div>
        <p>© 2026 Earth Womb Medicine · Shama Igatpuriwala</p>
      </div>
    </footer>
  );
}
