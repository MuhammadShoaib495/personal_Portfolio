import { pricingData, additionalServices } from "../../data/pricingData";
import PricingTable from "./index";
import Spacing from "../Spacing";

function Pricing() {
  return (
    <>
      {pricingData.map((pricing, index) => (
        <PricingTable
          key={index}
          {...pricing}
        />
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
