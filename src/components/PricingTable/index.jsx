import React from "react";
import "./pricing.scss";
import Div from "../Div";
import Spacing from "../Spacing";

export default function PricingTable({
title,
totalPrice,
price,
currency,
features = [],
timeline,
}) {
const featureList = Array.isArray(features) ? features : [];

return ( <Div className="container"> <Div className="cs-pricing_table cs-style1">

    <h2 className="cs-pricing_title">
      {title}
    </h2>

    <Div className="cs-pricing_info">
      <Div className="cs-price">
        <h3 className="cs-white_color">
          {currency || ""}
          {price || ""}
        </h3>

        <span className="cs-accent_color">
          {timeline || ""}
        </span>
      </Div>

      <Div className="cs-price_text">
        {totalPrice || ""}
      </Div>
    </Div>

    <ul className="cs-pricing_feature cs-mp0">
      <li className="responsive-table">

        <table>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>

          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Hours</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {featureList.map((feature, index) => (
              <tr key={index}>
                <td>
                  {feature?.serviceName || ""}
                </td>

                <td>
                  {feature?.description || ""}
                </td>

                <td>
                  {feature?.hrs || ""}
                </td>

                <td>
                  {feature?.price || ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Spacing lg={20} md={20} />

      </li>
    </ul>

    <Div className="cs-pricing_btn_wrap" />

  </Div>

  <Spacing lg={20} md={20} />
</Div>

);
}
