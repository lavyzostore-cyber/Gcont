import React, { useEffect, useRef, useState } from 'react';

export const DetailingCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<'default' | 'service' | 'explore' | 'hidden'>('default');
  
  // Coordinates
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<{ x: number; y: number; alpha: number }[]>([]);
  const isMoving = useRef(false);
  const moveTimer = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) {
      return;
    }

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      isMoving.current = true;
      
      if (moveTimer.current) window.clearTimeout(moveTimer.current);
      moveTimer.current = window.setTimeout(() => {
        isMoving.current = false;
      }, 100);

      // Add to light trail (keep trail subtle and short: max 6 points)
      trailPoints.current.push({ x: e.clientX, y: e.clientY, alpha: 0.35 });
      if (trailPoints.current.length > 8) {
        trailPoints.current.shift();
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) {
        setMode('default');
        return;
      }

      // Preserve native cursor on inputs, selects, textareas
      if (target.closest('input, textarea, select, button, a, [contenteditable="true"]')) {
        // Still follow smoothly, but keep ring minimal
        if (target.closest('[data-cursor="explore"]')) {
          setMode('explore');
        } else if (target.closest('[data-cursor="service"]')) {
          setMode('service');
        } else {
          setMode('default');
        }
      } else if (target.closest('[data-cursor="service"]')) {
        setMode('service');
      } else if (target.closest('[data-cursor="explore"]')) {
        setMode('explore');
      } else {
        setMode('default');
      }
    };

    const handleMouseLeave = () => {
      setMode('hidden');
    };

    const handleMouseEnter = () => {
      setMode('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for trailing ring and subtle light trail
    let animId: number;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const render = () => {
      // Linear interpolation for delayed ring follow
      const ease = 0.22;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Draw short cyan light trail
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (trailPoints.current.length > 1) {
          ctx.beginPath();
          ctx.moveTo(trailPoints.current[0].x, trailPoints.current[0].y);
          for (let i = 1; i < trailPoints.current.length; i++) {
            const p = trailPoints.current[i];
            ctx.lineTo(p.x, p.y);
            p.alpha *= 0.85; // fast fade
          }
          ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
          ctx.lineWidth = 1.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        
        // Remove dead points
        trailPoints.current = trailPoints.current.filter((p) => p.alpha > 0.05);
      }

      animId = requestAnimationFrame(render);
    };

    // Resize canvas
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (moveTimer.current) clearTimeout(moveTimer.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Short quick-fade canvas trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full opacity-60"
      />

      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-cyan-400 transition-opacity duration-200 shadow-[0_0_8px_rgba(0,229,255,0.8)] ${
          mode === 'hidden' ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Orbiting Ring */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 left-0 transition-[width,height,margin,border-color,background-color,opacity] duration-200 ease-out flex items-center justify-center ${
          mode === 'hidden' ? 'opacity-0' : 'opacity-100'
        } ${
          mode === 'service'
            ? '-ml-6 -mt-6 w-12 h-12 rounded-full border border-cyan-400/90 bg-cyan-950/20 backdrop-blur-[1px] shadow-[0_0_15px_rgba(0,229,255,0.3)]'
            : mode === 'explore'
            ? '-ml-8 -mt-8 w-16 h-16 rounded-full border border-cyan-400 bg-cyan-950/40 backdrop-blur-sm'
            : '-ml-4 -mt-4 w-8 h-8 rounded-full border border-cyan-400/50 bg-transparent'
        }`}
      >
        {mode === 'service' && (
          <div className="w-2.5 h-2.5 rounded-full border border-cyan-300 animate-spin [animation-duration:3s]" />
        )}
        {mode === 'explore' && (
          <span className="text-[9px] font-mono tracking-widest font-bold text-cyan-300 uppercase">
            VIEW
          </span>
        )}
      </div>
    </div>
  );
};
