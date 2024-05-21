import streamlit as st
import pandas as pd
import numpy as np
import datetime
import matplotlib.pyplot as plt

# 더미 데이터 생성 함수
# def generate_dummy(num_records=100):
#     now = datetime.datetime.now()
#     timestamps = [now - datetime.timedelta(minutes=i) for i in range(num_records)]
#     counts = np.random.randint(0, 100, size=num_records)
#     data = {'timestamp': timestamps, 'count': counts}
#     df = pd.DataFrame(data)
#     return df

# 더미 데이터 생성 함수
def generate_dummy_data(num_records=10080):  # 7일간의 분 단위 데이터 (60*24*7 = 10080)
    now = datetime.datetime.now()
    timestamps = [now - datetime.timedelta(minutes=i) for i in range(num_records)]
    counts = np.random.normal(loc=120, scale=50, size=num_records)
    
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
df = generate_dummy_data()

# 날짜 및 시간 분리
df['date'] = df['timestamp'].dt.date
df['hour'] = df['timestamp'].dt.hour
df['minute'] = df['timestamp'].dt.minute

# Streamlit 앱 설정
st.title("Crowd Counting Dashboard")

# 사이드바에 캘린더 추가
st.sidebar.header("Select Date Range")
selected_date = st.sidebar.date_input("Select a date", df['date'].max())

# 지난 일주일간의 일별 평균 계산
one_week_ago = datetime.datetime.now() - datetime.timedelta(days=7)
df_last_week = df[df['timestamp'] >= one_week_ago]
daily_average = df_last_week.groupby(df_last_week['date']).mean().reset_index()

# Chart.js를 사용하여 일별 평균 라인 차트 생성
st.write("### Crowd Count Over Time (Last 7 Days)")
st.line_chart(daily_average.set_index('date')['count'])

# 선택된 날짜의 시간별 데이터 필터링
df_selected_date = df[df['date'] == selected_date]

# 시간별 변화를 위한 차트 생성
st.write(f"### Hourly Crowd Count on {selected_date}")
st.line_chart(df_selected_date.set_index('timestamp')['count'])

# 데이터프레임 표시
st.write("### Raw Data")
st.write(df)

# 데이터프레임을 최신순으로 정렬하여 표시
df_sorted = df.sort_values(by='timestamp', ascending=False)
st.write("### Latest Counts")
st.write(df_sorted.head(10))
