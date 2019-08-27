import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Metatags from '../components/Metatags';
import { graphql } from 'gatsby'
import { Row, Col, Button } from 'reactstrap'
// import "../style/index.css"
import Carousel from "../components/productCarousel"
import ProductCard from "../components/productCard"
import DisplayProducts from "../components/displayProducts"

function ShopCategoryTemplate(props) {
    const skus = props.data.allStripeSku.edges;
    const post = props.data.markdownRemark;
    const url = props.data.site.siteMetadata.siteUrl
    const { title, description } = post.frontmatter;
    const thumbnail = post.frontmatter.image.childImageSharp.resize.src
    return (
        <Layout>
            <Metatags
                title={title}
                description={description}
                thumbnail={url + thumbnail}
                url={url}
                pathname={props.location.pathname}
            />
          

                

                    <DisplayProducts skus={skus}/>

        </Layout>
    )
}


export default ShopCategoryTemplate


export const query = graphql`

 query CategoryTemplate($slug: String!) {
     markdownRemark(fields: { slug: { eq: $slug } }) {
       html
       frontmatter {
        title
        description
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
       }
       }
   }

   allStripeSku(filter: {product: {metadata: {gender: { eq: "men"}}}})
   {
    edges {
      node {
        id
        currency
        price
        attributes {
          name
        }
        fields {
          slug
        }
        localFiles {
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }

  site {
    siteMetadata {
        siteUrl
      }
   }
}
`