import React from 'react';
import classnames from 'classnames'

export function EmptyView({ title, description, className }){
  return <div className={classnames("text-center", className)}>
            <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
}