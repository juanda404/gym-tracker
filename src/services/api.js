import { supabase } from '../supabase/client'
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


// 👇 Obtener todas las rutinas
export async function getRoutines() {
  const { data, error } = await supabase.from('routines').select('*').order('id', { ascending: false });
  if (error) throw error;
  return data;
}

// 👇 Crear una nueva rutina
export async function createRoutine(newRoutine) {
  const { data, error } = await supabase.from('routines').insert([newRoutine]).select().single();
  if (error) throw error;
  return data;
}