import React, {useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {auth, db} from "./shared/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';


const Signup = () => {


  const [id, setId] = useState("");
  const [user_name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_check, setPwdCheck] = useState("");

  

    const id_ref = React.useRef(null);
    const name_ref = React.useRef(null);
    const pw_ref = React.useRef(null);
    const pwcheck_ref = React.useRef(null);

    //pw_ref랑 pwcheck_ref의 값이 다르면 알림을 주는 함수를 만들었으나 onClick에 적용이 안됨
    // const samepw = () => {
    //   if(pw_ref !== pwcheck_ref) {
    //     window.alert("비밀번호가 일치하지 않습니다");
    //   }
    // }


    const signupFB = async() => {

        //값이 전부 멀쩡한지를 확인해줘야 함 => 벨리데이션
        //if(id_ref.current.value === "") {
        //     return false;
        // }

        const user = await createUserWithEmailAndPassword(
          auth,
          id_ref.current.value,
          pw_ref.current.value,
        );
        console.log(user)
    
    
        const user_doc = await addDoc(collection(db,"users"),{
          user_id: user.user.email, 
          name: name_ref.current?.value,
        });
    
        console.log(user_doc.id)
      }

      const navigate = useNavigate();


    return (
        <div className="App">
           <Head/>
           <Container>
            아이디(이메일) : <input onChange={(e) => {setId(e.target.value)}} ref={id_ref} /> <br/>
            닉네임 : <input onChange={(e) => {setName(e.target.value)}} ref={name_ref}/> <br/>
            비밀번호 : <input onChange={(e) => {setPwd(e.target.value)}} ref={pw_ref} /> <br/>
            비밀번호 확인 : <input onChange={(e) => {setPwdCheck(e.target.value)}} ref={pwcheck_ref}/> <br/>
            <button 
            disabled={
              id === "" || user_name === "" || pwd === "" || pwd_check === ""
                ? true
                : false
            }
            onClick={() => {signupFB(); navigate("/");}}>회원가입</button>
           </Container> 
        </div>
        
    );
}

const Container = styled.div`
  max-width: 500px;
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

export default Signup;