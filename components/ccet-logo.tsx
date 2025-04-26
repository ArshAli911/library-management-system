export function CCETLogo({ className = "" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative w-10 h-10 mr-2 overflow-hidden rounded-full bg-primary">
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">CCET</div>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-primary leading-tight">Chandigarh College of</span>
        <span className="font-bold text-primary leading-tight">Engineering & Technology</span>
      </div>
    </div>
  )
}
