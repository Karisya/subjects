import { Button, Select } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./style.css"

const SubgroupRows=({onTeacherChange, onApplyAll, cardId})=>{
    
const teachers = useSelector((state)=>state.teachers)
const cardState = useSelector((state) => state.teachersState[cardId]);
const subject = useSelector((state) =>
    state.subjects.find((s) => `${s.subjectName}_${s.course}_${s.groupName}` === cardId)
);

 const LESSON_ROWS = [
    { key: "lectures", title: "Лекции" },
    { key: "laboratory", title: "Лабораторные" },
    { key: "practic", title: "Практические" },
    { key: "seminar", title: "Семинарские" },
  ];

   if (subject.exam || subject.offset) {
    LESSON_ROWS.push({
      key: "control",
      title: subject.exam ? "Экзамен" : "Зачёт",
    });
  }

  const rows = LESSON_ROWS.map((r) => ({
    ...r,
    hours: subject[`${r.key}Hours`],
  }));



    return(
        <>
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
                          onTeacherChange(i, row.key, value)
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
                          onClick={() => onApplyAll(i)}
                          size="small"
                          style={{ marginLeft: 4 }}
                        />
                      )}
                      
                    </div>
                  ))}
                </div>
              ))}
        
        </>
    )
}

export default SubgroupRows