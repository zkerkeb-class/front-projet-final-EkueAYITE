import React from 'react';
import './index.css';

const GamingBackground = () => {
    return (
        <div className="background-container">
            <svg
                viewBox="0 0 1920 1080"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-cover"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    {/* Gradients principaux */}
                    <radialGradient id="mainGradient" cx="50%" cy="30%" r="70%">
                        <stop offset="0%" style={{stopColor:'#0a0a23', stopOpacity:1}} />
                        <stop offset="40%" style={{stopColor:'#1a1a3e', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#000000', stopOpacity:1}} />
                    </radialGradient>

                    {/* Gradient néon cyan */}
                    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#00ffff', stopOpacity:0.8}} />
                        <stop offset="50%" style={{stopColor:'#0080ff', stopOpacity:0.6}} />
                        <stop offset="100%" style={{stopColor:'#4000ff', stopOpacity:0.4}} />
                    </linearGradient>

                    {/* Gradient néon violet */}
                    <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#ff00ff', stopOpacity:0.7}} />
                        <stop offset="50%" style={{stopColor:'#8000ff', stopOpacity:0.5}} />
                        <stop offset="100%" style={{stopColor:'#4000ff', stopOpacity:0.3}} />
                    </linearGradient>

                    {/* Gradient hexagone */}
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#00ffff', stopOpacity:0.3}} />
                        <stop offset="100%" style={{stopColor:'#ff00ff', stopOpacity:0.1}} />
                    </linearGradient>

                    {/* Filtre de lueur */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    {/* Filtre de lueur intense */}
                    <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>

                    {/* Pattern de particules */}
                    <pattern id="particles" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="30" r="1" fill="#00ffff" opacity="0.6"/>
                        <circle cx="80" cy="70" r="0.5" fill="#ff00ff" opacity="0.4"/>
                        <circle cx="50" cy="10" r="0.8" fill="#ffffff" opacity="0.3"/>
                        <circle cx="10" cy="80" r="1.2" fill="#0080ff" opacity="0.5"/>
                    </pattern>

                    {/* Grille futuriste */}
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.2"/>
                    </pattern>
                </defs>

                {/* Arrière-plan principal */}
                <rect width="1920" height="1080" fill="url(#mainGradient)"/>

                {/* Couche de particules */}
                <rect width="1920" height="1080" fill="url(#particles)" opacity="0.8"/>

                {/* Grille futuriste */}
                <rect width="1920" height="1080" fill="url(#grid)"/>

                {/* Hexagones décoratifs */}
                <polygon
                    points="200,150 250,120 300,150 300,210 250,240 200,210"
                    fill="none"
                    stroke="url(#neonCyan)"
                    strokeWidth="2"
                    opacity="0.6"
                    filter="url(#glow)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0 250 180;360 250 180"
                        dur="20s"
                        repeatCount="indefinite"
                    />
                </polygon>

                <polygon
                    points="1600,300 1680,270 1760,300 1760,390 1680,420 1600,390"
                    fill="url(#hexGradient)"
                    stroke="url(#neonPurple)"
                    strokeWidth="3"
                    opacity="0.4"
                    filter="url(#glow)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="360 1680 345;0 1680 345"
                        dur="25s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Lignes de circuit */}
                <path
                    d="M 0,400 Q 400,350 800,400 T 1600,400 L 1920,400"
                    fill="none"
                    stroke="url(#neonCyan)"
                    strokeWidth="2"
                    opacity="0.5"
                    filter="url(#glow)"
                >
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite"/>
                </path>

                <path
                    d="M 0,600 Q 300,650 600,600 T 1200,600 L 1920,600"
                    fill="none"
                    stroke="url(#neonPurple)"
                    strokeWidth="2"
                    opacity="0.4"
                    filter="url(#glow)"
                >
                    <animate attributeName="opacity" values="0.2;0.7;0.2" dur="4s" repeatCount="indefinite"/>
                </path>

                {/* Cercles énergétiques */}
                <circle
                    cx="400"
                    cy="800"
                    r="80"
                    fill="none"
                    stroke="url(#neonCyan)"
                    strokeWidth="3"
                    opacity="0.6"
                    filter="url(#strongGlow)"
                >
                    <animate attributeName="r" values="60;100;60" dur="4s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
                </circle>

                <circle
                    cx="1500"
                    cy="200"
                    r="60"
                    fill="none"
                    stroke="url(#neonPurple)"
                    strokeWidth="2"
                    opacity="0.5"
                    filter="url(#strongGlow)"
                >
                    <animate attributeName="r" values="40;80;40" dur="5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite"/>
                </circle>

                {/* Triangles tech */}
                <polygon
                    points="100,900 160,850 160,950"
                    fill="url(#neonCyan)"
                    opacity="0.3"
                    filter="url(#glow)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;20,0;0,0"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </polygon>

                <polygon
                    points="1700,800 1800,750 1800,850"
                    fill="url(#neonPurple)"
                    opacity="0.4"
                    filter="url(#glow)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;-15,0;0,0"
                        dur="4s"
                        repeatCount="indefinite"
                    />
                </polygon>

                {/* Éléments de lumière centrale */}
                <ellipse
                    cx="960"
                    cy="400"
                    rx="300"
                    ry="150"
                    fill="url(#neonCyan)"
                    opacity="0.1"
                    filter="url(#strongGlow)"
                >
                    <animate attributeName="opacity" values="0.05;0.15;0.05" dur="6s" repeatCount="indefinite"/>
                </ellipse>

                {/* Rayons de lumière */}
                <path
                    d="M 960,0 L 980,0 L 970,1080 L 950,1080 Z"
                    fill="url(#neonCyan)"
                    opacity="0.2"
                >
                    <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite"/>
                </path>

                <path
                    d="M 0,540 L 0,560 L 1920,550 L 1920,530 Z"
                    fill="url(#neonPurple)"
                    opacity="0.15"
                >
                    <animate attributeName="opacity" values="0.08;0.25;0.08" dur="5s" repeatCount="indefinite"/>
                </path>

                {/* Particules flottantes animées */}
                <circle cx="300" cy="200" r="2" fill="#00ffff" opacity="0.8" filter="url(#glow)">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;100,50;0,0"
                        dur="8s"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="8s" repeatCount="indefinite"/>
                </circle>

                <circle cx="1600" cy="600" r="1.5" fill="#ff00ff" opacity="0.7" filter="url(#glow)">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;-80,-30;0,0"
                        dur="10s"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="opacity" values="0.3;0.9;0.3" dur="10s" repeatCount="indefinite"/>
                </circle>

                <circle cx="800" cy="900" r="2.5" fill="#ffffff" opacity="0.6" filter="url(#glow)">
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0;50,-100;0,0"
                        dur="12s"
                        repeatCount="indefinite"
                    />
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="12s" repeatCount="indefinite"/>
                </circle>

                {/* Overlay de profondeur */}
                <rect width="1920" height="1080" fill="url(#mainGradient)" opacity="0.3"/>
            </svg>
        </div>
    );
};

export default GamingBackground;