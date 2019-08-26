import React from "react"
import { Link } from "gatsby"
import { Button, Row, Col } from 'reactstrap';

import Layout from "../components/layout"
import SEO from "../components/seo"

import productThemes from "../data/product-themes.json"
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    {productThemes.map(theme => (
      <Row style={{marginBottom:`15px`}} className="justify-content-center">
        <Col xs={10}>
          <Link to={theme.name}>        
            <Button style={{ width:`100%`}} outline color="primary">{theme.name}</Button>{' '}
          </Link>
        </Col>
      </Row>
    ))}
    
 
  </Layout>
)

export default IndexPage
