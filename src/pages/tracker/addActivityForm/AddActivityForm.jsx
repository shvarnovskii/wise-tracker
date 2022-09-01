import './AddActivityForm.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const AddActivityForm = ({ getNewActivity }) => {
	const [start, setStart] = useState('');
	const [finish, setFinish] = useState('');
	const [distance, setDistance] = useState('');
	const [type, setType] = useState(1);
	const [btnDisable, setBtnDisable] = useState(true);

	const addActivity = (e) => {
		e.preventDefault();

		if (start && finish && distance && type) {
			let date = new Date(),
				startDate = new Date(
					date.toISOString().split('T')[0] + `T${start}:00.000Z`
				).getTime(),
				finishDate = new Date(
					date.toISOString().split('T')[0] + `T${finish}:00.000Z`
				).getTime();

			let newActivity = {
				start: +startDate,
				finish: +finishDate,
				distance: distance,
				type: +type,
			};

			axios
				.post(
					'https://zelios.studio/api/wise-tracker/insertAcivity.php',
					newActivity
				)
				.then((res) => {
					if (res.status === 200) {
						getNewActivity(newActivity);
						setStart('');
						setFinish('');
						setDistance('');
						setBtnDisable(false);
					}
				});
		}
	};

	useEffect(() => {
		start && finish && +distance && finish > start
			? setBtnDisable(false)
			: setBtnDisable(true);
	}, [distance, start, finish]);

	return (
		<div className="add-activity">
			<h4>Add new activity:</h4>
			<form className="form-add-activity" onSubmit={addActivity}>
				<label htmlFor="start">Start time:</label>
				<input
					name="start"
					id="start"
					type="time"
					value={start}
					onChange={(e) => setStart(e.target.value)}
				/>

				<label htmlFor="finish">Finish time:</label>
				<input
					name="finish"
					type="time"
					id="finish"
					value={finish}
					onChange={(e) => setFinish(e.target.value)}
				/>

				<label htmlFor="distance">Distance:</label>
				<input
					name="distance"
					type="number"
					min="0"
					step="0.1"
					id="distance"
					placeholder="Distance"
					value={distance}
					onChange={(e) => setDistance(e.target.value)}
				/>

				<label htmlFor="type">Activity type:</label>
				<select name="type" id="type" onChange={(e) => setType(e.target.value)}>
					<option value="1">Run</option>
					<option value="2">Ride</option>
				</select>

				<button disabled={btnDisable} type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default AddActivityForm;
