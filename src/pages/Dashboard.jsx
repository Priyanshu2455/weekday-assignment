import React, { useEffect,useRef } from "react";
import JobCard from "../componets/JobCard";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { appendJobs } from "../states/job/jobSlice";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.data);
  console.log(jobs);
  const containerRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop === clientHeight) {
      debugger
      fetchData();
    }
  };

  console.log(jobs);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    try {
      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      dispatch(appendJobs(data.jdList));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Grid container spacing={15} >
      {jobs?.map((item) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item}>
            <JobCard
             cardDetails = {item}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Dashboard;
