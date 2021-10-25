import React from "react";
import PropTypes from 'prop-types';
import classnames from "classnames";

// Components
import { Link } from 'gatsby';

// Definitions
const sizes =   {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
  none: 'px-0 py-0 text-base',
  noneXS: 'px-0 py-0 text-xs'
};

const colors =   {
  primary: 'text-white bg-green-600 hover:bg-green-700',
  lightPrimary: 'text-green-700 bg-green-100 hover:bg-green-200',
  clear: 'text-green-700 bg-none hover:bg-none outline-none ring-0 shadow-none hover:text-green-900',
};

const layouts =   {
  block: 'w-full flex justify-center',
  base: 'inline-flex items-center',
};

export function Button({ block, color, size, children, disabled, className, href, ...props }){
  var _className = classnames("border border-transparent font-medium rounded shadow-sm", 
                            sizes[size], 
                            block? layouts['block']: layouts['base'],
                            colors[color],
                            disabled? 'opacity-30 cursor-default': '',
                            className)
  if (href){
    return <Link to={href} className={_className} disabled={disabled} {...props}>
          {children}
          </Link>
  }
  return <button className={_className} disabled={disabled} {...props}>
          {children}
          </button>
}

Button.propTypes = {
  block: PropTypes.bool, // block, base
  color: PropTypes.string, // primary, lightPrimary
  size: PropTypes.string, // xs, sm, md, lg, xl, 2xl
  children: PropTypes.node,
  loading: PropTypes.bool,
  className: PropTypes.string,
}