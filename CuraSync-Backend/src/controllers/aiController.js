/**
 * Very simple "AI" endpoints for demo:
 * - /summary: returns a short summary of given text
 * - /predict-risk: returns Low/Medium/High based on simple rules
 */

exports.summary = (req, res) => {
  const { medical_history } = req.body;
  if (!medical_history) {
    return res.status(400).json({ message: "medical_history is required" });
  }
  const summary =
    "Summary: " +
    (medical_history.length > 180
      ? medical_history.substring(0, 180) + "..."
      : medical_history);
  res.json({ summary });
};

exports.predictRisk = (req, res) => {
  const { age, symptoms } = req.body;
  let risk = "Low";

  const sympText = (symptoms || "").toLowerCase();
  if (age >= 60 || sympText.includes("chest pain")) {
    risk = "High";
  } else if (age >= 40 || sympText.includes("dizziness")) {
    risk = "Medium";
  }

  res.json({ risk });
};