import React, { useState } from 'react';
import "./RadDetails.css";

function RadDetails() {
  // Dummy data
  const radName = "Dr. HolyMOLY";
  const specialization = "Radiologist 1";
  const prescription = [
    "PROCEDURE:",
    "MRI of lumbosacral spine without/with IV contrast.",
    "",
    "INDICATION:",
    "Radiculopathy post L2-L3 fusion, question incomplete fusion. Persistent symptoms. COMPARISON: None.",
    "",
    "TECHNIQUE:",
    "Multiplanar and multi-sequence imaging of the lumbosacral spine without/with intravenous contrast using a 0.3T MRI scanner.",
    "",
    "FINDINGS:",
    "Postoperative findings of posterior intrapedicular spinal fusion at L2-L3 noted. The L2-L3 disk is preserved. Enhancing peridural fibrosis noted at L2-L3 level mildly deforming the thecal sac with dominant extrinsic impression on the right lateral thecal sac. Non enhancing cystic foci noted along the posterior elements representing small pseudomeningoceles. Postoperative fusion and laminectomy noted at L4-L5 level with osseous fusion anteriorly. Osseous hypertrophy of the posterior elements noted at L4 and L5. Lumbar lordosis is decreased. Multilevel endplate, disk and facet degenerative changes noted. Conus medullaris terminates at approximately mid L1 vertebral body level.",
    "",
    "L1-L2 shows moderate broad-based disc bulging contributing to mild to moderate left greater than right neuroforamina narrowing. Spinal canal is grossly patent. Approximately 2 mm L1 on L2 retrolisthesis noted.",
    "",
    "L2-L3 shows moderate nonenhancing bi foraminal broad-based disk bulging contributing to mild-tomoderate right greater than left neural foramina narrowing. Moderate acquired spinal canal stenosis noted due to enhancing peridural fibrosis with asymmetric more focal extrinsic impression on the right lateral ventral thecal sac. Negligible spondylolisthesis of L2 on L3 noted.",
    "",
    "L3-L4 level shows mild disk desiccation and height loss. Extraforaminal focal annular tears noted on both sides. Spinal canal and foramina are patent.",
    "",
    "L4-L5 level shows postoperative findings with partial fusion anteriorly with linear hyper intense signal in the remaining intervertebral disk space. Spinal canal and foramina are patent. No gross thecal sac deformity noted. Bilateral laminectomies noted.",
    "",
    "L5-S1 level shows subtle left central broad-based disk protrusion. Spinal canal and foramina are patent. No gross thecal sac deformity. Bilateral laminectomies noted. Ferromagnetic susceptibility artifact noted along the mid posterior back spanning from L2 through S2. No suspicious prevertebral or posterior paraspinal soft tissue signal abnormality noted. Mild subchondral sclerosis of the included sacroiliac joints noted. Incidental note of overdistended bladder.",
    "",
    "IMPRESSION:",
    "1. Postoperative findings of posterior spinal intrapedicular fusion at L2-L3 level. L2-L3 shows moderate nonenhancing bi foraminal broad-based disk bulging contributing to mild-to-moderate right greater than left neural foramina narrowing. Moderate acquired spinal canal stenosis noted due to enhancing peridural fibrosis with asymmetric more focal extrinsic impression on the right lateral ventral thecal sac. Negligible spondylolisthesis of L2 on L3 noted. Non enhancing cystic foci noted along the posterior elements representing small pseudomeningoceles.",
    "",
    "2. Postoperative fusion and laminectomy noted at L4-L5 levels with osseous fusion anteriorly. Osseous hypertrophy of the posterior elements noted at L4 and L5.",
    "",
    "3. L5-S1 level shows subtle left central broad-based disk protrusion. Spinal canal and foramina are patent. No gross thecal sac deformity.",
    "",
    
  ];

  const [showFullPrescription, setShowFullPrescription] = useState(false);

  const togglePrescription = () => {
    setShowFullPrescription(!showFullPrescription);
  };

  const handleClick = () => {
    alert("Button clicked!");
      };

  return (
    <div className="mri-info-container">
      <div className="header">
        <span className="rad-name">{radName}</span>
        <br />
        <span className="specialization">{specialization}</span>
        <br />
        <span >
            <button className='lab-button' onClick={handleClick}>View Annotated Images</button>
        </span>
      </div>

      
      <div className="prescription">
        {prescription.slice(0, 5).map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!showFullPrescription && (
          <p onClick={togglePrescription}>Read More</p>
        )}
        {showFullPrescription && prescription.slice(5).map((line, index) => (
          <p key={index + 5}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default RadDetails;
