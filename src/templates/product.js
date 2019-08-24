import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Carousel from '../components/productCarousel'
import AddButton from "../components/addToCart"
import '../styles/product.css'

function ProductTemplate(props) {
  console.log("Props: ", props.data)
  let product = props.data.stripeSku
  return (
    <Layout>
      <h2>{product.attributes.name}</h2>
      <p><strong>${product.price}</strong></p>
      {/* <p><strong>*****</strong></p> */}
        <Img fluid={product.localFiles[0].childImageSharp.fluid}/>
        {/* <div style={{maxHeight: `100px`}}>
        <Carousel/>
        </div> */}
        <div className="divider"></div>
          {/* <p><strong>SIZE</strong></p>
          <p style={{textAlign: `center`}}>FIND YOUR SIZE</p>
        <div className="divider" style={{width:`100%`}}></div> */}
        <AddButton sku={props.data.stripeSku.id}/>
        <p><strong>FREE 3-DAY SHIPPING</strong></p>
    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
query ProductQuery($slug: String!) {
  stripeSku(fields: {slug: {eq: $slug}}) {
   attributes {
     name
   }
   id
   price
   localFiles {
    childImageSharp {
      fluid(quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  }
}
`