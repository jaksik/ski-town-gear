import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Metatags from '../components/Metatags';
import { graphql } from 'gatsby'
import { Row, Col } from 'reactstrap'
// import "../style/index.css"
import Carousel from "../components/productCarousel"
import ProductCard from "../components/productCard"

function BlogPost(props) {
    console.log(skus)
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
                <h1>{title}</h1>
                <Carousel/>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />

                <Row className="no-gutters">
                    {skus.map(sku => {
                        const skuData = sku.node;
                        console.log("sku: ", skuData.fields.slug)
                        return (
                            <Col xs={6} sm={4}>
                                <ProductCard 
                                    name={skuData.attributes.name} 
                                    price={skuData.price}
                                    thumbnail={skuData.localFiles[0].childImageSharp.fluid}
                                    link={skuData.fields.slug}
                                />
                            </Col>
                        )
                    })}
                </Row>
        </Layout>
    )
}


export default BlogPost


export const query = graphql`

 query PostQuery($slug: String!) {
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

   allStripeSku(
    sort: { fields: [price] }
  ) {
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