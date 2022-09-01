import AddActivityForm from './addActivityForm/AddActivityForm';
import ShowActivity from './showActivity/ShowActivity';
import ShowStatistic from './showStatistic/ShowStatistic';
import axios from 'axios';
import './Tracker.scss';
import { useEffect, useState } from 'react';

function Tracker() {
	const [activities, setActivities] = useState([]);
	const [statistic, setStatistic] = useState({});

	useEffect(() => {
		axios
			.get('https://zelios.studio/api/wise-tracker/showActivity.php')
			.then((res) => {
				if (res.status === 200) {
					setActivities(res.data);
				}
			});
	}, []);

	const getNewActivity = (newActivity) => {
		newActivity.id = Date.now();
		newActivity.idType = newActivity.type;
		newActivity.type = newActivity.type === 1 ? 'Run' : 'Ride';
		setActivities([newActivity, ...activities]);
	};

	useEffect(() => {
		let statisticData = {
			lgRide: activities
				.filter((el) => +el.idType === 2)
				.sort((a, b) => b.distance - a.distance)[0],
			lgRun: activities
				.filter((el) => +el.idType === 1)
				.sort((a, b) => b.distance - a.distance)[0],
			totalRide: activities
				.filter((el) => +el.idType === 2)
				.reduce((sum, el) => (sum += +el.distance), 0),
			totalRun: activities
				.filter((el) => +el.idType === 1)
				.reduce((sum, el) => (sum += +el.distance), 0),
		};

		setStatistic(statisticData);
	}, [activities]);

	return (
		<div className="container">
			<header>
				<h1>Activity tracker</h1>
			</header>
			<AddActivityForm getNewActivity={getNewActivity} />
			<div className="content-area">
				<ShowActivity activities={activities} />
				<ShowStatistic statistic={statistic} />
			</div>
		</div>
	);
}

export default Tracker;
