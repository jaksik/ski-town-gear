import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Row, Col } from 'reactstrap';
import "./style.css"

const CoverPageAd = (props) => {

  return (
    <div>
      <div style={{position: `relative`}}>
        <div className="cover-ad-text">
          <h4>{props.title}</h4>
        </div>
        <Img fluid={props.img} style={{position: `initial`}} />
      </div>

      <Row className="no-gutters" style={{textAlign:`center`}}>
        <Col xs={6}>
          <Link to="/shop/mens/">
            SHOP MEN'S
          </Link>
        </Col>
        <Col xs={6}>
          <Link to="/shop/womens/">
              SHOP WOMEN'S
            </Link>
        </Col>
      </Row>
    </div>
  )
}

export default CoverPageAd
