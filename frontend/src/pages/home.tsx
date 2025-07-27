import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "./components/header";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center min-h-screen">
        <Header />
        <h1>Welcome to the Home Page</h1>
        <p>This is the main content of the home page.</p>
      </div>
    </ThemeProvider>
  );
}
