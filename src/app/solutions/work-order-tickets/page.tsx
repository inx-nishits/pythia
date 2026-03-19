import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";

export const metadata = {
  title: "Work Order Tickets | Pythia Scorecard",
};

export default function WorkOrderTicketsPage() {
  return (
    <>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="Work Order Tickets"
        intro="Introducing Tickets — From Friction Detected to Fix in Motion. When Pythia flags a friction point in the shopping experience, our AI Ticket Agent automatically converts it into a work order and routes it to the right manager or maintenance team — no forms to fill out, no manual steps required. Detect, assign, resolve."
        problemHeadline="Manual ticketing slows down resolution."
        problemBody="Traditional work order forms require manual entries, leading to delays and miscommunications between the store team and maintenance."
        solutionHeadline="Automated ticketing directly from customer interactions."
        solutionBody="By leveraging AI to listen to checkout interactions, Pythia automatically routes maintenance and coaching tickets to the appropriate teams."
        useCaseTitle="Use case: Fast-tracking maintenance"
        useCaseBody="When a cashier mentions 'the scanner is broken again' to a customer, Pythia instantly generates a ticket for IT support."
        impactLabel="Impact snapshot"
        impactValue="Zero manual reporting"
        impactDetail="Significantly reduce the time it takes to recognize and assign a friction point to the correct department."
        capabilities={[
          "Automatically flag friction points during checkout.",
          "Convert verbal cues into structured work orders automatically.",
          "Route tickets flawlessly without any manual intervention.",
        ]}
      />
      <Footer />
    </>
  );
}
