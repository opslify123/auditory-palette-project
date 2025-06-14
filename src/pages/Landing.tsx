
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <span className="text-xl font-semibold">Opslify AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link to="/auth" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-primary-foreground">
            <Link to="/auth">Try for Free <Sparkles className="ml-2 h-4 w-4" /></Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Convert Text to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">Realistic Speech Instantly</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Enjoy ultra-clear AI-generated speech with our text-to-speech technology, designed for educators, content creators, and professionals.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                 <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700 text-primary-foreground">
                  <Link to="/auth"><Sparkles className="mr-2 h-5 w-5" />Try for Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Natural Voice</h3>
                <p className="text-muted-foreground max-w-xs">High-quality, human-like speech synthesis</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Multiple Voices</h3>
                <p className="text-muted-foreground max-w-xs">Choose from a variety of voices and accents</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-muted-foreground max-w-xs">Simple interface for quick text conversion</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Opslify AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};
export default LandingPage;

