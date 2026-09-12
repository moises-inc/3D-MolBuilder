import React, { useEffect, useRef } from 'react';

interface ShaderBackgroundProps {
  opacity?: number;
  className?: string;
}

export const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  opacity = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = !document.hidden;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates for subtle interactive deflection
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Low-frequency organic wave parameters
    let time = 0;
    let lastTime = performance.now();

    const waves = [
      { basePeriod: 0.0012, speed: 0.00045, amplitude: 55, yOffsetRatio: 0.35, color: 'rgba(24, 24, 27, 0.70)' }, // Matte charcoal
      { basePeriod: 0.0018, speed: 0.00035, amplitude: 70, yOffsetRatio: 0.50, color: 'rgba(249, 115, 22, 0.045)' }, // Subtle amber flare 1
      { basePeriod: 0.0015, speed: 0.00060, amplitude: 85, yOffsetRatio: 0.65, color: 'rgba(39, 39, 42, 0.65)' }, // Matte dark zinc
      { basePeriod: 0.0022, speed: 0.00050, amplitude: 60, yOffsetRatio: 0.80, color: 'rgba(234, 88, 12, 0.055)' }, // Amber flare 2
    ];

    const render = (now: number) => {
      if (!isVisible) return;

      const dt = Math.min(now - lastTime, 100);
      lastTime = now;
      time += dt;

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Fill OLED base background
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient radial glow following cursor
      const radialGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        Math.max(width, height) * 0.55
      );
      radialGlow.addColorStop(0, 'rgba(249, 115, 22, 0.06)'); // Amber warmth at focus
      radialGlow.addColorStop(0.5, 'rgba(24, 24, 27, 0.3)');
      radialGlow.addColorStop(1, 'rgba(9, 9, 11, 0.95)');

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Draw undulating low-frequency wave meshes
      for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        ctx.beginPath();

        const baseY = height * wave.yOffsetRatio;
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        const step = 20; // 20px sampling interval for ultra-smooth performance
        for (let x = 0; x <= width; x += step) {
          // Complex organic wave: fundamental + harmonic + mouse deflection
          const distToMouse = Math.abs(x - mouse.x) / width;
          const mouseInfluence = Math.exp(-distToMouse * 3.5) * (mouse.y - baseY) * 0.22;

          const fundamental = Math.sin(x * wave.basePeriod + time * wave.speed);
          const harmonic = Math.cos(x * wave.basePeriod * 1.8 - time * wave.speed * 1.2) * 0.45;
          const y = baseY + (fundamental + harmonic) * wave.amplitude + mouseInfluence;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        ctx.fillStyle = wave.color;
        ctx.fill();
      }

      // Subtle charcoal vignette grid overlay
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 64;
      const xStart = (time * 0.01) % gridSize;
      
      ctx.beginPath();
      for (let x = xStart; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 w-full h-full ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};
