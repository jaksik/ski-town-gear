import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, ListGroup, ListGroupItem } from 'reactstrap';

class Example extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle} style={{ marginBottom: '1rem', width: `100%` }}>{this.props.title}</Button>
        <Collapse isOpen={this.state.collapse}>
            <ListGroup flush="true" style={{margin: `0`}}>
                <ListGroupItem>T-Shirts</ListGroupItem>
                <ListGroupItem>Jackets and Hoodies</ListGroupItem>
                <ListGroupItem>Accessories</ListGroupItem>
            </ListGroup>
        </Collapse>
      </div>
    );
  }
}

export default Example;