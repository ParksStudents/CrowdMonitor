import streamlit as st

USER_DATA = {
    "parks": "students00",
    "1": "1"
}

def login(username, password):
    if username in USER_DATA and USER_DATA[username] == password:
        return True
    return False

def login_page():
    st.title('Admin Login')
    
    username = st.text_input("Username")
    password = st.text_input("Password", type="password")
    login_button = st.button("Login")

    if login_button:
        if login(username, password):
            st.session_state['logged_in'] = True
            st.session_state['username'] = username
            st.experimental_rerun()
        else:
            st.error("아이디 혹은 비밀번호가 틀립니다.")

def main_page():
    
    if st.button("Logout"):
        st.session_state['page'] = 'login'
        st.experimental_rerun()
        login(username, password)
    st.title('실시간 혼잡도')

    video_slot = st.empty()
    video_link_1 = "https://www.youtube.com/watch?v=A_dvxxAqyqM&t=239s"
    video_link_2 = "https://www.youtube.com/watch?v=your_video_id_2"
    video_link_3 = "https://www.youtube.com/watch?v=your_video_id_3"
    video_link_4 = "https://www.youtube.com/watch?v=your_video_id_4"
    
            
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        if st.button("CCTV1"):
            video_slot.video(video_link_1)
    with col2:
        if st.button("CCTV2"):
            video_slot.video(video_link_2)
    with col3:
        if st.button("CCTV3"):
            video_slot.video(video_link_3)
    with col4:
        if st.button("CCTV4"):
            video_slot.video(video_link_4)
       

       

def main():
    if 'logged_in' not in st.session_state:
        st.session_state['logged_in'] = False
    if 'page' not in st.session_state:
        st.session_state['page'] = 'main'
    
    if st.session_state['page'] == 'login':
        login_page()
    else:
        if st.session_state['logged_in']:
            main_page()
        else:
            st.warning("로그인 해주세요.")
            login_page()

if __name__ == '__main__':
    main()

