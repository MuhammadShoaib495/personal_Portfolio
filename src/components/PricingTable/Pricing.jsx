import { pricingData, additionalServices } from "../../data/pricingData";
import PricingTable from "./index";
import Spacing from "../Spacing";

function Pricing() {
  return (
    <>
      {features.map((feature, index) => (
  <li key={index}>
    <strong>{feature.serviceName}</strong>
    <p>{feature.description}</p>
    <span>{feature.hrs}</span>
    <span>{feature.price}</span>
  </li>
))}
      <Spacing lg={20} md={20} />

      <PricingTable
        totalPrice="Additional Services"
        title={additionalServices.title}
        price={null}
        timeline={null}
        currency={null}
        btnLink={null}
        btnText={null}
        features={additionalServices.features}
      />
    </>
  );
}

export default Pricing;
