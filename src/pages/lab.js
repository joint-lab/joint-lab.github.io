import React from "react";
import { Page } from "components/core/layout";
import { SubHero } from 'components/core/sub-hero';
import { StaticImage } from "gatsby-plugin-image"

/*
 URL: /lab 
 Markdown style section with information on the lab.
*/
export default function Index({ location }){
  return <Page light location={location}>
            <SubHero title="Lab"/>
            <div className="text-center my-16">
              <h1 className="text-4xl font-medium my-3">
                Opportunities
              </h1>

              <p className="text-gray-600 max-w-md text-center mx-auto">
                Exceptional applications are always be considered and will be treated on a case-by-case basis. Below are our currently funded open opportunities.
              </p>
                <br/>
              <h2  className="text-2xl font-medium my-3">
              Postdoc
              </h2>
              <p className="text-gray-600 max-w-md text-center mx-auto">
                Not currently recruiting.
              </p>
              <h2  className="text-2xl font-medium my-3">
                
              Ph.D.
              </h2>
              <p className="text-gray-600 max-w-md text-center mx-auto">
                Not currently recruiting.
              </p>
              <h2  className="text-2xl font-medium my-3">
              M.Sc.
              </h2>
              <p className="text-gray-600 max-w-md text-center mx-auto">
                Not currently recruiting.
              </p>
              <br/>

              <h1 className="text-4xl font-medium my-3">
                The Lab
              </h1>

              <p className="text-gray-600 max-w-md text-center mx-auto">
              We are a research group dedicated to the explore scientific topics with models and data approaches.
              </p>
                <br/>
              <p>Current research topics include:</p>
              <br/>
              <p className="text-gray-600 max-w-md text-center mx-auto">
              <ul>
                <li>Dynamical models of complex networks</li>
                <li>Statistical inference methods for complex data</li>
                <li>Network epidemiology</li>
                <li>Modeling institutions</li>
                <li>Analysis of open-source</li>
               </ul>
              </p>
              

              <div className="w-full px-16 my-16 max-w-4xl mx-auto ">
                <StaticImage src={"../images/lab/walk.png"} alt={"Lab members walking"} imgClassName="rounded-lg mb-2"/>
              </div>
              
            </div>
          </Page>;
}