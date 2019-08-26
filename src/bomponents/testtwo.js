import React from "react"
import { Link } from "gatsby"
import { Button, Row, Col } from 'reactstrap';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Form from "../components/stripeForm"
import productThemes from "../data/product-themes.json"
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
   
    <Form/>
 
  </Layout>
)

export default IndexPage
