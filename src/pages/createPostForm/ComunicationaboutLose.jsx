import { Box, Button, FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import user from "../../assets/creatPostImage/User.png"
// import addphoto from "../../assets/creatPostImage/add photo.png"
import CreatePostPeople from './CreatePostPeople'
import CreatePostThings from './CreatePostThings'
const ComunicationaboutLose = ({getDataForLosePeople,getDataForthings,getcheckLostPeapleOrThing}) => {
  
    const [checkLostPeapleOrThing,setcheckLostPeapleOrThing]=useState(true)
   
   
   const handlecheckthingorpeple=(e)=>{
    if(e.target.value === "البلاغ عن مفقود")
     { 
     
    setcheckLostPeapleOrThing(true)
    }
    else if(e.target.value =="البلاغ عن إيجاد مفقود"){
     
        setcheckLostPeapleOrThing(false)
    }
}
getcheckLostPeapleOrThing(checkLostPeapleOrThing)

  return (

<>
<Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap:{xs:"40px",md:"70px"},marginTop:"50px"
      }}>
      
        <Typography sx={{display:"flex",justifyContent:"space-between",flexDirection:"row-reverse"}}>
            <Typography sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width: {xs:"30px",md:"50px"},
                    height: {xs:"30px",md:"50px"},
                    padding:" 8px, 0px, 8px, 0px",
                    borderRadius: "50%",
               
                    color:'#000',

                    backgroundColor:"#F1F4FC",
                    textAlign:"center",
                    lineHeight:"50px"
                    
        }}>1</Typography>
            <Typography sx={{
                display:"block",
                width: "162px",
                height: "1px",
                
                backgroundColor:'#DDDDDD',
                position:"relative",
                top: {xs:"15px",md:"20px"},
            }}></Typography>
            <Typography 
            sx={{
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                width: {xs:"30px",md:"50px"},
                height: {xs:"30px",md:"50px"},
                padding:" 8px, 0px, 8px, 0px",
                borderRadius: "50%",
                color:'white',
                backgroundColor:"#FFB86D",
                textAlign:"center",
                lineHeight:"50px"
                
    }}
            >2</Typography>
        </Typography>
        <Typography sx={{
            borderRadius:"25px",
            border:"2px solid #B08BFF",
            padding: {xs:"5px 10px",md:"10px 45px"},
            fontSize: {xs:"16px",md:"20px"},
            fontWeight: "400",
            cursor:"pointer",
            color:"#000"
        }}>     أدخل بيانات المفقود </Typography>
       
        </Box>
        <Box sx={{padding:"1rem",display:"flex",flexDirection:"column",gap:"40px"}}>
            <Box sx={{display:"flex",flexDirection:"column",gap:"60px"}}>
        
                <Box>
                <Typography sx={{fontSize:{md:"25px",xl:'30px'},fontWeight:"400"}}>نوع المفقود </Typography>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="البلاغ عن مفقود"
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
                    fontSize:{xs:"13px",md:"20px",xl:'25px'}
                },
                    }} value="البلاغ عن مفقود" control={<Radio />} label="شخص مفقود  " onClick={handlecheckthingorpeple}/>
                    <FormControlLabel sx={{color:"#2E74FD",
                "& .MuiFormControlLabel-label": {
                    fontWeight:"600",
                    fontSize:{xs:"13px",md:"20px",xl:'25px'}
                },}} value="البلاغ عن إيجاد مفقود" control={<Radio />} label=" متعلقات شخصية  " onClick={handlecheckthingorpeple}/>
                
                </RadioGroup>
                   
                </Box>
            </Box>
            {
                checkLostPeapleOrThing ?
                <CreatePostPeople getDataForLosePeople={getDataForLosePeople}/>
                :<CreatePostThings getDataForthings={getDataForthings}/>
            }
           
        
      
    </Box>
</>

 
  )
}

export default ComunicationaboutLose
