import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Button, Row, Col } from 'reactstrap';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Collapse from "../components/homeCollapse"
import productThemes from "../data/product-themes.json"
import CoverPageAd from "../components/coverPageAd"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/landing.css'
const IndexPage = ({ data }) => {
  console.log("data: ", data)
  return (
  <Layout>
    <SEO title="Home" />
    
    <Img fluid={data.coverImg.childImageSharp.fluid} />
    
    <Row className="no-gutters">
      <Col xs={12}>
        <Link to="/shop/mens">
          <Button outline color="secondary" className="home-button">Men's</Button>{' '}
        </Link>
      </Col>
      <Col xs={12}>
        <Link to="/shop/womens">
          <Button outline color="secondary" className="home-button">Women's</Button>{' '}
        </Link>
      </Col>
      <Col xs={12}>
        <Link to="/">
          <Button outline color="secondary" className="home-button">Equipment</Button>{' '}
        </Link>
      </Col>
      <Col xs={12}>
        <Link to="/">
          <Button outline color="secondary" className="home-button">Accessories</Button>{' '}
        </Link>
      </Col>
    </Row>

    <CoverPageAd title="Breckenridge" img={data.coverTwo.childImageSharp.fluid}/>
    
    <CoverPageAd title="Keystone" img={data.coverThree.childImageSharp.fluid}/>

    <CoverPageAd title="Aspen" img={data.coverImg.childImageSharp.fluid}/>

  </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    coverImg: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth:4000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    coverTwo: file(relativePath: { eq: "breckenridge.jpg" }) {
      childImageSharp {
        fluid(maxWidth:4000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    coverThree: file(relativePath: { eq: "keystone.jpg" }) {
      childImageSharp {
        fluid(maxWidth:4000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`