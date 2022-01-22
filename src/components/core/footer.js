import React from 'react'

// Components
import { Container } from 'components/core/layout';
import { StaticImage } from "gatsby-plugin-image"

export function Footer() {
  return (
    <footer className="bg-gray-100 w-full z-0" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <p className="text-gray-700 text-base">

              <h3 className="text-sm  text-gray-400 tracking-wider uppercase">The Joint Lab</h3>
              Collaborative explorations across sciences with models and data.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <p className="text-gray-500 text-base">
                  University of Vermont
                </p>
                <p className="text-gray-500 text-base">
                  Burlington, VT (USA)
                </p>
              </div>
            </div>
             <div className="flex items-center space-x-4">
              <a href="https://www.uvm.edu"><StaticImage src="../../images/logo/uvm.png" alt="UVM logo" height={100}/></a>
              <a href="https://vermontcomplexsystems.org"><StaticImage src="../../images/logo/uvm_complex.png" alt="UVM logo" height={100}/></a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}