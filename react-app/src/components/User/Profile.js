import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import './Profile.css';

function Profile() {
	const user = useSelector(state => state.session.user);
	console.log(user)



  return (
    <div className='profileWrapper'>
			<div className='profileContainer'>

				<div className='profileLeft'>
					<div className='profileHeader'>
						<div className='profileHeaderImage'>user image</div>
						<div className='profileHeaderNameContainer'>
							<div className='profileHeaderName'>{user.username}</div>
							<div className='profileHeaderNameMoto'>user moto</div>
						</div>
					</div>

				</div>

				<div className='profileRight'>

				</div>

			</div>
    </div>
  );
}
export default Profile;