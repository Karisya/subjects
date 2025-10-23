import { Card, Input } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {initializeCardState,setAdditionalInfo,} from "../../redux/slices/teachersStateSlice";
import Subgroups from "../Subgroups";
import "./style.css";

const { TextArea } = Input;

const SubjectsCard = ({ subject, teachers }) => {
const dispatch = useDispatch();
const cardId = `${subject.subjectName}_${subject.course}_${subject.groupName}`;
const cardState = useSelector((state) => state.teachersState[cardId]);

  useEffect(() => {
    dispatch(initializeCardState({ cardId }));
  }, [dispatch, cardId]);

  if (!cardState || !cardState.subgroups) return null;

  const rows = [
    { key: "lectures", title: "Лекции", hours: subject.lecturesHours },
    { key: "laboratory", title: "Лабораторные", hours: subject.laboratoryHours },
    { key: "practic", title: "Практические", hours: subject.practicHours },
    { key: "seminar", title: "Семинарские", hours: subject.seminarHours },
  ];

  const handleAdditionalInfo = (e, i) => {
    dispatch(setAdditionalInfo({cardId,subgroupIndex: i,value: e.target.value,}));
  };

  return (
    <Card
      className="subjectCard"
      title={
        <h2 className="subjectCard__title">
          <BookOutlined /> {subject.subjectName}
        </h2>
      }
    >
      <div className="subjectCard__info">
        <p>Группа: {subject.groupName}</p>
        <p>Курс: {subject.course}</p>
        <p>Количество курсантов: {subject.studentsNumber}</p>
        <p>Семестр: {subject.semestr}</p>
      </div>
      <Subgroups cardId={cardId} subject={subject}
        rows={rows} teachers={teachers}
      />
      <div className="subjectCard__note">
        <label>Примечание<br /><span>для составления расписания</span></label>
        <span></span>
        {cardState.subgroups.map((sg, i) => (
          <TextArea key={i} value={sg.additionalInfo}
            onChange={(e) => handleAdditionalInfo(e, i)}
            rows={2} style={{ width: 220, marginRight: 8 }}/>
        ))}
      </div>
    </Card>
  );
};

export default SubjectsCard;
