import React from 'react'
import './widget.scss'
import TollIcon from '@mui/icons-material/Toll';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import RecyclingIcon from '@mui/icons-material/Recycling';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';


const Widget = ({type}) => {
  
  let data;
  
  switch(type) {
    case "coins":
      data = {
        title: "Coins",
        counter: "1,234",
        subtext: "Total Coins Earned",
        icon: <TollIcon className="icon" />,
        color: "#ffbe0b"
      };
      break;
    case "streak":
      data = {
        title: "Streak",
        counter: "5 days",
        subtext: "Current Streak",
        icon: <WhatshotIcon className="icon" />,
        color: "#ff7d00"
      };
      break;
    case "recycled":
      data = {
        title: "Recycled",
        counter: "300 kg",
        subtext: "Total Recycled Waste",
        icon: <RecyclingIcon className="icon" />,
        color: "#38b000"
      };
      break;
    case "carbon":
      data = {
        title: "Carbon Offset",
        counter: "2.5 tons",
        subtext: "Total Carbon Offset",
        icon: <EnergySavingsLeafIcon className="icon" />,
        color: "#9a8c98"
      };
      break;
    default:
       break;
  }
  
  return (
    <div className="widget">
        <div className="left">
            <div className="title">{data.title}</div>
            <div className="counter" style={{ color: data.color }} >{data.counter}</div>
            <div className="subtext">{data.subtext}</div>

        </div>
        <div className="right">
            <div className="icons" style={{ color: data.color }}>
                {data.icon}
            </div>
        </div>
    </div>
  )
}

export default Widget