import { useSelector, useDispatch } from "react-redux";
import { BiPlusCircle} from "react-icons/bi";

import { profileImage } from '../../store/session';
import './ProfileImageUpload.css';

const ProfileImageUpload = () => {
	const dispatch = useDispatch();
	const user_id = useSelector(state => state.session.user).id;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const image = await e.target.files[0];
		const formData = new FormData();
		formData.append("image", image);
		await dispatch(profileImage({user_id, formData}));
	}
	
	return (
		<form className='imageUploadForm'>
			<label>
				<input
					className='imageUploadInput'
					type="file"
					accept="image/*"
					onChange={handleSubmit}
					multiple={false}
				/>
				<div className='imageUploadIcon'>
					<BiPlusCircle />
				</div>
			</label>
		</form>
	)
}

export default ProfileImageUpload;