import * as React from 'react';
import FileUpload from 'react-material-file-upload';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';



const DataUpload = () => {
  const [realTimeDataFile, setRealTimeDataFile] = useState([]);
  const [historicalDataFile, setHistoricalDataFile] = useState([]);
  const [dataGridColumns, setDataGridColumns] = useState([]);
  const [dataGridRows, setDataGridRows] = useState([]);
  const selectRealTimeDataFile = (event) => {
    setRealTimeDataFile(event.target.files[0]);
  }
  const selectHistoricalDataFile = (event) => {
    setHistoricalDataFile(event.target.files[0]);
  }
  const upload = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("uploaded_real_time_data",realTimeDataFile)
    formData.append("uploaded_historical_data",historicalDataFile)
    axios
        .post("http://127.0.0.1:8000/api/v1/anomaly/check", formData, {
            headers: {
            'content-type': 'multipart/form-data'
            }
        })
        .then((response) => {
            let columnNames = Object.keys(response.data[0]);
            let dataGridColumns = columnNames.map(columnName => {
                return {
                    field: columnName.toLowerCase().replace(" ", "_"),
                    headerName: columnName,
                    width: columnName == 'Comments' ? 300 : 150
                }
            });
            let dataGridRowId = 1;
            let dataGridRows = response.data.map(realDataObj => {
                let realDataObjKeys = Object.keys(realDataObj);
                let dataGridRowObj = {id: dataGridRowId++};
                for(let realDataObjKey of realDataObjKeys){
                    dataGridRowObj[realDataObjKey.toLowerCase().replace(" ","_")]=realDataObj[realDataObjKey];
                }
                return dataGridRowObj;
            });
            setDataGridColumns(dataGridColumns);
            setDataGridRows(dataGridRows);
        })
        .catch((err) => {
            console.log("Error occurred at the time of API call!!!");
        });    
  }
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid size={2}></Grid>
                <Grid size={4}>
                    <div>Select an xlsx file for real time data</div>
                </Grid>
                <Grid size={4}>
                    <div>Select an xlsx file for historical data</div>
                </Grid> 
                <Grid size={2}></Grid>
                <Grid size={2}></Grid>
                <Grid size={4}>
                    <input type="file" onChange={selectRealTimeDataFile} />
                </Grid>
                <Grid size={4}>
                    <input type="file" onChange={selectHistoricalDataFile} />
                </Grid>  
                <Grid size={2}></Grid>              
                <Grid size={12}>
                    <Button onClick={upload} variant="contained">Upload</Button> 
                </Grid>
            </Grid>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            <Grid size={2}></Grid>  
            <Grid size={8}>
                <DataGrid rows={dataGridRows} columns={dataGridColumns} />
            </Grid>
            <Grid size={2}></Grid>  
        </Box>
    </>  
  );
}
export default DataUpload