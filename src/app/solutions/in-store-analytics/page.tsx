import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";

export const metadata = {
  title: "In-Store Analytics | Pythia Scorecard",
};

export default function InStoreAnalyticsPage() {
  return (
    <>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="In-Store Analytics"
        intro="See what your existing reports miss by turning every checkout conversation into a continuous stream of operational insight."
        problemHeadline="Store reports tell you what happened, not why it happened."
        problemBody="Traditional dashboards show shrink, basket size, and labor costs, but they rarely explain why one store is outperforming another. Managers are left guessing about service quality, missed upsells, and friction that only shows up in real conversations at the counter."
        solutionHeadline="Hear the story behind every number in your P&L."
        solutionBody="Pythia captures audio at the checkout and converts it into structured analytics you can slice by store, shift, script, and sentiment. Instead of relying on anecdotes, your operators get a clear view of how service and selling behavior actually vary location by location."
        useCaseTitle="Use case: Comparing performance across regions"
        useCaseBody="An operator with dozens of locations uses Pythia to compare greeting and upsell behaviors between regions. Within days, they pinpoint stores where scripts are slipping and quickly redirect coaching and staffing support."
        impactLabel="Impact snapshot"
        impactValue="Faster visibility into outlier stores"
        impactDetail="Leaders can move from monthly post-mortems to daily course-correction by seeing where in-store behaviors diverge from top-performing locations."
        capabilities={[
          "Compare greeting, upsell, and closing behaviors across stores and shifts.",
          "Spot which locations are quietly leaking revenue because key scripts are not being used.",
          "Correlate sentiment trends with performance so you can see when service is slipping before scores drop.",
          "Give field leaders concrete insight for coaching conversations instead of guesswork.",
        ]}
      />
      <Footer />
    </>
  );
}

