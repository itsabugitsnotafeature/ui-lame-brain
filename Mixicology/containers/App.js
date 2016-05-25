import React from 'react';
import ReactDOM from 'react-dom';
import BgVideo from './BgVideo';
 
class World extends React.Component {
  render() {
    return (
    		<div>
    			<BgVideo/>
    		</div>
    	)
  }
}
 
ReactDOM.render(<World/>, document.getElementById('mixicology-app'));
