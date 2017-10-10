import React from 'react';
import ReactDOM from 'react-dom';

import img from './images/cat.jpg';

require('./fonts/font-jejuHallasan.scss');
require('./app.scss');

ReactDOM.render(
	<div>
		<p className='title'>헬로우 월드!</p>
		<img src={img} />
	</div>
, document.getElementById('root'));