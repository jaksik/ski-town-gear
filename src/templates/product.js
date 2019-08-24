import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { Button } from 'reactstrap'

import Layout from '../components/layout'
import Carousel from '../components/productCarousel'
import '../styles/product.css'

function ProductTemplate(props) {
  console.log("Props: ", props.data)
  let product = props.data.stripeSku
  return (
    <Layout>
      <h2>{product.attributes.name}</h2>
      <p>${product.price}</p>
      <p><strong>*****</strong></p>
        <Img fluid={product.localFiles[0].childImageSharp.fluid}/>
        {/* <div style={{maxHeight: `100px`}}>
        <Carousel/>
        </div> */}
        <div className="divider" style={{width:`100%`}}></div>
          <p><strong>SIZE</strong></p>
          <p style={{textAlign: `center`}}>FIND YOUR SIZE</p>
        <div className="divider" style={{width:`100%`}}></div>

        <p><strong>FREE 3-DAY SHIPPING</strong></p>
        <Button color="danger" size="lg" block>Add To Cart</Button>{' '}
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