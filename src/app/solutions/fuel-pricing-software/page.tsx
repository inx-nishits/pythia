import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";

export const metadata = {
  title: "Fuel Pricing Software | Pythia Scorecard",
};

export default function FuelPricingSoftwarePage() {
  return (
    <>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="Fuel Pricing Software"
        intro="Connect the conversations you hear at the forecourt and counter with the pricing and promo decisions you make every day."
        problemHeadline="Price moves are made with partial context."
        problemBody="Most fuel pricing tools rely on competitor surveys, demand curves, and historic trends. What they rarely capture is how customers actually react: what they say when they pull up, pay, or walk away because a promotion isn&apos;t clear or a price feels off."
        solutionHeadline="Let real customer feedback shape your next price change."
        solutionBody="Pythia listens at the point of sale and surfaces patterns in how customers talk about price, value, and promos. Instead of waiting for complaint emails or online reviews, your pricing team can see how the field reacts to changes within hours."
        useCaseTitle="Use case: Testing a new price band"
        useCaseBody="A pricing team rolls out a new price band in a subset of stores. By listening to how often customers mention price or confusion at the counter, they quickly learn where communication or signage needs to be tightened before expanding the change network-wide."
        impactLabel="Impact snapshot"
        impactValue="Faster read on customer reaction"
        impactDetail="Teams can pair transaction data with live feedback, reducing the risk of silent dissatisfaction when prices or promos change."
        capabilities={[
          "Capture how often price, value, or promotions are mentioned at the counter.",
          "Detect early signs of confusion or frustration around specific offers or price changes.",
          "Give pricing and merchandising teams a qualitative signal to pair with quantitative pump and in-store data.",
          "Share insights with field leaders so they can adjust communication at the store level.",
        ]}
      />
      <Footer />
    </>
  );
}

