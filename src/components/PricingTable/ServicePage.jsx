import Pricing from '../PricingTable/Pricing';
import Div from '../Div';
import Spacing from '../Spacing';
import { pageTitle } from '../../helper';
import Cta from '../Cta';



export default function ServicePage() {
 pageTitle('SEO Service Pricing');
    return(
        
    <Div className="container">  
          <Spacing lg="145" md="80" />
      
         <Div className="cs-section_heading">
              <h3 className="cs-section_subtitle text-center">SEO</h3>
              <h2 className="cs-section_title text-center">Complete Pricing List</h2>
                 <Spacing lg="40" md="30"/>            
      <div className="cs-shape_1" />
     {/* Pricing Table */}
      <Pricing/>
       {/* End Pricing Table */} 
        {/* Start CTA Section */}
             <Cta
               title="Let’s disscuse make <br />something <i>cool</i> together"
               btnText="Let's Discuss"
               btnLink="mailto:wmfcagency@gmail.com"
               bgSrc="/images/cta_bg_5.jpeg"
               variant="cs-type_1"
             />
             {/* End CTA Section */}
       </Div></Div>
       
    );
   
}
