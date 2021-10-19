import React from 'react';
import classnames from 'classnames';

// Components
import { Container } from 'components/core/layout';
import { JointIcon, OGYIcon, LSDIcon } from 'components/core/icons';

export function IndexHero({ title, className, children }){
  return <div className={classnames('text-gray-900 relative overflow-hidden bg-gradient-to-r pt-32 pb-8 from-gray-700 to-gray-800', className)}>
          <Container>
            <div  className="items-center lg:flex">
              <div className="h-full lg:w-6/12 py-12 border-dashed lg:border-r px-3 lg:px-6">
                <JointIcon/>
                <h1 className="text-gray-100 font-bold text-3xl">The Joint Lab</h1>
                <p className="text-gray-200 text-lg">We are a research group dedicated to the understanding of the structure and of the dynamics of complex systems.</p>
                <p className="uppercase text-gray-300 pt-2 text-sm">Vermont Complex System Center</p>
              </div>
              <div className="h-full lg:w-6/12 lg:mx-4">
                <div className="h-3/6 px-3 lg:px-6 border-t lg:border-t-0 border-b border-dashed py-6">
                  <LSDIcon/>
                  <h1 className="text-gray-100 text-2xl">The LSD Lab</h1>
                  <p className="text-gray-300 text-lg">We are a research group dedicated to the understanding of the structure and of the dynamics of complex systems.</p>
                </div>

                <div className="h-3/6 px-3 lg:px-6 py-6">
                  <OGYIcon/>
                  <h1 className="text-gray-100 text-2xl">The OGY Lab</h1>
                  <p className="text-gray-300 text-lg">We are a research group dedicated to the understanding of the structure and of the dynamics of complex systems.</p>
                </div>
              </div>
            </div>
          </Container>
         </div>
}