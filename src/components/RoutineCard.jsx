const RoutineCard = ({ routine }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-blue-700">{routine.name}</h2>
      <p className="text-sm text-gray-500 mb-1">{routine.focus}</p>
      <p className="text-xs text-gray-400 mb-2">Duration: {routine.duration}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {routine.exercises.map((ex, i) => (
          <span key={i}
          className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
          >{ex}</span>
        ))}
      </div>
    </div>
  );
};

export default RoutineCard;