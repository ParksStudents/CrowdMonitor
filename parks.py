import streamlit as st 

USER_DATA = {
    "parks": "students00",
    "minji": "0412"
}

def login(id, password):
    if id in USER_DATA and USER_DATA[id] == password:
        return True
    return False

def main():
    st.title('Admin Login')

    id = st.text_input("Username")
    password = st.text_input("Password", type="password")
    login_button = st.button("Login")

    if login_button:
        if login(id, password):
            st.success(f"Welcome, {id}!")
        else:
            st.error("Invalid username or password")

if __name__ == '__main__':
    main()
