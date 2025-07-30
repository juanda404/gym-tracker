import { supabase } from '../supabase/client'
const BASE_URL = "https://gym-tracker-2zl6.onrender.com"; // asegúrate que coincida con tu backend

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
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const { data, error } = await supabase
    .from('routines')
    .select('*')
    .eq('user_id', user.id) // 👈 Solo rutinas del usuario
    .order('id', { ascending: false });

  if (error) throw error;
  return data;
}

// 👇 Crear una nueva rutina
export async function createRoutine(newRoutine) {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;

  const routineWithUser = {
    ...newRoutine,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from('routines')
    .insert([routineWithUser])
    .select()
    .single();

  if (error) throw error;
  return data;
}
