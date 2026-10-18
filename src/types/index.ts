export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  formattedDisplay?: string;
}

export interface HeroProps {
  showFloatingBadge?: boolean;
  onCtaClick?: () => void;
  onLearnMoreClick?: () => void;
}

export interface Particle {
  x: number;
  y: number;
  radius: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  angle: number;
  speed: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  blur: number;
}

export interface StarDust {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export interface BinaryDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  fontSize: number;
  opacity: number;
  nextFlipTime: number;
}
