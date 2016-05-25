import React from 'react';
// TODO : Bug in this module. The poster loads but video doesno tplay 
class BgVideo extends React.Component {
	render() {
		return (
				<div> 
					<video autoplay  poster="./styles/imgs/vid-poster.png" loop>
						<source src="./styles/videos/bg-vid.mp4"/>
					</video>
				</div>
			)
	}
}

export default BgVideo;