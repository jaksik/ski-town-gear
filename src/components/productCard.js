import { Link } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"

const ProductCard = ({ thumbnail, name, price, link }) => (
  <Link 
  to={link}
    style={{
        textAlign: `center`,
    }}
    >
        <Img fluid={thumbnail}/>
      <p><strong> {name}</strong></p>
      <p>${price}</p>
  </Link>
)

export default ProductCard
