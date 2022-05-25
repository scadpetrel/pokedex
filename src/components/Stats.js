import React from 'react';
import Box from "@mui/material/Box";
import { lightBlue } from '@mui/material/colors';

const Stats = (props) => {
  return (
    <>
    <Box style={{ backgroundColor: "#e0e0e0" }}width="100%">
    <h4>Stats: </h4>
    {props.stats.map((stat) => (
      <p>
        {stat.stat.name}: {stat.base_stat}
      </p>
    ))}
    </Box>
    </>
  )
}

export default Stats;