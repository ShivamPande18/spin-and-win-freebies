import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface EmailCaptureProps {
  onSubmit: (email: string) => void;
}

export const EmailCapture = ({ onSubmit }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address!");
      return;
    }

    if (!isValid) {
      toast.error("Please enter a valid email address!");
      return;
    }

    // toast.success("Email captured! Let's spin the wheel! 🎉");
    onSubmit(email);
  };

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
            Enter your email first to unlock amazing prizes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              className={`pl-12 h-14 text-lg rounded-2xl border-2 transition-all duration-300 ${
                email && isValid
                  ? "border-primary shadow-glow"
                  : email && !isValid
                  ? "border-destructive"
                  : "border-border focus:border-primary"
              }`}
            />
          </div>

          <Button
            type="submit"
            disabled={!email || !isValid}
            className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Spin the Wheel!
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            🔒 We respect your privacy. No spam, ever.
          </p>
        </div>
      </div>
    </div>
  );
};
