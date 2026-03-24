import { motion } from "motion/react";

export default function PortalImage({ 
  src, 
  alt, 
  className = "", 
  shape = "circle", // circle | oval | landscape | portrait | soft
  isPlaceholder = false,
  objectPosition = "center",
  objectFit = "cover"
}) {
  
  const getBorderRadius = () => {
    switch (shape) {
      case "circle": return "50%";
      case "oval": return "40% / 50%";
      case "landscape": return "40%";
      case "portrait": return "50% / 40%";
      case "soft": return "24px";
      default: return "50%";
    }
  };

  const borderRadius = getBorderRadius();

  return (
    <motion.div
      className={`overflow-hidden shadow-[0_12px_40px_rgba(13,43,26,0.2)] ${className}`}
      style={{ borderRadius }}
      initial={{ opacity: 0, scale: 0.98, filter: "blur(12px)", y: 30 }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      >
        {isPlaceholder || !src ? (
          <div 
            className="w-full h-full flex items-center justify-center p-10 text-center bg-[#c4a882]"
          >
            <span className="font-body italic text-[#f5f0e8] text-base md:text-lg leading-relaxed">
              "{alt}"
            </span>
          </div>
        ) : (
          <motion.img 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            src={src} 
            alt={alt} 
            className="w-full h-full"
            style={{ objectPosition, objectFit }}
            referrerPolicy="no-referrer"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
