import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Trophy, Mail } from "lucide-react";
import { toast } from "sonner";

interface PrizeDisplayProps {
  prize: string;
  email: string;
  onRetry: () => void;
}

export const PrizeDisplay = ({ prize, email, onRetry }: PrizeDisplayProps) => {
  const handleDownload = () => {
    toast.success("Prize download initiated! Check your email for details.");
    // In a real app, this would trigger actual download or email sending
  };

  const handleRetry = () => {
    toast.info("Ready for another spin! 🎲");
    onRetry();
  };

  return (
    <div className="animate-bounce-in">
      <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-wheel border-2 border-primary/20 max-w-md mx-auto relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <Trophy className="w-12 h-12 text-primary-foreground" />
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-2">
              🎉 Congratulations! 🎉
            </h2>

            <p className="text-muted-foreground text-lg mb-6">
              You've won an amazing prize!
            </p>
          </div>

          {/* Prize Display */}
          <div className="bg-gradient-primary/10 rounded-2xl p-6 mb-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-center text-primary mb-4">
              Your Prize:
            </h3>
            <p className="text-xl font-semibold text-center text-foreground bg-card rounded-xl py-4 px-6 shadow-sm">
              {prize}
            </p>
          </div>

          {/* Email Confirmation */}
          {/* <div className="flex items-center justify-center mb-8 text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" />
            <span className="text-sm">Prize details sent to: {email}</span>
          </div> */}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleDownload}
              className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow"
            >
              <Download className="w-5 h-5 mr-2" />
              Claim Your Prize
            </Button>

            <Button
              onClick={handleRetry}
              variant="outline"
              className="w-full h-12 text-base font-semibold rounded-2xl border-2 border-primary/30 hover:bg-primary/5 hover:scale-105 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 text-2xl animate-bounce">✨</div>
        <div
          className="absolute bottom-4 left-4 text-2xl animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          🎊
        </div>
        <div
          className="absolute top-1/2 right-2 text-xl animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          🎁
        </div>
      </div>
    </div>
  );
};
