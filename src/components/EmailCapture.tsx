import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";
import GoogleAuthButton from "./GoogleAuthButton";
import GoogleIcon from "@/icons/GoogleIcon";
import { FcGoogle } from "react-icons/fc";

interface EmailCaptureProps {
  onSubmit: () => void;
}

export const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [googleDone, setGoogleDone] = useState(false);

  return (
    <div className="animate-slide-up">
      <div className="bg-card rounded-3xl p-8 lg:p-12 shadow-glow border border-border/50 max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <Sparkles className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get Your Freebies!
          </h2>

          <p className="text-muted-foreground text-lg">
            Sign in with google first to unlock amazing prizes
          </p>
        </div>

        <div className="space-y-6">
          {!googleDone ? (
            <div className="relative">
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
                <FcGoogle className="w-5 h-5" />
              </div>
              <GoogleAuthButton onDone={() => setGoogleDone(true)} />
            </div>
          ) : null}

          <Button
            disabled={!googleDone}
            className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            onClick={onSubmit}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Spin the Wheel!
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
};
