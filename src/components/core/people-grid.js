import React from "react"
import classnames from 'classnames';

// Components
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container } from 'components/core/layout';

function LabTag({ lab }){
  const styles = {
    LSD: 'text-uvm-deep-blue border-uvm-deep-blue font-medium',
    CDL: 'text-uvm-bright-green border-uvm-bright-green font-medium',
  }
  if (lab){
    return <div>{lab.map(val=><div key={val} className={classnames("border-b-2 inline-flex items-center mr-2.5 py-0.5 text-sm uppercase", styles[val])}>{val}</div>)}</div>
  }
  else {
    return null;
  }
}

function PersonThumbnail({ firstName, lastName, role, imageURL, slug, githubURL, personalURL, scholarURL, twitterURL, email, lab}){
  const image = imageURL? getImage(imageURL): null;
  return <li className="py-4 px-0 rounded-lg xl:px-3 xl:text-left space-y-4 justify-start justify-items-start group transition duration-150 hover:opacity-90">
          <Link to={slug} >
              {image?<GatsbyImage image={image} alt={firstName+" "+lastName} imgClassName="rounded-lg "/>:
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
               </div>}
          </Link>
          <div className="">
            <Link to={slug}>
              <div className="text-lg leading-6 font-medium space-y-1">
                <h3 className="group-hover:underline">{firstName} {lastName}</h3>
                <p className="text-gray-600 text-sm">{role}</p>
              </div>
            </Link>
            <LabTag lab={lab}/>
          </div>
        </li>
}

function AlumniThumbnail({ firstName, lastName, role, nextRole, imageURL, slug, githubURL, personalURL, scholarURL, twitterURL, email, lab}){
  return <li className="px-2 py-2 rounded xl:text-left space-y-4 justify-start justify-items-start group">
            <Link to={slug}>
              <div className="text-lg leading-6 font-medium space-y-1">
                <h3 className="group-hover:underline">{firstName} {lastName}</h3>
                <p className="text-gray-600">First moved to: {nextRole}</p>
                <p className="text-green-600">Graduated as: {role}</p>
              </div>
            </Link>
        </li>
}

const gridParams = "xs:grid grid grid-cols-2 sm:grid-cols-4 sm:space-y-0 lg:grid-cols-5 xl:grid-cols-6 gap-x-4";
const headerParams = "mt-16 border-b-2 border-gray-800 py-1 mb-4 lg:py-4 text-3xl font-bold tracking-tight sm:text-4xl bg-white z-10";

export function PeopleGrid({ title, people, className }){
  return <div className={className}>
            <Container>
              <h1 className={headerParams}>{title}</h1>
              <ul className={gridParams}>
              {people.map(({ node }, index)=><PersonThumbnail key={index} {...node.frontmatter} {...node.fields}/>)}
              </ul>
          </Container>
          </div>
}

const alumniGridParams = "xs:grid grid sm:grid-cols-2 gap-x-4";

export function AlumniGrid({ title, people, className }){
  return <div className={className}>
            <Container>
              <h1 className={headerParams}>{title}</h1>
              <ul className={alumniGridParams}>
              {people.map(({ node }, index)=><AlumniThumbnail key={index} {...node.frontmatter} {...node.fields}/>)}
              </ul>
            </Container>
          </div>
}