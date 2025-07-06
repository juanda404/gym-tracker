const RoutineCard = ({ routine }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-lg font-semibold text-blue-700">{routine.name}</h2>
      <p className="text-sm text-gray-500">{routine.focus}</p>
      <p className="text-xs text-gray-400">Duration: {routine.duration}</p>
      <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
        {routine.exercises.map((ex, i) => (
          <li key={i}>{ex}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoutineCard;