module.exports = (req, res, next) => {
  // For demo: allow requests even without real JWT.
  // If a token is present, we just attach a fake user based on token value.
  const authHeader = req.headers.authorization || "";
  const token = authHeader.split(" ")[1];

  if (token === "demo-doctor-token") {
    req.user = { user_id: 1, role: "doctor" };
  } else if (token === "demo-patient-token") {
    req.user = { user_id: 2, role: "patient" };
  } else {
    // Not enforcing 401 for demo; uncomment below if you want strict auth.
    // return res.status(401).json({ message: "Unauthorized" });
    req.user = { role: "guest" };
  }

  next();
};