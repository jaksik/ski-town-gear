import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import Metatags from '../components/Metatags';
import { graphql } from 'gatsby'
import { Row, Col } from 'reactstrap'
// import "../style/index.css"
import Carousel from "../components/productCarousel"

function ResourcePage (props) {
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
                
                <div dangerouslySetInnerHTML={{ __html: post.html }} />

                <Row className="no-gutters">
                   
                </Row>
        </Layout>
    )
}


export default ResourcePage


export const query = graphql`

 query ResourceQuery($slug: String!) {
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

  site {
    siteMetadata {
        siteUrl
      }
   }
}
`