import { TwitterTimelineEmbed } from 'react-twitter-embed';

function Home(){
    return (
        <div className="homeContainer" style={{minHeight:"100vh"}}>
            <div className="homeContainerIntro">
                <a><img src="IMG_20231102_182151.jpeg" alt="Charu-Sharma-Profile"/></a>
                <p>
                    I'm an Assistant Professor in <a href="https://mll.iiit.ac.in/"><strong>Machine Learning Lab</strong></a> at International Institute of Information Technology Hyderabad (IIIT-H).
                    <br/><br/> As a PhD student, I have worked in <a href="https://krama.cse.iith.ac.in/index.html"><strong>Krama Lab</strong></a> under the guidance of <a href="https://manukaul.github.io/"><strong>Dr. Manohar Kaul</strong></a> in the department of Computer Science & Engineering at Indian Institute of Technology (IIT) Hyderabad.
                    <br/> I completed my M.Tech in Artificial Intelligence from University of Hyderabad under the guidance of Prof. Arun K. Pujari. Prior to this, I worked as a Junior Software Engineer under Prof. Deepak B. Phatak at Indian Institute of Technology (IIT) Bombay.
                    
                    My <strong>research interests</strong> include Geometric Machine/ Deep Learning: 3D Point Clouds, 3D scene understanding, 3D+LLM, Graph/Temporal Graphs/Knowledge Graph Representation Learning.
                </p>
                <p>&nbsp;</p>
                <span style={{color:'blue'}}>I'm always looking for motivated PhD students. Write to me with your CV and cover letter.</span> <span style={{color:'red'}}>I'm not taking interns and part-time students.</span>

                <p>
                    <strong style={{fontSize:'20px'}}>Recent!</strong>
                </p>
                <ul>
                    <li>December 2024: Paper titled "Higher Order Structures For Graph Explanations" accepted at AAAI 2025.</li>
                    <li>October 2024: Two papers accepted at WACV 2025.</li>
                    <li>Jan, Feb 2024: Two papers accepted in the field of Robotics in IEEE Access and IEEE Sensors Letters, 2024.</li>
                    <li>August 15, 2023: Paper titled "Synergizing Contrastive Learning and Optimal Transport for 3D Point Cloud Domain Adaptation" accepted at WACV 2024.</li>
                    <li>Two workshop papers have been accepted at WWW'23 and ICAIL'23.</li>
                    <li>January 22, 2023: Paper with Nidhi, Jushaan, Raghava, Niharika and PK accepted in EACL 2023 Conference Findings. Title: "JobXMLC: EXtreme Multi-Label Classification of Job Skills with Graph Neural Networks".</li>
                    <li>January 7, 2023: Experience and motivational talk at CoDS-COMAD 2023.</li>
                    <li>November 1-5, 2022: Delivered talks on Graph Neural Networks, Point Clouds and Geometric DL at SVNIT Surat and IIIT Vadodara.</li>
                    <li>October 6, 2022: Long paper with Anmol Goel and Ponnurangam Kumaraguru accepted at EMNLP 2022 main conference. Title of the paper "An Unsupervised, Geometric and Syntax-aware Quantification of Polysemy".</li>
                    <li>SRG (Start-Up Grant) proposal is approved by SERB (Science and Engineering Research Board, a statutory body under DST) to fund my research group.</li>
                    <li>Featured in IIITH's Blog with my life journey (<a href="https://blogs.iiit.ac.in/charu-sharma/">link</a>)</li>
                    <li>Talk on "Knowledge Graph Representation Learning" at <a style={{color:'black', textDecoration:'underline'}} href="https://www.sahaj.ai/">Sahaj</a></li>
                    <li>Talk on "Introduction to ML for Graphs" during <a style={{color:'black', textDecoration:'underline'}} href="https://ihub-data.iiit.ac.in/programs/events/srishti-summer-research-internships/">I-Srishti Internship program</a> 2022 by I-Hub, IIITH.</li>
                    <li>Lecture on "Deep Learning for (Molecular) Graphs" in <a style={{color:'black', textDecoration:'underline'}} href="https://ihub-data.iiit.ac.in/ml4chem/">ML for Chemistry and Drug Design</a> Course.</li>
                    <li>Organizing 3D Vision Summer school from 22nd-28th May at IIIT Hyderabad.</li>
                    <li>Will be serving as Proceedings Chair at CoDS-COMAD 2023.  </li>
                    <li>June 14, 2021: Joined IIIT Hyderabad (ML Lab) as an Assistant Professor.</li>
                    <li>March 24, 2021: Successfully defended my PhD thesis!</li>
                    <li>Feb 10, 2021: Submitted my PhD Thesis "Exploiting Higher-order Structures in Assignment Problems and Geometric Representation Learning". Phew! Sigh of relief! :)</li>
                    <li>Sept 26, 2020: Paper titled "Self-Supervised Few-Shot Learning on Point Clouds" has been accepted at <span style={{fontWeight:'700'}}>NeurIPS 2020</span>.</li>
                    <li>August 30, 2020. Honored to receive <span style={{fontWeight:'700'}}>Excellence in Research Award</span> from IIT Hyderabad.</li>
                    <li>July 3, 2020: Paper titled "Simplicial Complex based Point Correspondence between Images warped onto Manifolds" accepted at <span style={{fontWeight:'700'}}>ECCV 2020</span>.</li>
                    <li>March 21, 2020: Paper titled "Learning Representations using Spectral-Biased Random Walks on Graphs" accepted at <span style={{fontWeight:'700'}}>IJCNN 2020</span>.</li>
                    <li>May 14, 2019: Paper titled "Learning Attention-based Embeddings for Relation Prediction in Knowledge Graphs (long paper)" accepted at <span style={{fontWeight:'700'}}>ACL 2019</span>.</li>
                    <li>May 12, 2018: Paper titled "Solving Partial Assignment Problems using Random Clique Complexes" accepted at <span style={{fontWeight:'700'}}>ICML 2018</span>.</li>
                </ul>
            </div>
            <div style={{flexGrow:'1'}}>
                <div style={{flexGrow:'1', marginTop:'10px'}} className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="shcharu" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/shcharu?trk=profile-badge"></a></div>
                <div style={{width:'100%', marginTop:'15px'}} className="twitterEmbedContainer">
                <a className="twitter-timeline" href="https://twitter.com/sh_charu?ref_src=twsrc%5Etfw">Tweets by sh_charu</a> <script async src="https://platform.twitter.com/widgets.js"></script>

                </div>
                {/* <div style={{flexGrow:'1'}}>
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="sh_charu"
                    options={{ height: '500px', tweetLimit: 3 }} // Adjust the tweet limit as needed
                />
                </div> */}
            </div>
            
              

        </div>
    );
}

export default Home;
