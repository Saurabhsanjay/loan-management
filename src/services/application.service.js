const Application = require("../models/application.model");
const NodeCache = require("node-cache");

const cache = new NodeCache();

// Create a new application
const createApplication = async (ApplicationData) => {
  try {
    const application = await Application.create(ApplicationData);
    const cachedApplication = cache.get("applications");

    let cachedData = [];
    if (cachedApplication) {
      cachedData = cachedApplication;
      cachedData.push(application);

      cache.set("applications", cachedData, 180);
      console.log("Successfully set cache");
    } else {
      cachedData.push(application);
      cache.set("applications", cachedData, 180);
      console.log("Successfully set cache");
    }

    return application;
  } catch (error) {
    console.error("Error creating application:", error);
    throw new Error("Failed to create application");
  }
};

// Retrieve applications
async function getApplications() {
  try {
    const cachedApplications = cache.get("applications");

    if (cachedApplications) {
      console.log("Retrieved from cache");
      return cachedApplications;
    }

    const applications = await Application.findAll();

    cache.set("applications", applications, 180);
    console.log("Successfully set cache");

    return applications;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch applications");
  }
}

module.exports = { createApplication, getApplications };
