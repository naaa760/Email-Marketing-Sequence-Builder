import Agenda from "agenda";
import dotenv from "dotenv";

dotenv.config();

const agenda = new Agenda({
  db: {
    address: process.env.MONGODB_URI,
    collection: "emailJobs",
  },
});

// Define job types
agenda.define("send-email", async (job) => {
  const { to, subject, body } = job.attrs.data;
  try {
    await sendEmail(to, subject, body);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
});

// Start agenda
const startAgenda = async () => {
  await agenda.start();
  console.log("Agenda started");
};

export { agenda, startAgenda };
