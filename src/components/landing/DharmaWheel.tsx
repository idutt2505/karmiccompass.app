"use client";

// Ported 1-to-1 from AuthScreen.js (splash/login screen) mandala.
// viewBox 0 0 420 420, cx=210, cy=210. CSS animations replace RN Animated.

const cx = 210, cy = 210;
const spokes10 = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324];
const spokes8  = [0, 45, 90, 135, 180, 225, 270, 315];

function deg2rad(d: number) { return (d - 90) * Math.PI / 180; }

// 96 tick marks (static outer ring)
const ticks96 = Array.from({ length: 96 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2;
  const major = i % 12 === 0, mid = i % 4 === 0;
  const r1 = 192 - (major ? 16 : mid ? 9 : 4);
  return (
    <line key={i}
      x1={cx + r1 * Math.cos(a)} y1={cy + r1 * Math.sin(a)}
      x2={cx + 192 * Math.cos(a)} y2={cy + 192 * Math.sin(a)}
      stroke={major ? 'rgba(201,130,74,0.85)' : mid ? 'rgba(201,130,74,0.37)' : 'rgba(201,130,74,0.12)'}
      strokeWidth={major ? 1.2 : mid ? 0.7 : 0.4}
    />
  );
});

// 16 outer lotus petals (static)
const petals16 = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2, bR = 82, pr = 32, pw = 0.18;
  const bLx = cx + bR * Math.cos(a - pw), bLy = cy + bR * Math.sin(a - pw);
  const bRx = cx + bR * Math.cos(a + pw), bRy = cy + bR * Math.sin(a + pw);
  const tx = cx + (bR + pr) * Math.cos(a), ty = cy + (bR + pr) * Math.sin(a);
  const qx = cx + (bR + pr * 0.65) * Math.cos(a), qy = cy + (bR + pr * 0.65) * Math.sin(a);
  const isMain = i % 2 === 0;
  return (
    <path key={i}
      d={`M ${bLx} ${bLy} Q ${qx} ${qy} ${tx} ${ty} Q ${qx} ${qy} ${bRx} ${bRy} Z`}
      fill={isMain ? 'rgba(201,130,74,0.12)' : 'rgba(201,130,74,0.05)'}
      stroke={isMain ? 'rgba(201,130,74,0.42)' : 'rgba(201,130,74,0.20)'}
      strokeWidth="0.7"
    />
  );
});

// Hexagonal star (static)
const r6 = 52;
const pts6 = Array.from({ length: 6 }, (_, i) => {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
  return [cx + r6 * Math.cos(a), cy + r6 * Math.sin(a)];
});
const tri1 = [0, 2, 4].map(j => pts6[j].join(',')).join(' ');
const tri2 = [1, 3, 5].map(j => pts6[j].join(',')).join(' ');

// 24 orbit dots (on 80s ring)
const dots24 = Array.from({ length: 24 }, (_, i) => {
  const a = (i / 24) * Math.PI * 2;
  return <circle key={i} cx={cx + 172 * Math.cos(a)} cy={cy + 172 * Math.sin(a)} r="1.8" fill="rgba(201,130,74,0.51)" />;
});

// 10 spokes on 55s ring
const spokes10els = spokes10.map(deg => {
  const a = deg2rad(deg);
  return (
    <line key={deg}
      x1={cx + 134 * Math.cos(a)} y1={cy + 134 * Math.sin(a)}
      x2={cx + 148 * Math.cos(a)} y2={cy + 148 * Math.sin(a)}
      stroke="rgba(201,130,74,0.59)" strokeWidth="1.5"
    />
  );
});

// 8-spoke star + dots (35s ring)
const spokes8els = spokes8.map((deg, i) => {
  const a = deg2rad(deg), major = i % 2 === 0;
  const r = major ? 122 : 110;
  return (
    <g key={deg}>
      <line
        x1={cx + 22 * Math.cos(a)} y1={cy + 22 * Math.sin(a)}
        x2={cx + (major ? 116 : 104) * Math.cos(a)} y2={cy + (major ? 116 : 104) * Math.sin(a)}
        stroke={major ? 'rgba(201,130,74,0.59)' : 'rgba(201,130,74,0.31)'}
        strokeWidth={major ? 1.8 : 1}
      />
      <circle cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={major ? 3.5 : 2} fill="rgba(201,130,74,0.85)" />
    </g>
  );
});

// 8 inner lotus petals (20s ring)
const innerPetals = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2, bR = 28, pr = 28, pw = 0.28;
  const bLx = cx + bR * Math.cos(a - pw), bLy = cy + bR * Math.sin(a - pw);
  const bRx = cx + bR * Math.cos(a + pw), bRy = cy + bR * Math.sin(a + pw);
  const tx  = cx + (bR + pr) * Math.cos(a),        ty  = cy + (bR + pr) * Math.sin(a);
  const qx  = cx + (bR + pr * 0.7) * Math.cos(a),  qy  = cy + (bR + pr * 0.7) * Math.sin(a);
  return (
    <path key={i}
      d={`M ${bLx} ${bLy} Q ${qx} ${qy} ${tx} ${ty} Q ${qx} ${qy} ${bRx} ${bRy} Z`}
      fill="rgba(201,130,74,0.31)" stroke="rgba(201,130,74,1.00)" strokeWidth="0.8"
    />
  );
});

// Hub dots
const hubDots = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2;
  return <circle key={i} cx={cx + 22 * Math.cos(a)} cy={cy + 22 * Math.sin(a)} r="1.8" fill="rgba(201,130,74,0.94)" />;
});

interface DharmaWheelProps {
  className?: string;
}

export function DharmaWheel({ className = "" }: DharmaWheelProps) {
  return (
    <>
      <style>{`
        @keyframes dw-cw  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);  } }
        @keyframes dw-ccw { from { transform: rotate(0deg);    } to { transform: rotate(-360deg); } }
        @keyframes dw-hub { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .dw-spin80  { transform-origin: ${cx}px ${cy}px; animation: dw-cw  80s linear infinite; }
        .dw-spin55  { transform-origin: ${cx}px ${cy}px; animation: dw-ccw 55s linear infinite; }
        .dw-spin35  { transform-origin: ${cx}px ${cy}px; animation: dw-cw  35s linear infinite; }
        .dw-spin20  { transform-origin: ${cx}px ${cy}px; animation: dw-ccw 20s linear infinite; }
        .dw-hub     { transform-origin: ${cx}px ${cy}px; animation: dw-hub  4s ease-in-out infinite; }
      `}</style>
      <svg
        viewBox="0 0 420 420"
        width="100%"
        height="100%"
        className={className}
        aria-hidden
      >
        <defs>
          <radialGradient id="dw-hub-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgb(201,130,74)" stopOpacity="0.5" />
            <stop offset="60%"  stopColor="rgb(201,130,74)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="rgb(201,130,74)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Static: outermost rings */}
        <circle cx={cx} cy={cy} r="200" fill="none" stroke="rgba(201,130,74,0.10)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="192" fill="none" stroke="rgba(201,130,74,0.17)" strokeWidth="0.8" />
        {ticks96}
        <circle cx={cx} cy={cy} r="118" fill="none" stroke="rgba(201,130,74,0.17)" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="80"  fill="none" stroke="rgba(201,130,74,0.17)" strokeWidth="0.8" />

        {/* Static: 16 lotus petals */}
        {petals16}

        {/* Static: hexagonal star */}
        <g opacity="0.12">
          <polygon points={tri1} fill="none" stroke="rgba(201,130,74,1)" strokeWidth="0.8" />
          <polygon points={tri2} fill="none" stroke="rgba(201,130,74,1)" strokeWidth="0.8" />
        </g>

        {/* Animated: 80s CW orbit ring + 24 dots */}
        <g className="dw-spin80">
          <circle cx={cx} cy={cy} r="172" fill="none" stroke="rgba(201,130,74,0.31)" strokeWidth="1.2" />
          {dots24}
        </g>

        {/* Animated: 55s CCW dashed ring + 10 spokes */}
        <g className="dw-spin55">
          <circle cx={cx} cy={cy} r="148" fill="none" stroke="rgba(201,130,74,0.24)" strokeWidth="1" strokeDasharray="8 10" />
          {spokes10els}
        </g>

        {/* Animated: 35s CW 8-spoke star + dots */}
        <g className="dw-spin35">
          {spokes8els}
        </g>

        {/* Animated: 20s CCW inner 8 petals */}
        <g className="dw-spin20">
          {innerPetals}
        </g>

        {/* Animated: hub glow breath */}
        <g className="dw-hub">
          <circle cx={cx} cy={cy} r="26" fill="url(#dw-hub-grad)" stroke="rgba(201,130,74,0.20)" strokeWidth="1" />
        </g>

        {/* Static: hub rings + centre dot */}
        <circle cx={cx} cy={cy} r="22" fill="rgba(10,18,32,0.6)" stroke="rgba(201,130,74,0.77)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r="14" fill="none" stroke="rgba(201,130,74,0.34)" strokeWidth="0.8" />
        {hubDots}
        <circle cx={cx} cy={cy} r="6"   fill="rgba(201,166,74,0.75)" />
        <circle cx={cx} cy={cy} r="2.5" fill="rgba(255,240,200,0.9)" />
      </svg>
    </>
  );
}
