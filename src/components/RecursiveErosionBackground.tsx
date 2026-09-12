import React, { useMemo } from 'react';
import { getRecursiveErosionSource } from './recursive-erosion-utils/recursive-erosion-source';

export interface RecursiveErosionBackgroundProps {
  mode?: 'dark' | 'light';
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
}

export const RecursiveErosionBackground: React.FC<RecursiveErosionBackgroundProps> = ({
  mode = 'dark',
  hue = -30,
  saturation = 1.2,
  brightness = 0.9,
  className = '',
}) => {
  const htmlSource = useMemo(() => {
    return getRecursiveErosionSource({
      mode,
      hue,
      saturation,
      brightness,
    });
  }, [mode, hue, saturation, brightness]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-[#09090b] ${className}`}
      aria-hidden="true"
    >
      <iframe
        title="Recursive Erosion 3D Background"
        srcDoc={htmlSource}
        sandbox="allow-scripts"
        tabIndex={-1}
        className="w-full h-full border-0 pointer-events-none select-none block"
        style={{
          filter: `hue-rotate(${hue}deg) saturate(${saturation}) brightness(${brightness})`,
          opacity: 0.88,
        }}
      />
      {/* Sutil viñeta y gradiente de atenuación para garantizar contraste del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/85 via-transparent to-[#09090b]/40 pointer-events-none" />
    </div>
  );
};

export default RecursiveErosionBackground;
