import React, { useEffect,useRef, useState } from "react";
import JobCard from "../componets/JobCard";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { appendJobs } from "../states/job/jobSlice";
import { useSelector } from "react-redux";
import FilterCard from "../componets/FilterCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.data);
  const containerRef = useRef(null);
  const [filterdData,setFilteredData]= useState([]);
  const [offset, setOffsett] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedMinSalary, setSelectedMinSalary] = useState('');
  const [selectedMinExp, setSelectedMinExp] = useState('');
  const [searchByCompanyName, setSearchByCompanyName] = useState("");

  console.log(filterdData);

  // API CALL EVERY TIME OFFSET VALUE CHANGES
  useEffect(() => {
    fetchData();
  }, [offset]);
  useEffect(()=>{
    filterJobs(selectedRole,selectedMinSalary,selectedMinExp,searchByCompanyName)
    // setFilteredData(jobs)
  },[jobs])

  // HANDLE INFINTE HEIGHT
  const handelInfiniteScroll = async () => {
    // console.log("scrollHeight" + document.documentElement.scrollHeight);
    // console.log("innerHeight" + window.innerHeight);
    // console.log("scrollTop" + document.documentElement.scrollTop);
    try { 
      if (   window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight ) 
      {
        setOffsett((prev) => prev + 10);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);


  // METHORD TO GET RESPONSE
  const fetchData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: offset,
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

  const filterJobs = (role, minSalary, minExp, companyName) => {
    const filtered = jobs?.filter((job) => {
      const roleMatch = role === '' || job.jobRole === role;
      const minSalaryMatch = minSalary === '' || job.minJdSalary >= parseFloat(minSalary);
      const minExpMatch = minExp === '' || job.minExp >= parseInt(minExp);
      const companyNameMatch = companyName === "" || job.companyName.toLowerCase().includes(companyName.toLowerCase().trim());
  
      return roleMatch && minSalaryMatch && minExpMatch && companyNameMatch;
    });
  
    setFilteredData(filtered);
  };
  
  

  return (
    <Grid container spacing={10} >
      {/* FILTER CARD SECTION */}
      <FilterCard  selectedRole={selectedRole} setSelectedRole={setSelectedRole} selectedMinSalary={selectedMinSalary} setSelectedMinSalary ={setSelectedMinSalary} selectedMinExp= {selectedMinExp} setSelectedMinExp ={setSelectedMinExp}  setSearchByCompanyName ={setSearchByCompanyName} searchByCompanyName={searchByCompanyName} companyDetails={jobs} filterJobs={filterJobs} />

      {filterdData?.map((item) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item} style={{paddingTop:'15px'}} >
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
