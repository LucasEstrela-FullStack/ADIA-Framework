import { ChallengeSection } from "@/components/challenge-section";
import { DocumentationSection } from "@/components/documentation-section";
import { Hero } from "@/components/hero";
import { MetricsSection } from "@/components/metrics-section";
import { ResearchSection } from "@/components/research-section";
import { SolutionSection } from "@/components/solution-section";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ChallengeSection />
      <SolutionSection />
      <ResearchSection />
      <MetricsSection />
      <DocumentationSection />
    </main>
  );
}
