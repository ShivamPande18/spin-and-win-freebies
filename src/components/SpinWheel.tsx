import { useEffect, useState } from "react";

interface SpinWheelProps {
  prizes: string[];
  isSpinning: boolean;
  wonPrize: string;
}

export const SpinWheel = ({ prizes, isSpinning, wonPrize }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [finalRotation, setFinalRotation] = useState(0);

  const segmentAngle = 360 / prizes.length;
  const colors = [
    "hsl(0 89% 60%)", // Red
    "hsl(36 89% 60%)", // Orange
    "hsl(72 89% 60%)", // Yellow-green
    "hsl(108 89% 60%)", // Green
    "hsl(144 89% 60%)", // Teal
    "hsl(180 89% 60%)", // Cyan
    "hsl(216 89% 60%)", // Blue
    "hsl(252 89% 60%)", // Purple
    "hsl(288 89% 60%)", // Magenta
    "hsl(324 89% 60%)", // Pink
  ];

  useEffect(() => {
    if (isSpinning) {
      // Calculate which segment the prize is in
      const prizeIndex = prizes.indexOf(wonPrize);
      const prizeAngle = prizeIndex * segmentAngle;

      // Add multiple full rotations plus the target angle
      // Subtract half segment to center on the prize
      const spins = 5 + Math.random() * 3; // 5-8 full rotations
      const targetAngle = 360 * spins + (360 - prizeAngle - segmentAngle / 2);

      setFinalRotation(targetAngle);
      setRotation(targetAngle);
    }
  }, [isSpinning, wonPrize, prizes, segmentAngle]);

  return (
    <div className="relative">
      {/* Wheel Container */}
      {/* <div className="relative w-96 h-96 lg:w-96 lg:h-96"> */}
      <div style={{ width: "30rem", height: "30rem" }} className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-foreground"></div>
        </div>

        {/* Wheel */}
        <div
          className={`w-full h-full rounded-full shadow-wheel border-8 border-card relative overflow-hidden transition-transform duration-[4000ms] ease-out ${
            isSpinning ? "animate-spin-wheel" : ""
          }`}
          style={
            {
              transform: `rotate(${rotation}deg)`,
              "--wheel-rotation": `${finalRotation}deg`,
              "--wheel-duration": "4s",
            } as React.CSSProperties
          }
        >
          {/* Wheel Segments */}
          {prizes.map((prize, index) => {
            const angle = index * segmentAngle;
            return (
              <div
                key={index}
                className="absolute w-full h-full"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "center",
                }}
              >
                <div
                  className="absolute w-full h-1/2 origin-bottom overflow-hidden"
                  style={{
                    backgroundColor: colors[index % colors.length],
                    clipPath: `polygon(50% 100%, ${
                      50 - 50 * Math.tan((segmentAngle * Math.PI) / 360)
                    }% 0%, ${
                      50 + 50 * Math.tan((segmentAngle * Math.PI) / 360)
                    }% 0%)`,
                  }}
                >
                  <div
                    className="absolute text-white font-bold  text-center px-2"
                    style={{
                      top: "20%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      maxWidth: "80px",
                      lineHeight: "1.2",
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {prize}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-primary rounded-full shadow-lg border-4 border-card flex items-center justify-center">
            <div className="text-white font-bold text-lg">🎯</div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -inset-4 bg-gradient-primary rounded-full opacity-20 blur-xl animate-pulse-glow"></div>
      </div>
    </div>
  );
};
