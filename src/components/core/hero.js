import React from 'react';
import classnames from 'classnames';

// Components
import { Container } from 'components/core/layout';
import { JointIcon, CDLIcon, LSDIcon } from 'components/core/icons';

export function IndexHero({ title, className, children }){
  return <div className={classnames('text-gray-900 relative overflow-hidden bg-gradient-to-r pt-32 pb-8 from-gray-700 to-gray-800', className)}>
          <Container>
            <div  className="items-center lg:flex">
              <div className="h-full lg:w-6/12 py-12 border-dashed lg:border-r px-3 lg:px-6">
                <JointIcon/>
                <h1 className="text-gray-100 font-bold text-3xl">The Joint Lab</h1>
                <p className="text-gray-200 text-lg">Collaborative explorations across sciences with models and data</p>
                <p className="uppercase text-gray-300 pt-2 text-sm">Hosted at the <a href="https://vermontcomplexsystems.org/">Vermont Complex System Center</a></p>
              </div>
              <div className="h-full lg:w-6/12 lg:mx-4">
                <div className="h-3/6 px-3 lg:px-6 border-t lg:border-t-0 border-b border-dashed py-6">
                  <LSDIcon/>
                  <h1 className="text-gray-100 text-2xl">The Laboratory for Structure and Dynamics</h1>
                  <p className="text-gray-300 text-lg">Our research focus on the coevolution of structure and dynamics in complex systems.</p>
                </div>

                <div className="h-3/6 px-3 lg:px-6 py-6">
                  <CDLIcon/>
                  <h1 className="text-gray-100 text-2xl">The Complex Data Laboratory</h1>
                  <p className="text-gray-300 text-lg">We make sense of complex data by briding the gap between statistics, computer science and complex systems.</p>
                </div>
              </div>
            </div>
          </Container>
         </div>
}