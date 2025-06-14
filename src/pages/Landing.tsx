import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';
const LandingPage = () => {
  return <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="/" className="flex items-center justify-center">
          <span className="text-xl font-semibold">TTS App</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link to="/auth" className="text-sm font-medium hover:underline underline-offset-4">
            Sign In
          </Link>
          <Button asChild>
            <Link to="/auth">Try for Free <ArrowRight className="ml-2" /></Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter xl:text-6xl/none text-left sm:text-6xl">Convert Text to Realistic Speech Instantl</h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our advanced text-to-speech technology creates natural-sounding audio for your projects. Perfect for videos, podcasts, and accessibility.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                   <Button size="lg" asChild>
                    <Link to="/auth">Try for Free <ArrowRight className="ml-2" /></Link>
                  </Button>
                </div>
              </div>
              
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TTS App. All rights reserved.
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
    </div>;
};
export default LandingPage;