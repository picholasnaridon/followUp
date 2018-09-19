import React, { Component } from 'react';

class DealStatus extends Component {
  render() {
    return (
      <span>
        <span style={{
          color: this.props.status === 'In Danger' ? '#ff2e00'
            : this.props.status === 'Follow Up' ? '#ffbf00'
              : '#57d500',
          transition: 'all .3s ease'
        }}>
          &#x25cf;
        </span> {
          this.props.status === 'In Danger' ? 'Danger'
            : this.props.status === 'Follow Up' ? `Follow Up`
              : 'Good'
        }
      </span >
    );
  }
}

export default DealStatus;