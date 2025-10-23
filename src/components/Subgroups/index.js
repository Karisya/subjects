import { Button, Select } from "antd";
import {PlusOutlined,DeleteOutlined,DownCircleOutlined,} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {addSubgroup,removeSubgroup,setTeacher,applyTeacherToAll,setSubgroupStudentsNumber} from "../../redux/slices/teachersStateSlice";

const Subgroups = ({ cardId, subject, rows, teachers }) => {
    const dispatch = useDispatch();
    const cardState = useSelector((state) => state.teachersState[cardId]);
    const subgroups = cardState?.subgroups || [];
    if (!cardState || !cardState.subgroups) return null;

  if (!subgroups || subgroups.length === 0) return null;

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
    dispatch(applyTeacherToAll({ cardId, subject, selected }));
  };

  

  return (
    <>
      <div className="subjectCard__header subgroups__header">
        <div>Занятие</div>
        <div>Часы</div>
        {subgroups.map((_, i) => (
          <div key={i} className="subgroup__header-cell">
            <span>Подгруппа {i + 1}</span>
            {i === 0 && subgroups.length < 2 && (
              <Button icon={<PlusOutlined />} onClick={handleAddSubgroup} />
            )}
            {i === 1 && (
              <Button icon={<DeleteOutlined />} onClick={() => handleRemoveSubgroup(i)} danger />
            )}
          </div>
        ))}
      </div>
      {rows.map((row) => (
        <div className="subjectCard__rows subgroups__row" key={row.key}>
          <div>{row.title}</div>
          <div>{row.hours}</div>
          {cardState.subgroups.map((sg, i) => (
            <div key={i} className="subgroup__cell">
              <Select
                style={{ width: 180 }}
                disabled={row.hours === "0"}
                value={sg[row.key]}
                onChange={(value) =>
                  handleTeacherChange(i, row.key, value)
                }
                options={[
                  { value: "vacancy", label: "Вакансия" },
                  ...teachers.map((t) => ({
                    value: `${t.id}`,
                    label: t.name,
                  })),
                ]}
              />
              {row.key === "lectures" && (
                <Button
                  icon={<DownCircleOutlined />}
                  onClick={() => handleApplyAll(i)}
                  size="small"
                  style={{ marginLeft: 4 }}
                />
              )}
              
            </div>
          ))}
        </div>
      ))}

      <div className="subjectCard__rows subgroups__row">
  <div></div>
  {cardState.subgroups.length > 1 && (
  <div className="subjectCard__rows subgroups__row">
    <div>Количество человек</div>
    <div></div>
     {cardState.subgroups.length > 1 && (
    <div className="subjectCard__rows subgroups__row">
      <div></div>
      {cardState.subgroups.map((sg, i) => (
    <div key={i} className="subgroup__cell">
      <input
        type="number"
        value={sg.studentsNumber === 0 ? 0 : (sg.studentsNumber ?? "")}
        onChange={(e) =>
          dispatch(
            setSubgroupStudentsNumber({
              cardId,
              subgroupIndex: i,
              value: e.target.value,
            })
          )
        }
        min={0}
        max={subject.studentsNumber}
        style={{ width: 60 }}
      />
    </div>
  ))}
    </div>
  )}
  </div>
)}
</div>
    </>
  );
};

export default Subgroups;
