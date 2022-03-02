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
              <h1 className="text-2xl font-medium my-3">
                Under construction
              </h1>
              <p className="text-gray-600 max-w-md text-center mx-auto">
                We are still searching for the right words to describe what makes this lab so awesome.
              </p>
              <div className="w-full px-16 my-16 max-w-4xl mx-auto ">
                <StaticImage src={"../images/lab/walk.png"} alt={"Lab members walking"} imgClassName="rounded-lg mb-2"/>
              </div>
              
            </div>
          </Page>;
}