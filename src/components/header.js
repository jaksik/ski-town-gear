import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Row, Col } from "reactstrap"
import logo from "../images/icons/mountains.jpg"
import cartLogo from "../images/icons/shopping-cart.png"
import contactLogo from "../images/icons/contact.png"
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `white`,
    }}
  >
    {/* <Row className="d-none d-sm-block no-gutters">
      <Col xs={2} style={{ float:`right`, display:`` }}>
              <Link
                to="/cart"
                >
                  <p>Contact Us</p>
                </Link>
            </Col>
          <Col xs={2} style={{ float:`right`, display:`` }}>
            <Link
              to="/cart"
              >
                <img style={{ float:`right`}} src={cartLogo} width={30}/>
              </Link>
          </Col>
    </Row> */}
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
      }}
    >
      {/* <h1 className="d-none d-md-block" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1> */}
      <Row className="xs-block d-md-none align-items-center no-gutters">
          <Col>
            <Link
            to="/"
            >
              <img src={logo} style={{width: `50px`}}/>
            </Link>
          </Col>
          <Col xs={2} className="offset-2">
            <Link
            to="/contact"
            >
              <img src={contactLogo} width={30}/>
            </Link>
          </Col>
          <Col xs={2} className="">
            <Link
            to="/cart"
            >
              <img src={cartLogo} width={30}/>
            </Link>
          </Col>
          <Col xs={2} className="">
            <Link
            to="/cart"
            >
              <img src={cartLogo} width={30}/>
            </Link>
          </Col>
      </Row>
    </div>

    {/* Anouncement Banner */}
    <Row style={{ background: `black`, color: `white`, textAlign: `center` }} className="no-gutters justify-content-center align-items-center">
      <Col md={4} className="d-none d-md-block">
          <p>LABOR DAY SALE!</p>
      </Col>
      <Col xs={12} md={4} className="">
          <p>LABOR DAY SALE!</p>
      </Col>
      <Col md={4} className="d-none d-md-block">
          <p>LABOR DAY SALE!</p>
      </Col>
    </Row>
    
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
