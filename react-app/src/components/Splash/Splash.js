import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineInfoCircle, AiOutlineGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { RiProfileLine } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { SiJavascript, SiReact, SiRedux, SiPython, SiHtml5, SiCss3, SiFlask, SiPostgresql, SiDocker } from "react-icons/si";


import './Splash.css'

function Splash() {
	const [name, setName] = useState(true);
	const [design, setDesign] = useState(false);
	const [implementation, setImplementation] = useState(false);

	const handleMyDesignClick = (name, design, implementation) => {
		setName(name);
		setDesign(design);
		setImplementation(implementation);
	};

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
							<div className='splashThirdDiscloseText'>Not a real million dollar</div>
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
								{/* <a className='splashFourthGithub' href='https://github.com/wylin94'><AiOutlineGithub/></a>
								<a className='splashFourthLinkedIn' href='https://www.linkedin.com/in/wylin94/'><BsLinkedin /></a>
								<a className='splashFourthPortfolio' href='https://wylin94.github.io/'><RiProfileLine /></a> */}
							</div>
							<div className='splashFourthHeader'>Invest in Jack and collect your profit</div>
						</div>
						<div className='splashFourthBodyContainer'>
							<div className='splashFourthBodyOne'>
								<div className='splashFourthBodyOneHeader'>Invest in the Best </div>
								<div className='splashFourthBodyOneText'>Lock in your winning investment now, and recieve your maximum return from Jack.</div>
							</div>
							<div className='splashFourthBodyTwo'>
								<div className='splashFourthBodyTwoHeader'>Build Your Company</div>
								<div className='splashFourthBodyTwoText'>Customize your team by placing Jack in the appropriate role and watch your company grow.</div>
							</div>
							<div className='splashFourthBodyThree'>
								<div className='splashFourthBodyThreeHeader'>Result in Real Time</div>
								<div className='splashFourthBodyThreeText'>Jack works from market open to market close, after-hours working is now available. You can always count on him.</div>
							</div>
						</div>
						<div className='splashFourthDiscloseContainer'>
							{/* <div className='splashFourthDiscloseIcon'><AiOutlineInfoCircle /></div> */}
							<a className='splashFourthPortfolio' href='https://wylin94.github.io/'><CgProfile /></a>
							<div className='splashFourthDiscloseText'>A real person</div>
							<a className='splashFourthGithub' href='https://github.com/wylin94'><AiOutlineGithub/></a>
							<div className='splashFourthDiscloseText'>A serious developer</div>
							<a className='splashFourthLinkedIn' href='https://www.linkedin.com/in/wylin94/'><BsLinkedin /></a>
							<div className='splashFourthDiscloseText'>And this is his LinkedIn</div>
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
						{/* <img className='splashFifthImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashSixthSection.jpg'} alt='Design'></img> */}
						{design && <img className='splashFifthImagePhase1' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashFifthSectionPhase1.jpg'} alt='Design'></img>}
						{implementation && <img className='splashFifthImagePhase2' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashFifthSectionPhase2.jpg'} alt='Design'></img>}
					</div>
					<div className='splashFifthRight'>
						<div className='splashFifthHeaderContainer'>
							<div className='splashFifthHeaderName'>My Design</div>
							<div className='splashFifthSubHeaderContainer'>
								<div className='splashFifthSubHeader' id={name?'designHighlight':''} onClick={() => handleMyDesignClick(true, false, false)}>The Name</div>
								<div className='splashFifthSubHeader' id={design?'designHighlight':''} onClick={() => handleMyDesignClick(false, true, false)}>Design</div>
								<div className='splashFifthSubHeader' id={implementation?'designHighlight':''} onClick={() => handleMyDesignClick(false, false, true)}>Future Implementation</div>
							</div>
						</div>
						<div className='splashFifthBodyContainer'>
							{name && <div className='splashFifthBodyText'>The name GreenArrow, refers to the fictional superhero Green Arrow who appears in comic books published by DC Comics. Green Arrow is an archer who uses his skills to fight crime and sometimes shown dressed like the charactor Robin Hood, hence why the site is named GreenArrow.  The name GreenArrow also refers to the green up arrow when stocks is up.</div>}
							{name && <div><a className="splashFifthBodyButton" href='https://en.wikipedia.org/wiki/Green_Arrow'>Learn about DC Green Arrow</a></div>}
							{design && <div className='splashFifthBodyText'>GreenArrow is a Robinhood clone.  The core design and the UI/UX of the site borrows ideas from Robinhood with some added twists.  The Robinhood green stays unchanged to match the DC charactor Green Arrow, and the stock's green up arrow.</div>}
							{design && <div><a className="splashFifthBodyButton" href='https://robinhood.com'>Learn about Robinhood</a></div>}
							{implementation && <div className='splashFifthBodyText'>• Improve responsive design<br/>• Create named watchlist functionality<br/>• Functional profile page<br/>• Add responsive color theme when stock is up or down<br/>• Night mode<br/>• Implement transaction table to create a functional total balance graph on profile page</div>}
						</div>
						<div className='splashFifthDiscloseContainer'>
							<div className='splashFifthDiscloseIcon'><AiOutlineInfoCircle /></div>
							<div className='splashFifthDiscloseText'>A well thought-out design</div>
						</div>
					</div>
				</div>
			</div>

			<div className='splashSixthSection'>
				<div className='splashSixthSectionContainer'>
					<div className='splashSixthLeft'>
						<div className='splashSixthHeader'>GreenArrow is built with these technologies</div>
						<div className='splashSixthIconContainer'>
							<div className='splashSixthIconGroup1'>
								<SiJavascript />
								<SiReact />
								<SiRedux />
								<SiPython />
								<SiHtml5 />
							</div>
							<div className='splashSixthIconGroup2'>
								<SiCss3 />
								<SiFlask />
								<SiPostgresql />
								<i class="devicon-sqlalchemy-plain"></i>
								<SiDocker />
							</div>
						</div>
						<div className='splashThirdDiscloseContainer'>
							<div className='splashThirdDiscloseIcon'><AiOutlineInfoCircle /></div>
							<div className='splashThirdDiscloseText'>POW! POW! POW!</div>
						</div>
					</div>
					<div className='splashSixthRight'>
						<img className='splashSixthImage' src={'https://wyl-greenarrow.s3.us-west-1.amazonaws.com/SplashFifthSection.png'} alt='POW!'></img>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Splash;