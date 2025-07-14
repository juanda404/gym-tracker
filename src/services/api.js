const BASE_URL = "http://localhost:5000"; // asegúrate que coincida con tu backend

export const createExerciseLog = async (exercise) => {
  const res = await fetch(`${BASE_URL}/exercise_logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(exercise),
  });


  if (!res.ok) {
    throw new Error("Failed to create exercise log");
  }
  return res.json();
};

export const getExercisesByLogId = async (workoutLogId) => {
  const res = await fetch(`${BASE_URL}/exercise_logs?workout_log_id=${workoutLogId}`);
  return res.json();
};