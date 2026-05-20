function Students(){
    return (
        <>
        <div className="pageHeader">
            <div className="headerContent">
                <div className="sectionContainer">
                    <h2 className="pageTitle">Students</h2>
                </div>
            </div>
        </div>
        <div className="pageContents">
            <div className="section color-1">
                <div className="sectionContainer studentContent">
                    <div>
                        <p><span style={{fontWeight:'700', fontSize:'18px'}}>Current Students</span></p>
                        <ul>
                            <li><span style={{fontWeight:'700'}}>PhD:</span> Vivek Vardhan, Shefali Bajaj</li>
                            <li><span style={{fontWeight:'700'}}>MS by Research:</span> Sanjay SJ, Akash J, Sreehari Rajan</li>
                            <li><span style={{fontWeight:'700'}}>Dual-Degree:</span> Vinit Mehta, Monish Singhal, Prajas Wadekar, Devshree Vyas, Samarth Rao</li>
                            <li><span style={{fontWeight:'700'}}>Honors:</span> Aditya Gaur, Vikesh Kansal</li>
                        </ul>
                        <p><span style={{fontWeight:'700', fontSize:'18px'}}>Alumni</span></p>
                        <ul>
                            <li><span style={{fontWeight:'700'}}>MS by Research:</span> Prayushi Mathur (co-advised), Nikhil Chandak (co-advised), Siddharth Katageri, Vivek Vardhan, Jayadratha Gayen, Himanshu Pal, Ven Janaksinh Vanabhai, Kunal Bhosikar</li>
                            <li><span style={{fontWeight:'700'}}>B.Tech Honors:</span> Bachina Venkat Sai Pranav, Kushang Agarwal </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Students;
