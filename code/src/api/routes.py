import pandas as pd
from fastapi import APIRouter, UploadFile, File
from io import BytesIO
from src.service.anomaly_detection_service import AnomalyDetectionService
api_router = APIRouter()


@api_router.post("/anomaly/check")
async def analyse_anomaly_take_action(uploaded_real_time_data: UploadFile, uploaded_historical_data: UploadFile):
    real_time_data = await uploaded_real_time_data.read()
    real_time_data_df = pd.read_excel(BytesIO(real_time_data))
    historical_data = await uploaded_historical_data.read()
    historical_data_df = pd.read_excel(BytesIO(historical_data))
    anomaly_detection_service = AnomalyDetectionService()
    return(anomaly_detection_service.analyse_anomaly_take_action(real_time_data_df,historical_data_df))