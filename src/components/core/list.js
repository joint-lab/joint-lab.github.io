import React from 'react';
import classnames from 'classnames';

export function List({ children, className }){
  return <ul className={classnames("list-disc list-inside", className)}>{children}</ul>
}

export function ListItem({ children, className }){
  return <li className={classnames(className)}>{children}</li>
}

List.Item = ListItem;