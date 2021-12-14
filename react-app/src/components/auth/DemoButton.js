import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../store/session';
import { Modal } from '../../context/Modal';
import './DemoButton.css';

const DemoButton = () => {
	const [showDemoModal, setDemoModal] = useState(false);
	// const [errors, setErrors] = useState([]);
	const dispatch = useDispatch();

	const demoUsers = [
		{
			'username': 'Bernie Madoff', 
			'email': 'bernieMadoff@berniemadoffinvestmentsecurities.com',
			'profile_image': 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-BernieMadoff.jpeg',
			'motto': 'The whole government is a Ponzi scheme!',
		},
		{
			'username': 'Elon Musk', 
			'email': 'elonmusk@tesla.com',
			'profile_image': 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-ElonMusk.jpg',
			'motto': 'Am considering taking Tesla private at $420. Funding secured.',
		},
		{
			'username': 'Jordan Belfort', 
			'email': 'jordanbelfort@wolfofwallstreet.com',
			'profile_image': 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-JordanBelfort.jpeg',
			'motto': 'Sell me this pen.',
		},
		{
			'username': 'Warren Buffett', 
			'email': 'warrenbuffett@berkshirehathaway.com',
			'profile_image': 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WarrenBuffett.jpeg',
			'motto': 'It’s far better to buy a wonderful company at a fair price, than a fair company at a wonderful price.',
		},
		{
			'username': 'WallStreetBets', 
			'email': 'WallStreetBets@reddit.com',
			'profile_image': 'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WallStreetBets.jpg',
			'motto': 'Send Robinhood to the ground and GME to the moon!',
		},
	];

	const handleDemoSubmit = async (email) => {
    // e.preventDefault();
    const data = await dispatch(login(email, 'password'));
    // if (data) {
    //   setErrors(data)
    // };
	};

	return (
		<>
			<button className='demoButton' onClick={() => setDemoModal(true)}>Demo</button>
			{showDemoModal && (
				<Modal onClose={() => setDemoModal(false)}>
				<div className='demoModalContainer'>
					<div className='demoModalHeader'>Choose Your Demo Login</div>
					{demoUsers.map(demoUser => {
						return (
							<div key={demoUser.email} className='demoModalItem' onClick={() => handleDemoSubmit(demoUser.email)}>
								<img className='demoModalImage' src={demoUser.profile_image} alt={demoUser.username}></img>
								<div className='demoModalBody'>
									<div className='demoModalName'>{demoUser.username}</div>
									<div className='demoModalMotto'>{demoUser.motto}</div>
								</div>
							</div>
						)
					})}
					<button className='demoModalCloseButton' onClick={() => {setDemoModal(false)}}>Cancel</button>
				</div>
				</Modal>
			)}
		</>
	);
};

export default DemoButton;
