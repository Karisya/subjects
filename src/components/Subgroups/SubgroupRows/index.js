import { useCallback, useMemo } from "react";
import { Button, Select } from "antd";
import { DownCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./style.css";

const SubgroupRows = ({ onTeacherChange, onApplyAll, cardId }) => {
  const teachers = useSelector((state) => state.teachers);
  const cardState = useSelector((state) => state.teachersState[cardId]);
  const subject = useSelector((state) =>
    state.subjects.find(
      (s) => `${s.subjectName}_${s.course}_${s.groupName}` === cardId,
    ),
  );

  const rows = useMemo(() => {
    const lessonRows = [
      { key: "lectures", title: "Лекции" },
      { key: "laboratory", title: "Лабораторные" },
      { key: "practic", title: "Практические" },
      { key: "seminar", title: "Семинарские" },
    ];

    if (subject.exam || subject.offset) {
      lessonRows.push({
        key: "control",
        title: subject.exam ? "Экзамен" : "Зачёт",
      });
    }

    return lessonRows.map((r) => ({
      ...r,
      hours: subject[`${r.key}Hours`],
    }));
  }, [subject]);

  const handleTeacherChange = useCallback(
    (index, key, value) => onTeacherChange(index, key, value),
    [onTeacherChange],
  );

  const handleApplyAll = useCallback(
    (index) => onApplyAll(index),
    [onApplyAll],
  );

  return (
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
                onChange={(value) => handleTeacherChange(i, row.key, value)}
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
    </>
  );
};

export default SubgroupRows;
