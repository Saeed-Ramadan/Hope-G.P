import { Box, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import phone from "../../assets/creatPostImage/Phone.png"
import Globe from "../../assets/creatPostImage/Globe.png"
import styled from '@emotion/styled'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers'
import Cookie from "cookie-universal";
import axios from 'axios'
import { getAllCities, getAllTown } from '../../apiRequests/apiRequest'
const label = styled.select(({
    background:"red"
}))
const ComunicationDetails = ({getData,resErr}) => {
  const cookies = Cookie()
  const token=cookies.get("Cookie")
 
  

  const [ValueDate,setValueDate]=useState("")
  const [ValueDay,setValueDay]=useState("")
  const [PhoneNumber,setPhoneNumber]=useState("")
const [city,setcity]=useState("")
const [town,settown]=useState("")
const [IsSearcher,setIsSearcher]=useState(true)
const [getCity,setGetCity]=useState([])
const [GetTown,setGetTown]=useState([])
const [id,setid]=useState(1)
const handlgetId=(id)=>{
  setid(id)
  axios.get(`${getAllTown}${id}`,{
    headers:{
      
      "Authorization":"Bearer " +token
    }
  }).then((response)=>{
    setGetTown(response.data.data)
    console.log(response)
  })
  }
useEffect(()=>{
  
axios.get(`${getAllCities}`,{
  headers:{
    
    "Authorization":"Bearer " +token
  }
}).then((response)=>{
  setGetCity(response.data.data)


})
console.log("object",id)

},[])


// console.log(`${getAllTown}${id}`)
// console.log(GetTown)


//  const handlchange=(e)=>{
//   // setinpValue(inputdate.value)

//   setValueDate(`${e.$H}:${e.$m}`)
  
//  }
//  const handlchangeDay=(e)=>{

//   setValueDay(`${e.$M+1} ${e.$D} ${e.$y}`)
  
//  }

// const mixedValue = `${ValueDay}`
const mixedValue = ` ${ValueDay} ${ValueDate}`



const handlChangeForm = (e) => {
  console.log(e)
  setValueDate(`${e.$H}:${e.$m}`)
  const month=e.$M+1<10?`0${e.$M+1}`:e.$M+1
  console.log("montg",month)
  setValueDay(`${e.$y}/${month}/${e.$D}`)
  // setValueDay(`${month}/${e.$D}/${e.$y}`)
  
};

const data={
  userId:"",
  PhoneNumber,
  city,
  IsSearcher,
  mixedValue
}
getData(PhoneNumber,city,IsSearcher,mixedValue,town)
// console.log(data)
 const handlesubmit=(e)=>{
  e.preventDefault();
 }

  return (
 <Box component="form" onSubmit={handlesubmit} 
 sx={{padding:"1rem",display:"flex",
 justifyContent:"space-between",
 flexDirection:{xs:"column",md:"row"},gap:{xs:"20px",md:"0"}}}>
       <Box sx={{display:"flex",flexDirection:"column",gap:{xs:"60px",sm:"40px",xl:"60px"},width:{xs:"100%",md:"70%"}}}>
        <Box sx={{width:{xs:"100%",md:"90%"},display:"flex",flexDirection:"column",gap:"20px"}}>
            <Typography sx={{fontSize:{xs:"20px",sm:"25px",xl:'30px'},fontWeight:"400"}}>أدخل رقم هاتفك</Typography>
          
            <TextField sx={{
                width:"100%",
                
                "& .MuiOutlinedInput-root": {
                    "& > fieldset": {borderRadius:{xs:"17px",sm:"22px",xl:"30px"},height:{xs:"55px",sm:"65px",xl:"85px"}},
                  },
                
            }}
            inputProps={{
                sx: {borderRadius:"10px",paddingTop:{xs:"25px",sm:"30px",xl:"35px"},fontSize:{xs:"20px",sm:'20px',xl:"30px"},fontWeight:"400"} 
              }}
              name="PhoneNumber"
              value={PhoneNumber}
              onChange={(e)=>setPhoneNumber(e.target.value)}
             placeholder='أدخل رقم هاتفك' type='number' InputProps={{
            startAdornment: (
            <InputAdornment position="start" sx={{marginTop:"15px"}}>
               <img src={phone}/>
            </InputAdornment>
    )
  }}/>
          {
            resErr!==""&&<Typography sx={{color:"red",fontSize:"20px",fontWeight:"400",marginTop:"1rem"}}>{resErr}</Typography>
          }
        </Box>
        <Box sx={{width:{xs:"100%",md:"90%"},display:"flex",flexDirection:"column",gap:"20px"}}>
            <Typography sx={{fontSize:{xs:"20px",sm:"25px",xl:'30px'},fontWeight:"400"}}>أدخل مكان وقوع الحادثة  </Typography>
            
            
            <FormControl sx={{borderRadius:"100px", "& .MuiOutlinedInput-root": {
                    "& > fieldset": {borderRadius:{xs:"17px",sm:"22px",xl:"30px"},height:{xs:"55px",sm:"65px",xl:"85px"}},
                    
                  },}}>
                    
                    <InputLabel
                    required
                    sx={{display:"flex",
                    right:"30px",gap:"30px",
                    fontSize:{xs:"20px",sm:"20px",xl:'30px'},fontWeight:"400",
                    color:"#C1C1C1",
                    transformOrigin: "top right",
                    marginTop:"-5px",
                    // transform:" translate(14px, 16px) scale(1)",
                    '&:focus': {
                        transform:" translate(14px, -9px) scale(0)",
                        display:"none"
                    }
                   
                    }}
                  
                    > <img src={Globe}/>إختر محافظتك
                    </InputLabel>
                <Select
                  name='city'
                  value={city}
                  onChange={(e)=>{setcity(e.target.value)
                        console.log(e.target.value)
                      
                      }
                  }
                 
                IconComponent={()=>null}
              sx={{
                fontSize:'30px',fontWeight:"400",
              
              
              }}
             
              MenuProps={{
                PaperProps: {
                   
                  style: {
                    maxHeight: 200, // Set the max height to control the number of visible items
                    overflow:"auto",
                    
                  },
                },
              }}
                >
                     
              {
                getCity.map((item)=>{
                 return <MenuItem onClick={()=>handlgetId(item.id)} key={item.id} value={item.name}>{item.name}</MenuItem>
                })
              }
               
                </Select>
            </FormControl>
      
        </Box>
        <Box sx={{width:{xs:"100%",md:"90%"},display:"flex",flexDirection:"column",gap:"20px"}}>
            <Typography sx={{fontSize:{xs:"20px",sm:"25px",xl:'30px'},fontWeight:"400"}}>أدخل المركز </Typography>
            
            
            <FormControl sx={{borderRadius:"100px", "& .MuiOutlinedInput-root": {
                    "& > fieldset":{borderRadius:{xs:"17px",sm:"22px",xl:"30px"},height:{xs:"55px",sm:"65px",xl:"85px"}},
                    
                  },}}>
                    
                    <InputLabel
                    required
                    sx={{display:"flex",
                    right:"30px",gap:"30px",
                    fontSize:{xs:"20px",sm:"20px",xl:'30px'},fontWeight:"400",
                    color:"#C1C1C1",
                    transformOrigin: "top right",
                    marginTop:"-5px",
                    // transform:" translate(14px, 16px) scale(1)",
                    '&:focus': {
                        transform:" translate(14px, -9px) scale(0)",
                        display:"none"
                    }
                   
                    }}
                  
                    > <img src={Globe}/>إختر المركز
                    </InputLabel>
                <Select
                  name='town'
                  value={town}
                  onChange={(e)=>settown(e.target.value)}
                IconComponent={()=>null}
              sx={{
                fontSize:'30px',fontWeight:"400",
              
              
              }}
             
              MenuProps={{
                PaperProps: {
                   
                  style: {
                    maxHeight: 200, // Set the max height to control the number of visible items
                    overflow:"auto",
                    
                  },
                },
              }}
                >
                     
              
                     {
                GetTown.map((item)=>{
                 return <MenuItem value={item.name}>{item.name}</MenuItem>
               
                })
              }
                </Select>
            </FormControl>
      
        </Box>
        <Box>
        <Typography sx={{fontSize:{xs:"20px",sm:"25px",xl:'30px'},fontWeight:"400"}}>نوع البلاغ</Typography>
        <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
          
            name="radio-buttons-group"
           
            sx={{
                display:"flex",
                flexDirection:"row",
                gap:{xs:"0px",md:"50px"},
              
            }}
        >
            <FormControlLabel sx={{color:"#2E74FD",
         "& .MuiFormControlLabel-label": {
            fontWeight:"600",
            fontSize:{xs:"10px",sm:"20px",xl:'25px'}
          },
            }} value="البلاغ عن مفقود" control={<Radio />} label="البلاغ عن مفقود" onChange={(e)=>setIsSearcher(true)} />
            <FormControlLabel sx={{color:"#2E74FD",
          "& .MuiFormControlLabel-label": {
            fontWeight:"600",
            fontSize:{xs:"10px",sm:"20px",xl:'25px'}
          },}} value="البلاغ عن إيجاد مفقود" control={<Radio />} label="البلاغ عن إيجاد مفقود"  onChange={(e)=>setIsSearcher(false)} />
          
        </RadioGroup>
        </Box>
        </Box>
        <Box sx={{display:"flex",flexDirection:"column",gap:"20px",width:{sm:"80%",md:"40%",lg:"30%"},}}>
            <Box>
                <Typography sx={{fontSize:"20px",fontWeight:"400",paddingBottom:"10px"}}>وقت وقوع الحدث</Typography>
                <Box sx={{background:"#F1F4FC",borderRadius:"20px",padding:{sm:"5px 0",xl:"20px 0"},}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                    <DemoContainer
                        components={[
                        
                        'DesktopDatePicker',
                        
                        ]}
                    >
                        <DemoItem>
                        <DesktopDatePicker 
                         onChange={handlChangeForm}
                        sx={{
                         display:"flex",
                         flexDirection:"column",
                         width:{sm:"100%",md:"95%",xl:"100%"},
                         padding:"20px",
                        
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {borderRadius:"30px",padding:"20px 0",marginTop:"-9px",background:"#ffffff33",color:"#000"},
                          },
                        
                        }}
                      
                        slotProps={{ textField: { placeholder: 'العام  / الشهر   / اليوم ' }}}/>
                        </DemoItem>
                    </DemoContainer>
        </LocalizationProvider>
                </Box>
            </Box>
            <Box>
                <Typography sx={{fontSize:"20px",fontWeight:"400",paddingBottom:"10px"}}>وقت البلاغ / الفقد  </Typography>
                <Box sx={{background:"#F1F4FC",borderRadius:"20px",padding:{sm:"5px 0",xl:"20px 0"}}} >
                <LocalizationProvider dateAdapter={AdapterDayjs}  >
                    <DemoContainer
                        components={[
                        
                            'DesktopTimePicker',
                        
                        ]}
                    >
                        <DemoItem>
                        <DesktopTimePicker 
                       onChange={handlChangeForm}
                        sx={{
                         display:"flex",
                         flexDirection:"column",
                        //  width:"fit-content",
                         width:{sm:"100%",md:"95%",xl:"100%"},
                         padding:"20px",
                        
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {borderRadius:"30px",padding:"20px 0",marginTop:"-9px",background:"#ffffff33",color:"#000"},
                          },
                        
                        }}
                     
                        slotProps={{ textField: { placeholder: 'اختر الساعه والدقايق  ' }}}
                      
                        // ref={(input)=>inpRefs.current[0] =input}
                      
                        />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                </Box>
            </Box>
        </Box>
       
 </Box>
  )
}

export default ComunicationDetails
