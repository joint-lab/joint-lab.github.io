import React, { useState } from 'react';

import { Button } from 'components/core/buttons';

function CheckboxItem({ name, title, description, ...props }){
  return (<div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={name}
                  aria-describedby={`${name}-description`}
                  name={name}
                  type="checkbox"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  {...props}
                />
              </div>

              <div className="ml-3 text-sm">
                <label htmlFor={name} className="font-medium text-gray-700">
                  {title}
                </label>
                <span id={`${name}-description`}className="text-gray-500">
                  {description}
                </span>
              </div>
            </div>)
}

export function CheckboxList({ title, values }){
  return (<form>
            <fieldset className="space-y-2">
              <legend className="text-lg font-medium text-gray-900">{ title }</legend>
              {values.map(v=><CheckboxItem key={v.name} {...v}/>)}
            </fieldset>
          </form>)
}

function RadioItem({ name, title, description, ...props }){
  return (<div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={title}
                  aria-describedby={`${name}-description`}
                  name={name}
                  type="radio"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded-full"
                  {...props}
                />
              </div>

              <div className="ml-3 text-sm" htmlFor={title}>
                <label htmlFor={title} className="font-medium text-gray-700">
                  {title}
                </label>
                <span id={`${name}-description`}className="text-gray-500">
                  {description}
                </span>
              </div>
            </div>)
}

export function RadioList({ title, values, numValuesShown }){
  const [showMore, setShowMore] = useState(false);
  return (<div>
            <form>
              <fieldset className="space-y-2">
                <legend className="text-lg font-medium text-gray-900">{ title }</legend>
                {values.slice(0,showMore? values.length: numValuesShown).map(v=><RadioItem key={v.title} name={title} {...v}/>)}
              </fieldset>
            </form>
            <Button size="noneXS" color="clear" onClick={()=>setShowMore(!showMore)}>
              {showMore? "Show less": "Show more"}
            </Button>
          </div>)
}