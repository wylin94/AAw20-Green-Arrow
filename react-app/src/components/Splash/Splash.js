import { NavLink } from 'react-router-dom';
import { AiOutlineInfoCircle, AiOutlineGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { SiJavascript, SiReact, SiPython, SiHtml5, SiCss3, SiFlask, SiPostgresql, SiDocker } from "react-icons/si";

import './Splash.css'

function Splash() {
	return(
		<div className='splashWrapper'>
			<div className='splashFirstSection'>
				<div className='splashFirstSectionContainer'>
					<div className='splashFirstLeft'>
						<div className='splashFirstSloganContainer'>
							<div className='splashFirstSlogan'>Investing for Everyone</div>
						</div>
						<div className='splashFirstDec'>Risk-free investing, plus the tools you need to put your money in motion. Sign up and get your $1,000,000 cash. No limitations and fees apply.</div>
						<NavLink className='splashFirstSignUp' to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
						<div className='splashFirstDiscloseContainer'>
							<div className='splashFirstDiscloseIcon'><AiOutlineInfoCircle /></div>
							<div className='splashFirstDiscloseText'>Not a real trading platform</div>
						</div>
					</div>
					<div className='splashFirstRight'>
						<img className='splashFirstImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashFirstSection.png'} alt='splashFirstImage'></img>
					</div>
				</div>
			</div>
			<div className='splashSecondSection'>
				<div className='splashSecondSectionText'>See what you can do with 1 million dollars.</div>
			</div>
			<div className='splashThirdSection'>
				<div className='splashThirdSectionContainer'>
					<div className='splashThirdLeft'>
						<img className='splashThirdImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashThirdSection.png'} alt='splashThirdImage'></img>
					</div>
					<div className='splashThirdRight'>
						<div className='splashThirdHeaderContainer'>
							<div className='splashThirdHeader'>Introducing the New Way to Invest</div>
							<div className='splashThirdHeaderText'>Get in the action. Now, you can become one of the first public investors to experience our game-changing trading platform.</div>
						</div>
						<div className='splashThirdBodyOne'>
							<div>
								<img className='splashThirdIcon1' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashThirdSectionIcon1.svg'} alt='splashThirdIcon1'></img>
							</div>
							<div>
								<div className='splashThirdBodyOneHeader'>It's your turn</div>
								<div className='splashThirdBodyOneText'>Invest with confidence and with money you do not have, RISK FREE! </div>
							</div>
						</div>
						<div className='splashThirdBodyTwo'>
							<div>
								<img className='splashThirdIcon1' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashThirdSectionIcon2.svg'} alt='splashThirdIcon1'></img>
							</div>
							<div>
								<div className='splashThirdBodyTwoHeader'>Be one of the first</div>
								<div className='splashThirdBodyTwoText'>Join now and start trading before the world crash our site.</div>
							</div>
						</div>
						<div className='splashThirdBodyThree'>
							<div>
								<img className='splashThirdIcon1' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashThirdSectionIcon3.svg'} alt='splashThirdIcon1'></img>
							</div>
							<div>
								<div className='splashThirdBodyThreeHeader'>Get a fair shot</div>
								<div className='splashThirdBodyThreeText'>All user receive $1,000,000 sign up bonus. Everyone is a millionaire. Wealth inequality problem solved.</div>
							</div>
						</div>
						<div className='splashThirdDiscloseContainer'>
							<div className='splashThirdDiscloseIcon'><AiOutlineInfoCircle /></div>
							<div className='splashThirdDiscloseText'>Not a real trading platform</div>
						</div>
					</div>
				</div>
			</div>
			<div className='splashFourthSection' id='meetDeveloper'>
				<div className='splashFourthSectionContainer'>
					<div className='splashFourthLeft'>
						<div className='splashFourthHeaderContainer'>
							<div className='splashFourthHeaderNameContainer'>
								<div className='splashFourthHeaderName'>Introducing Jack Lin</div>
								<a className='splashFourthGithub' href='https://github.com/wylin94'><AiOutlineGithub/></a>
								<a className='splashFourthLinkedIn' href='https://www.linkedin.com/in/wylin94/'><BsLinkedin /></a>
							</div>
							<div className='splashFourthHeader'>Invest in Jack and collect your profit</div>
						</div>
						<div className='splashFourthBodyContainer'>
							<div className='splashFourthBodyOne'>
								<div className='splashFourthBodyOneHeader'>Invest in the Best </div>
								<div className='splashFourthBodyOneText'>Pick your winning stock now and you will recieve your maximum return from Jack.</div>
							</div>
							<div className='splashFourthBodyTwo'>
								<div className='splashFourthBodyTwoHeader'>Build Your Company</div>
								<div className='splashFourthBodyTwoText'>Customize your team by placing Jack in the appropriate role and watch your company grow.</div>
							</div>
							<div className='splashFourthBodyThree'>
								<div className='splashFourthBodyThreeHeader'>Work in Real Time</div>
								<div className='splashFourthBodyThreeText'>Jack works from market open to market close, after-hours working is now available. You can always count on him.</div>
							</div>
						</div>
						<div className='splashFourthDiscloseContainer'>
							<div className='splashFourthDiscloseIcon'><AiOutlineInfoCircle /></div>
							<div className='splashFourthDiscloseText'>A real and a serious developer</div>
						</div>
					</div>
					<div className='splashFourthRight'>
						<img className='splashFourthImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/jack.jpeg'} alt='Jack'></img>
					</div>
				</div>
			</div>
			<div className='splashFifthSection'>
				<div className='splashFifthSectionContainer'>
					<div className='splashFifthLeft'>
						<img className='splashFifthImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashFifthSection.png'} alt='POW!'></img>
					</div>
					<div className='splashFifthRight'>
						<div className='splashFifthHeader'>GreenArrow is built with these technologies</div>
						<div className='splashFifthIconContainer'>
							<div className='splashFifthIconGroup1'>
								<SiJavascript />
								<SiReact />
								<SiPython />
								<SiHtml5 />
							</div>
							<div className='splashFifthIconGroup2'>
								<SiCss3 />
								<SiFlask />
								<SiPostgresql />
								<SiDocker />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Splash;