const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Function to calculate grade point based on score
function calculateGradePoint(score) {
    if (score >= 70 && score <= 100) return 7.0;
    if (score >= 65 && score < 70) return 6.0;
    if (score >= 60 && score < 65) return 5.0;
    if (score >= 55 && score < 60) return 4.0;
    if (score >= 50 && score < 55) return 3.0;
    if (score >= 45 && score < 50) return 2.0;
    if (score >= 40 && score < 45) return 1.0;
    return 0.0; // Fail
}

// Route to render input form
app.get("/", (req, res) => {
    res.render("index");
});

// Route to calculate and display results
app.post("/calculate", (req, res) => {
    const scores = req.body.scores.map(score => parseFloat(score)); // Convert input to numbers
    const gradePoints = scores.map(score => calculateGradePoint(score)); // Calculate grade points
    const totalGradePoint = gradePoints.reduce((sum, gp) => sum + gp, 0); // Sum of grade points
    const cgpa = totalGradePoint / scores.length; // Average grade point (CGPA)

    res.render("result", { scores, gradePoints, cgpa });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
