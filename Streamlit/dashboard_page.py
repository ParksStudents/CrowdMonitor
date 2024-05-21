import streamlit as st
import pandas as pd
import numpy as np
import datetime
import matplotlib.pyplot as plt
from pyparsing import empty

# 더미 데이터 생성 함수 (CCTV 별로 평균과 분산 달리 적용)
def generate_dummy_data_cctv(num_records=10080, cctv="CCTV 1"):  
    now = datetime.datetime.now()
    timestamps = [now - datetime.timedelta(minutes=i) for i in range(num_records)]
    
    if cctv == "CCTV 1":
        mean = 150
        std_dev = 80
    elif cctv == "CCTV 2":
        mean = 130
        std_dev = 30
    elif cctv == "CCTV 3":
        mean = 70
        std_dev = 15
    else:  # CCTV 4
        mean = 95
        std_dev = 35
    
    counts = np.random.normal(loc=mean, scale=std_dev, size=num_records).astype(int) # 소수점 제거
    
    # 4~6시간마다 노이즈 추가
    noise_interval = np.random.randint(240, 360)  # 4~6시간 (240~360분)
    for i in range(0, num_records, noise_interval):
        noise = np.random.normal(loc=200, scale=100)  # 노이즈 값 생성
        if i < num_records:
            counts[i] += noise
    
    # 음수값은 0으로 조정
    counts = np.clip(counts, 10, 400) # 10미만은 전부 10/ 400초과는 전부 400
    
    data = {'timestamp': timestamps, 'count': counts}
    df = pd.DataFrame(data)
    return df

# 데이터 로드
df_cctv1 = generate_dummy_data_cctv(cctv="CCTV 1")
df_cctv2 = generate_dummy_data_cctv(cctv="CCTV 2")
df_cctv3 = generate_dummy_data_cctv(cctv="CCTV 3")
df_cctv4 = generate_dummy_data_cctv(cctv="CCTV 4")

# Streamlit 앱 설정
st.title("Crowd Counting Dashboard")

# 오늘(기준) 이후의 날짜를 비활성화
today = datetime.date.today()

# 사이드바에 캘린더 추가
st.sidebar.header("Select Date Range")
selected_date = st.sidebar.date_input("Select a date", today, min_value=None, max_value=today)

# CCTV 선택 사이드바 추가
st.sidebar.header("Select CCTV")
selected_cctv = st.sidebar.selectbox("Select CCTV", ["CCTV 1", "CCTV 2", "CCTV 3", "CCTV 4"])

# 선택된 CCTV에 따른 데이터 필터링
if selected_cctv == "CCTV 1":
    df_selected_cctv = df_cctv1
if selected_cctv == "CCTV 2":
    df_selected_cctv = df_cctv2
if selected_cctv == "CCTV 3":
    df_selected_cctv = df_cctv3
if selected_cctv == "CCTV 4":
    df_selected_cctv = df_cctv4

# 날짜 및 시간 분리
df_selected_cctv['date'] = df_selected_cctv['timestamp'].dt.date
df_selected_cctv['hour'] = df_selected_cctv['timestamp'].dt.hour
df_selected_cctv['minute'] = df_selected_cctv['timestamp'].dt.minute

# 지난 일주일간의 일별 평균 계산
one_week_ago = datetime.datetime.now() - datetime.timedelta(days=7)
df_last_week = df_selected_cctv[df_selected_cctv['timestamp'] >= one_week_ago]
daily_average = df_last_week.groupby(df_last_week['date']).mean().reset_index()

# 일별 평균 군중 통계 라인 차트
st.write("### Crowd Count Over the Last 7 Days")
st.line_chart(daily_average.set_index('date')['count'])

# 선택된 날짜의 시간별 데이터 필터링
df_selected_date = df_selected_cctv[df_selected_cctv['date'] == selected_date]

# 시간별 평균 라인 차트
st.write(f"### Hourly Crowd Count on {selected_date} for {selected_cctv}")
st.line_chart(df_selected_date.set_index('timestamp')['count'])



# 데이터프레임 표시
st.write("### Raw Data")
st.write(df_selected_cctv)



# 데이터프레임을 최신순으로 정렬하여 표시
df_sorted = df_selected_cctv.sort_values(by='timestamp', ascending=False)
st.write("### Latest Counts")
st.write(df_sorted.head(10))
