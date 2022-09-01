import './ShowStatistic.scss';

const ShowStatistic = ({ statistic }) => {
	let arrFieldStat = ['date', 'distance', 'time'];

	const showInfoLongest = (obj, typeInfo) => {
		switch (typeInfo) {
			case 'date':
				let date = new Intl.DateTimeFormat('en-US', {
					month: 'short',
					day: 'numeric',
				}).format(obj?.start);
				return date;

			case 'distance':
				return obj?.distance + ' km';

			case 'time':
				let hours = Math.floor((obj?.finish - obj?.start) / 60000 / 60),
					minutes = Math.floor(((obj?.finish - obj?.start) / 60000) % 60),
					time = `${hours ? hours + ' h' : ''} ${minutes} ${
						hours ? 'm' : 'minutes'
					}`;
				return time;

			default:
				break;
		}
	};

	return (
		<div className="statistic-area">
			<div className="distance">
				<div className="statistic-item">
					<h3>Longest ride:</h3>
					<ul className="statistic">
						{arrFieldStat.map((el) => {
							return <li>{showInfoLongest(statistic.lgRide, el)}</li>;
						})}
					</ul>
				</div>
				<div className="statistic-item">
					<h3>Longest run:</h3>
					<ul className="statistic">
						{arrFieldStat.map((el) => {
							return <li>{showInfoLongest(statistic.lgRun, el)}</li>;
						})}
					</ul>
				</div>
			</div>
			<div className="total">
				<ul className="total-list">
					<li>
						Total ride distance: <span>{statistic.totalRide} km</span>
					</li>
					<li>
						Total run distance: <span>{statistic.totalRun} km</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ShowStatistic;
