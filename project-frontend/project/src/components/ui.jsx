export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ value, max = 100, color = 'navy', size = 'md' }) {
  const colorMap = {
    navy: 'bg-navy-500',
    violet: 'bg-violet-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };
  const sizeMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' };
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={`w-full ${sizeMap[size]} bg-gray-100 rounded-full overflow-hidden`}>
      <div
        className={`${colorMap[color] || colorMap.navy} h-full rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Badge({ children, color = 'navy', variant = 'solid' }) {
  const colorMap = {
    navy: { solid: 'bg-navy-100 text-navy-700', soft: 'bg-navy-50 text-navy-600' },
    violet: { solid: 'bg-violet-100 text-violet-700', soft: 'bg-violet-50 text-violet-600' },
    green: { solid: 'bg-green-100 text-green-700', soft: 'bg-green-50 text-green-600' },
    amber: { solid: 'bg-amber-100 text-amber-700', soft: 'bg-amber-50 text-amber-600' },
    rose: { solid: 'bg-rose-100 text-rose-700', soft: 'bg-rose-50 text-rose-600' },
    gray: { solid: 'bg-gray-100 text-gray-600', soft: 'bg-gray-50 text-gray-500' },
  };
  const styles = colorMap[color]?.[variant] || colorMap.navy.solid;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${styles}`}>
      {children}
    </span>
  );
}

export function IconButton({ children, onClick, label, active }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-2 rounded-xl transition-all duration-200 ${
        active
          ? 'bg-violet-100 text-violet-700'
          : 'text-gray-500 hover:bg-gray-100 hover:text-navy-700'
      }`}
    >
      {children}
    </button>
  );
}

export function StatCard({ icon: Icon, label, value, sublabel, color = 'navy', trend }) {
  const colorMap = {
    navy: { bg: 'bg-navy-50', icon: 'text-navy-600', ring: 'ring-navy-100' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', ring: 'ring-violet-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', ring: 'ring-green-100' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-100' },
  };
  const c = colorMap[color] || colorMap.navy;
  return (
    <Card className="p-5 animate-slide-up">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl ${c.bg} ${c.icon} ring-1 ${c.ring}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className="text-xs font-semibold text-gray-400">{trend}</span>
        )}
      </div>
      <p className="mt-4 text-3xl font-bold font-display text-navy-900">{value}</p>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
      {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
    </Card>
  );
}

export function RadialProgress({ value, size = 120, strokeWidth = 10, color = '#7c3aed', label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f0f4ff"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold font-display text-navy-900">{value}%</span>
        {label && <span className="text-xs text-gray-400 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}

export function MiniBarChart({ data, color = 'navy', height = 120 }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const colorMap = {
    navy: 'bg-navy-400',
    violet: 'bg-violet-400',
  };
  return (
    <div className="flex items-end justify-between gap-2" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex items-end justify-center" style={{ height: height - 24 }}>
            <div
              className={`w-full max-w-[28px] ${colorMap[color] || colorMap.navy} rounded-t-lg transition-all duration-700 ease-out hover:opacity-80`}
              style={{ height: `${(d.value / maxVal) * 100}%` }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-xs text-gray-400 font-medium">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function RingChart({ data, size = 180 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const colors = { navy: '#344ef7', violet: '#8b5cf6', green: '#22c55e', amber: '#f59e0b', rose: '#f43f5e' };
  let cumulativeOffset = 0;
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {data.map((d, i) => {
          const pct = d.value / total;
          const dash = pct * circumference;
          const seg = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors[d.color] || colors.navy}
              strokeWidth="16"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-cumulativeOffset}
              className="transition-all duration-1000"
            />
          );
          cumulativeOffset += dash;
          return seg;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold font-display text-navy-900">{total}</span>
        <span className="text-xs text-gray-400">hours</span>
      </div>
    </div>
  );
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <h2 className="text-xl font-bold font-display text-navy-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
