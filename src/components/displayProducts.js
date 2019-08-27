import React from 'react';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProductCard from "./productCard"

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.sortSkus = this.sortSkus.bind(this);
    this.sortSkusUp = this.sortSkus.bind(this);

    this.state = {
      dropdownOpen: false,
      allSkus: this.props.skus,
      displayedSkus: this.props.skus,
    };
  }

  componentDidMount() {
    console.log("props: ", this.props.skus)
    this.setState({ allSkus: this.props.skus});
    console.log("state: ", this.state.allSkus)
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  //Functions to filter and sort the skus passed in as props
    sortSkus(action) {
        const newOrder = this.state.allSkus.sort(function (a, b) {
            return a.node.price - b.node.price;
        });

        if(action === "price-descending") {
            newOrder.reverse()
        }
        this.setState({ displayedSkus: newOrder})
    }

  render() {
    return (
      <div>
          <Row>
              <Col xs={6}>
            
              </Col>

              <Col xs={6}>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle>
                        SORT
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.sortSkus("price-ascending")}>$-$$$</DropdownItem>
                        <DropdownItem onClick={() => this.sortSkus("price-descending")}>$$$-$</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
              </Col>
          </Row>

          <Row className="no-gutters">
                {this.state.displayedSkus.map(sku => {
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