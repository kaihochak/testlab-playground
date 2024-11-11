import { SearchSection } from '@/components/search-section';
import { TestingComparison } from '@/components/testing-comparison';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/50">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Global Health Search
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Search health information from trusted sources worldwide
        </p>
        
        <SearchSection />
        <TestingComparison />
      </div>
    </main>
  );
}