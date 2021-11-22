import { NavLink } from 'react-router-dom';
import './PageNotFound.css'

function PageNotFound() {
	return(
		<div className='PNFWrapper'>
			<div className='PNFContainer'>
				<div className='PNFLeft'>
					<div className='PNFHeaderContainer'>
						<div className='PNFHeaderOne'>404</div>
						<div className='PNFHeaderTwo'>Page not found</div>
					</div>
					<div className='PNFText'>The website just blew up, please go back home safe.</div>
					<NavLink className='PNFGoHomeButton' to='/' exact={true} activeClassName='active'>Go Home</NavLink>
				</div>
				<div className='PNFRight'>
					<img className='PNFImage' src='/images/PageNotFound.png' alt='Boom'></img>
				</div>
			</div>
		</div>
	)
}

export default PageNotFound;