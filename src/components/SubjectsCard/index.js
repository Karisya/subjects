import { useEffect, useCallback } from "react";
import { Card, Input } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import {
  initializeCardState,
  setAdditionalInfo,
} from "../../redux/slices/teachersStateSlice";
import Subgroups from "../Subgroups";
import "./style.css";

const { TextArea } = Input;

const SubjectsCard = ({ subject }) => {
  const dispatch = useDispatch();
  const cardId = `${subject.subjectName}_${subject.course}_${subject.groupName}`;
  const cardState = useSelector((state) => state.teachersState[cardId]);

  useEffect(() => {
    dispatch(initializeCardState({ cardId }));
  }, [dispatch, cardId]);

  const handleAdditionalInfo = useCallback(
    (e) => {
      dispatch(setAdditionalInfo({ cardId, value: e.target.value }));
    },
    [dispatch, cardId],
  );

  if (!cardState || !cardState.subgroups) return null;

  const rows = [
    { key: "lectures", title: "Лекции", hours: subject.lecturesHours },
    {
      key: "laboratory",
      title: "Лабораторные",
      hours: subject.laboratoryHours,
    },
    { key: "practic", title: "Практические", hours: subject.practicHours },
    { key: "seminar", title: "Семинарские", hours: subject.seminarHours },
  ];

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
      <Subgroups cardId={cardId} subject={subject} rows={rows} />

      <div className="subjectCard__note">
        <label htmlFor="additionalInfo">
          Примечание
          <br />
          <span>для составления расписания</span>
        </label>
        <TextArea
          id="additionalInfo"
          value={cardState.additionalInfo || ""}
          onChange={(e) => handleAdditionalInfo(e)}
          rows={2}
          style={{ width: "100%" }}
        />
      </div>
    </Card>
  );
};

export default SubjectsCard;
