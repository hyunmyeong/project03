import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "./shared/firebase";
import { getDocs, where, query, collection } from "firebase/firestore"; 



const Home = () => {

    const navigate = useNavigate();


    return (<div className="App">
        <Head>
            <Button>
            <button onClick={()=>{signOut(auth)}}>로그아웃</button>
            <button onClick={() => {navigate("/upload")}}>이미지 업로드</button>
            </Button>
                
        </Head>
        <Container>
            <h1>환영합니다 :p</h1>
            <h2>게시물이 나올 페이지</h2>
            
            
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

export default Home;