import ActivityItem from '../activityItem/ActivityItem';
import './ShowActivity.scss';

const ShowActivity = ({ activities }) => {
	return (
		<div className="data-area">
			<table>
				<tbody>
					{activities.map((activity) => {
						return <ActivityItem key={activity.id} activity={activity} />;
					})}
				</tbody>
			</table>
		</div>
	);
};

export default ShowActivity;
