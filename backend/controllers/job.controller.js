const prisma = require("../src/db");
const { z } = require("zod");

const jobSchema = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  title: z.string().min(1, { message: "Job title is required" }),
  rate: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, { message: "Rate must be a positive number" }),
  location: z.string().min(1, { message: "Location is required" }),
  workType: z.enum(["full-time", "part-time", "internship", "project-work"]),
  experienceLevel: z.enum(["entry-level", "mid-level", "senior-level"]),
  jobType: z.enum(["on-site", "remote"]),
  duration: z.enum(["temporarily", "permanent"]),
  description: z
    .string()
    .max(60000, { message: "Max character limit reached" }),
});

const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobs.findMany();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await prisma.jobs.findUnique({ where: { id: parseInt(id) } });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postJob = async (req, res) => {
  const {
    company,
    title,
    rate,
    location,
    workType,
    experienceLevel,
    jobType,
    duration,
    description,
  } = req.body;
  const companyLogo = req.file ? req.file.path : null;

  try {
    // Validate the job data with Zod
    jobSchema.parse({
      company,
      title,
      rate,
      location,
      workType,
      experienceLevel,
      jobType,
      duration,
      description,
    });

    const newJob = await prisma.jobs.create({
      data: {
        date: new Date().toISOString(), // Set the date to the current date as a string
        company,
        title,
        rate: parseInt(rate, 10),
        location,
        workType,
        experienceLevel,
        jobType,
        duration,
        companyLogo,
        description,
      },
    });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getJobs, postJob, getJob };
