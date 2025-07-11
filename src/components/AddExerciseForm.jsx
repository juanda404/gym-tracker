import React, { useState } from "react";

const AddExerciseForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    sets: "",
    reps: "",
    weight: "",
    rest: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", sets: "", reps: "", weight: "", rest: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input name="name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="Exercise name" />
      <div className="flex gap-2">
        <input name="sets" type="number" value={form.sets} onChange={handleChange} placeholder="Sets" className="w-1/4 border p-2 rounded" />
        <input name="reps" type="number" value={form.reps} onChange={handleChange} placeholder="Reps" className="w-1/4 border p-2 rounded" />
        <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="Weight (kg)" className="w-1/4 border p-2 rounded" />
        <input name="rest" type="number" value={form.rest} onChange={handleChange} placeholder="Rest (s)" className="w-1/4 border p-2 rounded" />
      </div>
      <textarea name="notes" value={form.notes} onChange={handleChange} rows="2" className="w-full border p-2 rounded" placeholder="Notes" />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">➕ Add Exercise</button>
    </form>
  );
};

export default AddExerciseForm;

