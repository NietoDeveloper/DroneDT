import BestSellers from "../components/BestSellers";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";
import Policy from "../components/Policy";
import Subscription from "../components/Subscription";

export default function Homepage() {
  return (
    <>
      <Hero />
      <LatestCollections />
      <BestSellers />
      <Policy />
      <Subscription />
    </>
  );
}
