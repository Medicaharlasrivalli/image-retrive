import React, { useEffect, useState } from 'react'
import {Buffer} from 'buffer'
import axios from 'axios'
function FileUpload() {
    // let base64String;
    const [file, setFile] = useState();
    const [data,setData]=useState([]);
    // const [image,setImage]=useState();
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }
    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', file)
        axios.post('http://localhost:8081/upload?id=1', formData).then(result => {
            if (result.data.Status === "Success"){
                console.log("Succeded")
                // refresh();
            }
            else
                console.log("Failed")
        }).catch(err => console.log(err))
    }
    // useEffect(() => {
    //     axios.get('http://localhost:8081').then(result => { 
    //         console.log(result.data);
    //         // const URL=`data:image/png;base64,${Buffer.from(result.data).toString('base64')}`
    //         setData(result.data)
    //         console.log(data)
    //     })
    //     .catch(err => console.log(err));
    // }, [])
    const refresh=()=>{
        axios.get('http://localhost:8081?id=2').then(result => { 
            console.log(result.data);
            // const URL=`data:image/png;base64,${Buffer.from(result.data).toString('base64')}`
            setData(result.data)
            console.log(data)
        })
        .catch(err => console.log(err));
    }
    return (
        <div className='container'>
            <input type="file" onChange={handleFile} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={refresh}>Refresh</button>
            <br/>
            <br/>
            {data.length!==0 && <img src={`http://localhost:8081/images/`+data} alt="" style={{width:"500px",height:"500px"}}/>}
        </div>
    )
}

export default FileUpload
