import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addSubgroup,
  removeSubgroup,
  setTeacher,
  applyTeacherToAll,
  setSubgroupStudentsNumber,
} from "../../redux/slices/teachersStateSlice";
import SubgroupHeader from "./SubgroupHeader";
import SubgroupRows from "./SubgroupRows";
import StudentsNumberRow from "./StudentsNumberRow";

const Subgroups = ({ cardId }) => {
  const dispatch = useDispatch();
  const cardState = useSelector((s) => s.teachersState[cardId]);
  const subgroups = cardState?.subgroups || [];
  const subject = useSelector((s) =>
    s.subjects.find(
      (subj) =>
        `${subj.subjectName}_${subj.course}_${subj.groupName}` === cardId,
    ),
  );

  const handleAddSubgroup = useCallback(() => {
    if (subgroups.length < 2) {
      dispatch(addSubgroup({ cardId, totalStudents: subject.studentsNumber }));
    }
  }, [dispatch, cardId, subgroups.length, subject.studentsNumber]);

  const handleRemoveSubgroup = useCallback(
    (index) => dispatch(removeSubgroup({ cardId, index })),
    [dispatch, cardId],
  );

  const handleTeacherChange = useCallback(
    (index, key, value) =>
      dispatch(setTeacher({ cardId, subgroupIndex: index, key, value })),
    [dispatch, cardId],
  );

  const handleApplyAll = useCallback(
    (index) => {
      const selected = cardState.subgroups[index]?.lectures;
      if (selected) {
        dispatch(
          applyTeacherToAll({
            cardId,
            subject,
            selected,
            subgroupIndex: index,
          }),
        );
      }
    },
    [dispatch, cardId, cardState.subgroups, subject],
  );

  const handleStudentsChange = useCallback(
    (index, value) =>
      dispatch(
        setSubgroupStudentsNumber({ cardId, subgroupIndex: index, value }),
      ),
    [dispatch, cardId],
  );

  if (!cardState || !subject) return null;

  return (
    <>
      <SubgroupHeader
        onAdd={handleAddSubgroup}
        onRemove={handleRemoveSubgroup}
        cardId={cardId}
      />
      <SubgroupRows
        onTeacherChange={handleTeacherChange}
        onApplyAll={handleApplyAll}
        cardId={cardId}
      />
      <StudentsNumberRow
        totalStudents={subject.studentsNumber}
        cardId={cardId}
        onStudentChange={handleStudentsChange}
      />
    </>
  );
};

export default React.memo(Subgroups);
