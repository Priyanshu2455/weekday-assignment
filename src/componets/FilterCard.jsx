import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { WidthFull } from '@mui/icons-material';


const FilterCard = ({ companyDetails , filterJobs ,selectedRole, setSelectedRole,selectedMinSalary, setSelectedMinSalary,selectedMinExp, setSelectedMinExp,searchByCompanyName, setSearchByCompanyName}) => {  


    
    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR ROLE
    const handleRoleChange = (event) => {
      setSelectedRole(event.target.value);
      filterJobs(event.target.value, selectedMinSalary, selectedMinExp,searchByCompanyName);
    };

    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM EXP  
    const handleMinSalaryChange = (event) => {
      setSelectedMinSalary(event.target.value);
      filterJobs(selectedRole, event.target.value, selectedMinExp,searchByCompanyName);
    };
  
    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM SALARY
    const handleMinExpChange = (event) => {
      setSelectedMinExp(event.target.value);
      filterJobs(selectedRole, selectedMinSalary, event.target.value,searchByCompanyName);
    };

    // ONCHANGE FUNCTION TO GET SELECTED VALUE FOR MINIMUM SALARY
    const handleSearchChange = (event) => {
      // Trim extra spaces and convert to lower case
      const trimmedValue = event.target.value.trim();
      setSearchByCompanyName(trimmedValue); 
      filterJobs(selectedRole, selectedMinSalary, selectedMinExp,trimmedValue);

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
          if (!jobRolesSet.has(jobRole)) 
            {
            jobInfoArray.push({ jobRole, minJdSalary: formattedMinJdSalary, minExp: formattedMinExp });
            jobRolesSet.add(jobRole);
          }
        });
      
        return jobInfoArray;
      };   

    const jobInfo = extractJobInfo(companyDetails); 
    

  return (
        <card  style={{ width: '100%', marginLeft: '5%' }} >
          <CardContent>
            <Typography variant="h6" gutterBottom>  Search Criteria </Typography>
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

                  >
                    {
                        jobInfo?.map((data)=>{
                           return data.jobRole && <MenuItem value={data.jobRole}>{data.jobRole}</MenuItem>

                        })
                    }   
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={1}>
                <TextField fullWidth label="No. of Employees" type="number" />
              </Grid>
              <Grid item xs={6} sm={1}>
                <FormControl fullWidth>
                    <InputLabel htmlFor="Experience">Experience</InputLabel>
                    <Select
                        labelId="Experience"
                        id="Experience"
                        label="Experience"
                        defaultValue=""
                        onChange={handleMinExpChange}

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
                <TextField fullWidth label="Remote" type="text" />
              </Grid>
              <Grid item xs={6} sm={2}>
                <TextField fullWidth label="Tech Stack" type="text" />
              </Grid>
              <Grid item xs={6} sm={2}>
              <FormControl fullWidth>
                    <InputLabel htmlFor="Min Salary">Min Salary</InputLabel>
                    <Select
                        labelId="Min Salary"
                        id="Min Salary"
                        label="Min Salary"
                        defaultValue=""
                        onChange={handleMinSalaryChange}

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
                <TextField fullWidth label="Search by Name" placeholder="Enter company name" onChange={handleSearchChange} />
              </Grid>
            </Grid>
          </CardContent>
        </card>
  )
}

export default FilterCard