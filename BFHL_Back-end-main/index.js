const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
// Middleware to parse JSON request bodies
app.use(express.json());

// User data
const userData = {
    user_id: process.env.USER_ID,
    email: process.env.EMAIL,
    roll_number: process.env.ROLL_NUMBER
};

// Function to process the data
const processData = (data) => {
  const numbers = data.filter((item) => /^\d+$/.test(item));
  const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));
  const lowercaseAlphabets = alphabets.filter(
    (item) => item === item.toLowerCase()
  );
  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().pop()] : [];
  return { numbers, alphabets, highestLowercaseAlphabet };
};

// POST endpoint
app.post("/bfhl", (req, res) => {
  const { data } = req.body;
  if (!Array.isArray(data)) {
    return res
      .status(400)
      .json({ is_success: false, message: "Invalid data format" });
  }

  const { numbers, alphabets, highestLowercaseAlphabet } = processData(data);

  res.json({
    is_success: true,
    user_id: userData.user_id,
    email: userData.email,
    roll_number: userData.roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1398 });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
