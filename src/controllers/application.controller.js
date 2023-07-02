const ApplicationService=require('../services/application.service')


// Create a new user
const createApplication = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      mobileNo,
      emailId,
      pan,
      adhar,
      permanentAddress,
      landmark,
      city,
      state,
      pincode,
      employmentType,
      employerName,
      loanType,
      loanAmount,
    } = req.body;

    const ApplicationData = {
      firstName,
      lastName,
      dob,
      mobileNo,
      emailId,
      pan,
      adhar,
      permanentAddress,
      landmark,
      city,
      state,
      pincode,
      employmentType,
      employerName,
      loanType,
      loanAmount,
    };

    const user = await ApplicationService.createApplication(ApplicationData);

    res.status(201).json({ message: "Application created successfully", user });
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//for getting the all   applicationslist
async function getApplications(req, res) {
  try {
    const applications = await ApplicationService.getApplications();
    
    if (!applications || applications.length === 0) {
      return res.status(200).json({ message: "No applications available" });
    }
    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
}

module.exports = { createApplication, getApplications };