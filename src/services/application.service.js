const { promisify } = require("util");
const Application = require("../models/application.model");
const { redisClient } = require("../db/connection");

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);


// Create a new user
const createApplication = async (ApplicationData) => {
  try {
      const application = await Application.create(ApplicationData);
      const cachedApplication = await getAsync("applications");
   
      let cachedData=[];
      if(cachedApplication){
         cachedData = JSON.parse(cachedApplication);
         cachedData.push(application)
         
         await setAsync("applications", JSON.stringify(cachedData), "EX", 180);
          console.log("success")
     }else{
        cachedData.push(application)
     }
     await setAsync("applications", JSON.stringify(cachedData), "EX", 180);
     console.log("set cache")
     return application;
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
};

async function getApplications() {
  try {
    const cachedUsers = await getAsync("applications");

    if (cachedUsers) {
      console.log("Get from cache");
      return JSON.parse(cachedUsers);
    }
   
    const applications = await Application.findAll();

    await setAsync("applications", JSON.stringify(applications), "EX", 180);
    console.log("Set cache");

    return applications;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch applications");
  }
}
module.exports = { createApplication, getApplications };
