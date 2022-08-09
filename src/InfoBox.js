import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./InfoBox.css"

function InfoBox({ isRed,active,title, cases, total, ...props }) {
  
  return (
   <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">{total} Total</Typography>
      </CardContent>
   </Card>
  )
}

export default InfoBox 