import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Button } from '@mui/material';
import { WidthFull } from '@mui/icons-material';


const FilterCard = ({ handleClearButton, setSearchByJobLocation, searchByJobLocation, companyDetails , filterJobs ,selectedRole, setSelectedRole,selectedMinSalary, setSelectedMinSalary,selectedMinExp, setSelectedMinExp,searchByCompanyName, setSearchByCompanyName}) => {  

    const [jobInfo,setJobInfo]= useState([]);

    useEffect(() => {
        const jobInfo = extractJobInfo(companyDetails);     
        setJobInfo(jobInfo);
    },[companyDetails])


    
    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR ROLE
    const handleRoleChange = (event) => {
      setSelectedRole(event.target.value);
      filterJobs(event.target.value, selectedMinSalary, selectedMinExp,searchByCompanyName,searchByJobLocation);
    };

    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM EXP  
    const handleMinSalaryChange = (event) => {
        setSelectedMinSalary(event.target.value);
        filterJobs(selectedRole, event.target.value, selectedMinExp,searchByCompanyName,searchByJobLocation);
    };
  
    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM SALARY
    const handleMinExpChange = (event) => {
        setSelectedMinExp(event.target.value);
      filterJobs(selectedRole, selectedMinSalary, event.target.value,searchByCompanyName,searchByJobLocation);
    };

    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM SALARY
    const handleJobLocation = (event) => {
    setSearchByJobLocation(event.target.value);
    filterJobs(selectedRole, selectedMinSalary, selectedMinExp,searchByCompanyName,event.target.value);
    };

    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM SALARY
    const handleSearchChange = (event) => {
      // Trim extra spaces
      const trimmedValue = event.target.value.trim();
      setSearchByCompanyName(trimmedValue); 
      filterJobs(selectedRole, selectedMinSalary, selectedMinExp,trimmedValue,searchByJobLocation);

    };
    
    const extractJobInfo = (jobs) => {
        const jobInfoArray = [];
        const jobRolesSet = new Set();
      
        jobs.forEach((job) => {
          const { jobRole, minJdSalary, minExp } = job;
      
          // Handle null values
          const formattedMinJdSalary = minJdSalary !== null ? minJdSalary : '';
          const formattedMinExp = minExp !== null ? minExp : '';
      
          // Check if job role already exists in the set
          if (!jobRolesSet.has(jobRole)) {
            jobInfoArray.push({ jobRole, minJdSalary: formattedMinJdSalary, minExp: formattedMinExp });
            jobRolesSet.add(jobRole);
          }
        });
      
        return jobInfoArray;
      };
      
    

  return (
        <card  style={{ width: '100%', marginLeft: '5%',marginTop:"3%" }} >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={2} sx={{height:'fit-content'}}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Select
                    labelId="role"
                    id="role"
                    label="Role"
                    defaultValue=""
                    onChange={handleRoleChange}
                    value={selectedRole}

                  >
                    {
                        jobInfo?.map((data)=>{
                           return data.jobRole && <MenuItem value={data.jobRole}>{data.jobRole}</MenuItem>

                        })
                    }   
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={6} sm={1}>
                <TextField fullWidth label="No. of Employees" type="number"  />
              </Grid> */}
              <Grid item xs={6} sm={2}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="Experience">Experience</InputLabel>
                    <Select 
                        labelId="Experience"
                        id="Experience"
                        label="Experience"
                        defaultValue=""
                        onChange={handleMinExpChange}
                        value={selectedMinExp}

                    >
                        {
                            jobInfo?.map((data)=>{
                            return data.minExp && <MenuItem value={data.minExp}>{data.minExp}</MenuItem>

                            })
                        }   
                    </Select>
                    </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <FormControl fullWidth>
                        <InputLabel htmlFor="Remote">Job Location</InputLabel>
                        <Select
                            labelId="Remote"
                            id="Remote"
                            label="Job Location"
                            defaultValue=""
                            onChange={handleJobLocation}
                            value={searchByJobLocation}
                        >
                           <MenuItem value="remote"> Remote </MenuItem>  
                           <MenuItem value="hybrid"> Hybrid </MenuItem>  
                           <MenuItem value="office"> In-Office </MenuItem>  

                        </Select>
                    </FormControl>
              </Grid>
              {/* <Grid item xs={6} sm={2}>
                <TextField fullWidth label="Tech Stack" type="text" />
              </Grid> */}
              <Grid item xs={6} sm={2}>
              <FormControl fullWidth>
                    <InputLabel htmlFor="Min Salary">Min Salary</InputLabel>
                    <Select
                        labelId="Min Salary"
                        id="Min Salary"
                        label="Min Salary"
                        defaultValue=""
                        onChange={handleMinSalaryChange}
                        value={selectedMinSalary}

                    >
                        {
                            jobInfo?.map((data)=>{
                              return  data.minJdSalary &&  <MenuItem value={data.minJdSalary}>{data.minJdSalary}</MenuItem>

                            })
                        }   
                    </Select>
                    </FormControl>
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField value={searchByCompanyName} fullWidth label="Search by Name" placeholder="Enter company name" onChange={handleSearchChange} />
              </Grid>

              {/* CLEAR BUTTON */}
              <Grid item xs={6} sm={2}>
                <Button  sx={{ width: "50%",background:"#1976D2",borderRadius:"8px",margin:"10px 0 0 0" ,color:"black" }} onClick={handleClearButton}>
                    Clear
                </Button>
              </Grid>

            </Grid>
          </CardContent>
        </card>
  )
}

export default FilterCard