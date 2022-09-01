import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Tracker from './pages/tracker/Tracker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Tracker />
	</React.StrictMode>
);
