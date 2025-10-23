import { useSelector } from "react-redux";

const StudentsNumberRow=({onStudentChange, totalStudents, cardId})=>{

    const cardState = useSelector((state) => state.teachersState[cardId]);
    const subgroups = cardState?.subgroups || [];
   if (subgroups.length < 2) return null;

  return (
    <div className="subjectCard__rows subgroups__row">
      <div>Количество человек</div>
      <div></div>
      {subgroups.map((sg, i) => (
        <div key={i} className="subgroup__cell">
          <input
            type="number"
            value={sg.studentsNumber === 0 ? 0 : sg.studentsNumber ?? ""}
            onChange={(e) => onStudentChange(i, e.target.value)}
            min={0}
            max={totalStudents}
            style={{ width: 60 }}
          />
        </div>
      ))}
    </div>
  );
}

export default StudentsNumberRow