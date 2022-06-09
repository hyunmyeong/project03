
import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {auth, db} from "./shared/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";
import {getDocs, where, query, collection} from "firebase/firestore";



const Login = () => {

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");


    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const loginFB = async() => {
        console.log(id_ref.current.value, pw_ref.current.value);

        const user = await signInWithEmailAndPassword(
            auth,
            id_ref.current.value,
            pw_ref.current.value
        );
        console.log(user)

        const user_docs = await getDocs(query(
            collection(db,"users"), where("user_id", "==", user.user.email))
            );

            user_docs.forEach(u => {
                console.log(u.data());
            });
    }

    const navigate = useNavigate();

    return (
        <div className="App">
            <Head>
                <Button>
                <button onClick={() => {navigate("/signup")}}>회원가입</button>
                </Button>
            </Head>    
            <Container>
                아이디(이메일) : <input  onChange={(e) => {setId(e.target.value)}} ref={id_ref}/> <br/>
                비밀번호 : <input onChange={(e) => {setPwd(e.target.value)}} ref={pw_ref}/> <br/>
                <button disabled={id === "" || pwd === "" ? true : false} onClick={loginFB}>로그인</button>
                
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

export default Login;