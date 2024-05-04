import React, { useState } from 'react';
import './index.css';

// export default function
export function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    

    const handleEmail = (e)=> {
        setEmail(e.target.value)
        const regex = 
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        //정규 표현식, 유효 이메일 확인
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    }
    const handlePw = (e) => {
        setPw(e.target.value)
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    }

    return (
        <div className='page'> 
            <div className='titleWrap'>
                이메일과 비밀번호를 <br/>입력해주세요
            </div>

            <div className='contentWrap'>
                <div className='inputTitle'>이메일 주소</div>
                <div className='inputWrap'>
                    <input 
                        type='text'
                        className='input'
                        placeholder='admin@sm.ac.kr'
                        value={email} 
                        onChange={handleEmail}/>
                </div>
                <div className='errorMessageWrap'>
                {!emailValid && email.length>0 && (
                        <div>올바른 이메일을 입력해주세요.</div>
                )}
                </div>

                <div style={{marginTop:"28px"}} className='inputTitle'>비밀번호</div>
                <div className='inputWrap'>
                    <input 
                        //type='password'
                        className='input'
                        placeholder='영문 숫자 포함 4자 이상 입력해주세요.'
                        value = {pw} 
                        onChange={handlePw}/>
                </div>
                <div className='errorMessageWrap'>
                {!pwValid && pw.length>0 && (
                        <div>영문, 숫자 포함 4자 이상 입력해주세요. </div>
                )}                  
                </div>
            </div>

            <div>
                <button disabled={true} className='bottomButton'>로그인</button>
            </div>
        </div>
    )
}
// classname을 통해 참조가 이뤄지므로 꼭 지정해주어야 함.
// 클래스나 함수를 내보낼 때, 끝에 (;)을 붙이지 않는다.