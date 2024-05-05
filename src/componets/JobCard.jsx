import React, { useState } from "react";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const JobCard = ({ cardDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{borderRadius:"16px",paddingTop:"20px"}}>
      <CardContent>
        <Typography
          variant="p"
          component="div"
          sx={{
            borderRadius: "10px",
            border: "1px solid gray",
            fontSize: "13px",
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            padding: "2px 4px",
          }}
        >
          <HourglassBottomIcon sx={{ height: "13px", width: "13px" }} />
          posted 10 days ago
        </Typography>
        <Grid container sx={{ margin: "15px 0 0 0" }}>
          <Grid md={1}>
            <img
              src={cardDetails?.logoUrl}
              alt="company logo"
              style={{ width: "30px", height: "30px" }}
            />
          </Grid>
          <Grid md={10} >
            <Grid item>
              <Typography
                sx={{ margin: "0 0 5px 0" }}
                color={"gray"}
                variant="p"
              >
                {cardDetails?.companyName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                sx={{ margin: "0 0 5px 0", marginTop: "10px" }}
                fontSize={"18px"}
                variant="p"
              >
                {cardDetails?.jobRole}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ margin: "0 0 5px 0" }} variant="p">
                {cardDetails?.location}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            margin: "15px 0 0 0",
            display: "flex",
            alignItems: "center",
            color: "gray",
            fontWeight: "400",
          }}
        >
          Estimated Salary: {cardDetails?.salaryCurrencyCode}{" "}
          {cardDetails?.minJdSalary} - {cardDetails?.maxJdSalary}
          <CheckBoxIcon sx={{ color: "green", marginLeft: "3px" }} />
        </Grid>
        <Typography
          sx={{ margin: "5px 0 5px 0", fontSize: "18px" }}
          variant="p"
        >
          About Company:
        </Typography>
        <Grid item>
          <Typography
            sx={{ margin: "5px 0 5px 0", fontSize: "14px", fontWeight: "800" }}
            variant="p"
          >
            About us:
          </Typography>
        </Grid>
        <Grid item>{cardDetails?.jobDetailsFromCompany}</Grid>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "40px", // Adjust the height of the blur effect
            backdropFilter: "blur(4px)",
            zIndex: 1,
            marginTop: "-40px", // Negative margin to overlap the bottom of the description
            display: !expanded ? "block" : "none", // Display only when description is not expanded
          }}
        />
        <Grid
          container
          justifyContent="center"
          sx={{ mt: 1, display: expanded ? "none" : "flex" }}
        >
          <Button variant="text" color="primary">
            View Job
          </Button>
        </Grid>
        <Grid item sx={{color:"gray"}}>Minimum Experience</Grid>
        <Grid item>{cardDetails?.minExp ? `${cardDetails?.minExp} Years` : "-"}</Grid>
        <Grid container >
          <Grid item md={12}>
            <Button  sx={{ width: "100%",background:"#55EFC4",borderRadius:"8px",margin:"10px 0 0 0" ,color:"black" }}>
              Easy Apply
            </Button>
          </Grid>
          <Grid item md={12}  >
            <Button variant="outlined" sx={{ width: "100%" ,margin:"10px 0 0 0",background:"#1976D2" ,color:"white" }}>
             Unlocl Referal asks
            </Button>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

export default JobCard;
