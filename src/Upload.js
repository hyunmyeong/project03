import { async } from "@firebase/util";
import React from "react";
import {auth, db, storage} from "./shared/firebase";
import styled from "styled-components";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { collection, addDoc, setDoc, doc} from 'firebase/firestore';
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Home from './Home';




const Upload = () => {

   const file_link_ref = React.useRef(null);
   const text_ref = React.useRef(null);



    const uploadFB = async(e) => {
        console.log(e.target.files)
        const uploaded_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
            );  
            console.log(uploaded_file) ;
            
        const file_url = await getDownloadURL(uploaded_file.ref);
            console.log(file_url)
 

        console.log(file_link_ref); 
        
        const upload_text = await setDoc(collection(db, "users"),{
            // text: text_ref.current.value
        }       
        );
            console.log(upload_text.current.value)

        const user_doc = await addDoc(collection(db,"users"),{
            image_url : file_link_ref.current.url,
            // file_link_ref.current = {url:file_url},
            text : text_ref.current.value
          });
          console.log(user_doc)
      
    }

    const navigate = useNavigate();

    return(
        <div>
            <Head>
            <Button>
            {/* <button onClick={navigate("/")}>홈</button> */}
            <button onClick={() => {navigate("/")}}>홈으로</button>
            <button onClick={()=>{signOut(auth); navigate("/");}}>로그아웃</button>
            </Button>    
            </Head>
            <Container>
                <div>
                    <h1>파일 업로드 페이지</h1> 
                    이미지 업로드 : <input type="file"  onChange={uploadFB}/><br/>
                    코멘트 : <input type="text"  ref={text_ref}/>
                    <button onChange={uploadFB}>등록</button> <br/>
                    
                    
                </div>
            </Container>
        </div>
    );
}


const Container = styled.div`
  max-width: 800px;
  min-height: 80vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`; 

const Head = styled.div`
    background-color:#8f94fb;
    margin: auto;
    width: auto;
    min-height: 10vh;
`

const Button = styled.div`
    padding: 16px;
    margin: 20px auto;
    float: right;

`

export default Upload;