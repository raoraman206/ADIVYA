import React from 'react';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'blue',
  trend = null,
  onClick
}) => {
  const colorMaps = {
    blue: {
      border: 'border-blue-100 hover:border-blue-300',
      iconBg: 'bg-blue-50 text-[#014BAA]',
      valColor: 'text-[#014BAA]'
    },
    amber: {
      border: 'border-amber-100 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-700',
      valColor: 'text-amber-700'
    },
    green: {
      border: 'border-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-700',
      valColor: 'text-emerald-700'
    },
    red: {
      border: 'border-rose-100 hover:border-rose-300',
      iconBg: 'bg-rose-50 text-rose-700',
      valColor: 'text-rose-700'
    },
    purple: {
      border: 'border-indigo-100 hover:border-indigo-300',
      iconBg: 'bg-indigo-50 text-indigo-700',
      valColor: 'text-indigo-700'
    }
  };

  const style = colorMaps[variant] || colorMaps.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border ${style.border} shadow-xs transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className={`text-2xl font-bold mt-1.5 ${style.valColor}`}>{value}</h4>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center space-x-1 mt-2 text-xs">
              <span className={`font-semibold ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.value}
              </span>
              <span className="text-slate-400">{trend.label}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${style.iconBg} shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
