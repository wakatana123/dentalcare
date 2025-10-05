import { useState } from 'react';

interface OdontogramProps {
  type: 'adult' | 'child';
  onToothClick?: (toothNumber: number) => void;
  toothStatus?: Record<number, { condition?: string; color?: string }>;
}

export default function Odontogram({ type, onToothClick, toothStatus = {} }: OdontogramProps) {
  const [hoveredTooth, setHoveredTooth] = useState<number | null>(null);

  const adultTeeth = {
    upperRight: [18, 17, 16, 15, 14, 13, 12, 11],
    upperLeft: [21, 22, 23, 24, 25, 26, 27, 28],
    lowerRight: [48, 47, 46, 45, 44, 43, 42, 41],
    lowerLeft: [31, 32, 33, 34, 35, 36, 37, 38],
  };

  const childTeeth = {
    upperRight: [55, 54, 53, 52, 51],
    upperLeft: [61, 62, 63, 64, 65],
    lowerRight: [85, 84, 83, 82, 81],
    lowerLeft: [71, 72, 73, 74, 75],
  };

  const teeth = type === 'adult' ? adultTeeth : childTeeth;

  const getToothColor = (toothNumber: number) => {
    if (hoveredTooth === toothNumber) return '#7FC9B2';
    const status = toothStatus[toothNumber];
    if (status?.color) return status.color;
    return '#FFFFFF';
  };

  const Tooth = ({ number }: { number: number }) => (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-110"
      onClick={() => onToothClick?.(number)}
      onMouseEnter={() => setHoveredTooth(number)}
      onMouseLeave={() => setHoveredTooth(null)}
    >
      <span className="text-xs font-medium text-[#2A6356]">{number}</span>
      <svg width="24" height="32" viewBox="0 0 24 32" className="drop-shadow-sm">
        <path
          d="M12 2C8 2 4 4 4 8C4 10 3 14 3 18C3 24 6 30 12 30C18 30 21 24 21 18C21 14 20 10 20 8C20 4 16 2 12 2Z"
          fill={getToothColor(number)}
          stroke="#2A6356"
          strokeWidth="1.5"
        />
        <path
          d="M12 8C10 8 9 10 9 12C9 14 10 16 12 16C14 16 15 14 15 12C15 10 14 8 12 8Z"
          fill="#F3FAF7"
          opacity="0.5"
        />
      </svg>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#D7F0E7] p-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-center text-sm font-medium text-[#2A6356] opacity-70">
            Superior
          </div>
          <div className="flex justify-center gap-12">
            <div className="flex gap-2">
              <span className="text-xs text-[#2A6356] opacity-50 mr-2">Derecha</span>
              {teeth.upperRight.map((tooth) => (
                <Tooth key={tooth} number={tooth} />
              ))}
            </div>
            <div className="w-px bg-[#D7F0E7]" />
            <div className="flex gap-2">
              {teeth.upperLeft.map((tooth) => (
                <Tooth key={tooth} number={tooth} />
              ))}
              <span className="text-xs text-[#2A6356] opacity-50 ml-2">Izquierda</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-[#D7F0E7] to-transparent" />

        <div className="space-y-4">
          <div className="flex justify-center gap-12">
            <div className="flex gap-2">
              <span className="text-xs text-[#2A6356] opacity-50 mr-2">Derecha</span>
              {teeth.lowerRight.map((tooth) => (
                <Tooth key={tooth} number={tooth} />
              ))}
            </div>
            <div className="w-px bg-[#D7F0E7]" />
            <div className="flex gap-2">
              {teeth.lowerLeft.map((tooth) => (
                <Tooth key={tooth} number={tooth} />
              ))}
              <span className="text-xs text-[#2A6356] opacity-50 ml-2">Izquierda</span>
            </div>
          </div>
          <div className="text-center text-sm font-medium text-[#2A6356] opacity-70">
            Inferior
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#D7F0E7]">
        <div className="flex flex-wrap gap-4 justify-center text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-white border-2 border-[#2A6356]" />
            <span className="text-[#2A6356]">Sano</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#DEC468]" />
            <span className="text-[#2A6356]">Caries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#3B917A]" />
            <span className="text-[#2A6356]">Obturado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#632A37]" />
            <span className="text-[#2A6356]">Ausente</span>
          </div>
        </div>
      </div>
    </div>
  );
}
