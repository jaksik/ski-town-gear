import React from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProductCard from "./productCard"

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }


  //Functions to filter and sort the skus passed in as props

  render() {
    return (
      <div>
          <Row>
              <Col xs={6}>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                FILTER
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>
              </Col>

              <Col xs={6}>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle>
                SORT
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem disabled>Action (disabled)</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>
              </Col>
          </Row>

          <Row className="no-gutters">
                    {this.props.skus.map(sku => {
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


      </div>
    );
  }
}