import { useDispatch, useSelector } from "react-redux";
import {addSubgroup,removeSubgroup,setTeacher,applyTeacherToAll,setSubgroupStudentsNumber} from "../../redux/slices/teachersStateSlice";
import SubgroupHeader from "./SubgroupHeader";
import SubgroupRows from "./SubgroupRows";
import StudentsNumberRow from "./StudentsNumberRow";

const Subgroups = ({cardId}) => {
    const dispatch = useDispatch();
    const cardState = useSelector((s) => s.teachersState[cardId]);
    const subgroups = cardState?.subgroups || [];
    const subject = useSelector((s) =>
        s.subjects.find(
            (subj) => `${subj.subjectName}_${subj.course}_${subj.groupName}` === cardId
    )
  );
  if (!cardState || !subject) return null;

  const handleAddSubgroup = () => {
    if (subgroups.length < 2) {
      dispatch(addSubgroup({ cardId, totalStudents: subject.studentsNumber }));
    }
  };
  const handleRemoveSubgroup = (index) =>
    dispatch(removeSubgroup({ cardId, index }));

  const handleTeacherChange = (index, key, value) =>
    dispatch(setTeacher({ cardId, subgroupIndex: index, key, value }));

  const handleApplyAll = (index) => {
    const selected = cardState.subgroups[index].lectures;
    dispatch(applyTeacherToAll({ cardId, subject, selected, subgroupIndex:index }));
  };

   const handleStudentsChange = (index, value) =>
    dispatch(
      setSubgroupStudentsNumber({
        cardId,
        subgroupIndex: index,
        value,
      })
    );
  

  return (
    <>
      <SubgroupHeader onAdd={handleAddSubgroup} onRemove={handleRemoveSubgroup} cardId={cardId}/>
      <SubgroupRows onTeacherChange={handleTeacherChange} onApplyAll={handleApplyAll} cardId={cardId}/>
      <StudentsNumberRow totalStudents={subject.studentsNumber} cardId={cardId}
        onStudentChange={handleStudentsChange}
      />
    </>
  );
};

export default Subgroups;
