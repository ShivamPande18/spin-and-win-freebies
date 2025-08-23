import { useState } from "react";
import { SpinWheel } from "@/components/SpinWheel";
import { EmailCapture } from "@/components/EmailCapture";
import { PrizeDisplay } from "@/components/PrizeDisplay";
import GoogleAuthButton from "@/components/GoogleAuthButton";

const Index = () => {
  const [email, setEmail] = useState("");
  const [gameState, setGameState] = useState<"email" | "spinning" | "won">(
    "email"
  );
  const [wonPrize, setWonPrize] = useState<string>("");
  const [wonIndex, setWonIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const prizes = [
    "LinkedIn Mastery Guide",
    "Paid Internships Goldlist",
    "Resume Booster Pack",
    "Top Government Internships",
  ];

  const pdfs = [
    "/prizes/LinkedInMasteryGuide.pdf",
    "/prizes/PaidInternshipsGoldlist.pdf",
    "/prizes/ResumeBoosterPack.pdf",
    "/prizes/TopGovernmentInternships.pdf",
  ];

  function downloadPdfByIndex() {
    triggerDownload(pdfs[wonIndex]);
  }

  // 🔽 Common download helper
  function triggerDownload(pdfUrl: string) {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfUrl.split("/").pop() || "prize.pdf";
    link.click();
  }

  const handleEmailSubmit = () => {
    setGameState("spinning");
    setIsSpinning(true);

    // Simulate wheel stopping after 4 seconds
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      const randomPrize = prizes[randomIndex];
      setWonPrize(randomPrize);
      setWonIndex(randomIndex);
      setIsSpinning(false);
      setGameState("won");
    }, 4000);
  };

  const handleRetry = () => {
    setEmail("");
    setWonPrize("");
    setGameState("email");
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Spin & Win Amazing Prizes!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your email and spin the wheel for a chance to win exclusive
            prizes and discounts!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="flex justify-center">
            {gameState === "email" && (
              <EmailCapture onSubmit={handleEmailSubmit} />
            )}

            {gameState === "spinning" && (
              <div className="text-center animate-pulse-glow">
                <div className="bg-card rounded-3xl p-12 shadow-glow border border-border/50">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 animate-spin"></div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Spinning the wheel...
                  </h3>
                  <p className="text-muted-foreground">Good luck! 🍀</p>
                </div>
              </div>
            )}

            {gameState === "won" && (
              <PrizeDisplay
                onDownload={downloadPdfByIndex}
                prize={wonPrize}
                email={email}
                onRetry={handleRetry}
              />
            )}
          </div>

          {/* Right Side - wheel */}
          <div className="flex justify-center">
            <SpinWheel
              prizes={prizes}
              isSpinning={isSpinning}
              wonPrize={wonPrize}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
