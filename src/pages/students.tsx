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
                            <li><span style={{fontWeight:'700'}}>MS by Research:</span> Vivek Vardhan, Jayadratha Gayen, Himanshu Pal, Ven Janaksinh Vanabhai</li>
                            <li><span style={{fontWeight:'700'}}>Dual-Degree:</span> Kunal Bhosikar, Sriteja Reddy</li>
                            <li><span style={{fontWeight:'700'}}>Honors:</span> Bachina Venkat Sai Pranav</li>
                        </ul>
                        <p><span style={{fontWeight:'700', fontSize:'18px'}}>Alumni</span></p>
                        <ul>
                            <li><span style={{fontWeight:'700'}}>MS by Research:</span> Prayushi Mathur (co-advisor), Siddharth Katageri</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Students;
