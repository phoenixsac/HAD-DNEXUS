import React from "react";
import ConditionalNavbar from "../components/Navbar/ConditionalNavbar";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'icofont/icofont.min.css';




import "./Style/LandingPage.css";

function LandingPage() {
  //const navigate = useNavigate();

  

  return (
    <div>
      <ConditionalNavbar />


      {/* <!-- Slider Area --> */}
		<section className="slider">
			<div className="hero-slider">
				{/* <!-- Start Single Slider --> */}
				<div className="single-slider" style={{backgroundImage: `url(${require('../components/assets/stock images/slider3.jpg')})`}}>
					<div className="container">
						<div className="row">
							<div className="col-lg-7">
								<div className="text">
									<h1>Bridging <span>Expertise</span> Empowering <span>Healthcare!</span></h1>
									<p>Empowering Precision Healthcare Through Seamless Collaboration and Data-Driven Insights! </p>
								</div>
							</div>
						</div>
					</div>
				</div>			
				{/* <!-- End Single Slider --> */}
			</div>
		</section>
		{/* <!--/ End Slider Area --> */}


    {/* <!-- Start Feautes --> */}
		<section className="Feautes section ">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="section-title">
							<h2>We Are Always Ready to Help You & Your Family</h2>
							<img src={`url(${require('../components/assets/stock images/section-img.png')})`} alt="#" />
							<p>Lorem ipsum d  olor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-12">
						{/* <!-- Start Single features --> */}
						<div className="single-features">
							<div className="signle-icon">
								<i className="icofont icofont-ambulance-cross"></i>
							</div>
							<h3>Emergency Help</h3>
							<p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
						</div>
						{/* <!-- End Single features --> */}
					</div>
					<div className="col-lg-4 col-12">
						{/* <!-- Start Single features --> */}
						<div className="single-features">
							<div className="signle-icon">
								<i className="icofont icofont-medical-sign-alt"></i>
							</div>
							<h3>Enriched Pharmecy</h3>
							<p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
						</div>
						{/* <!-- End Single features --> */}
					</div>
					<div className="col-lg-4 col-12">
						{/* <!-- Start Single features --> */}
						<div className="single-features last">
							<div className="signle-icon">
								<i className="icofont icofont-stethoscope"></i>
							</div>
							<h3>Medical Treatment</h3>
							<p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
						</div>
						{/* <!-- End Single features --> */}
					</div>
				</div>
			</div>
		</section>
		{/* <!--/ End Feautes --> */}



    </div>
  );
}

export default LandingPage;
