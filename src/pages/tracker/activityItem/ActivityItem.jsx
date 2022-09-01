import './ActivityItem.scss';

const ActivityItem = ({ activity }) => {
	let { id, start, finish, distance, type } = activity,
		date = new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
		}).format(start),
		hours = Math.floor((finish - start) / 60000 / 60),
		minutes = Math.floor(((finish - start) / 60000) % 60),
		speed = (distance / ((finish - start) / 60000 / 60)).toFixed(1);

	speed = +speed[speed.length - 1] === 0 ? speed.split('.')[0] : speed;

	let timeInRoad = `${hours ? hours + ' h' : ''} ${minutes} ${
		hours ? 'm' : 'minutes'
	}`;

	return (
		<tr key={id}>
			<td>{date}</td>
			<td>{type}</td>
			<td>{distance} km</td>
			<td>{timeInRoad}</td>
			<td>{speed} km / hour</td>
		</tr>
	);
};

export default ActivityItem;
