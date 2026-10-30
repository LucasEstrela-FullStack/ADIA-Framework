import { ChallengeSection } from "@/components/challenge-section";
import { Hero } from "@/components/hero";
import { ResearchSection } from "@/components/research-section";
import { SolutionSection } from "@/components/solution-section";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ChallengeSection />
      <SolutionSection />
      <ResearchSection />
    </main>
  );
}
