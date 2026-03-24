export default function ParchmentCard({ children, className = "" }) {
  return (
    <div 
      className={`bg-parchment p-8 shadow-[0_4px_24px_rgba(2,49,38,0.12)] border border-forest/5 ${className}`}
      style={{
        borderRadius: "24px 48px 32px 56px",
        transform: "rotate(-0.5deg)"
      }}
    >
      {children}
    </div>
  );
}
