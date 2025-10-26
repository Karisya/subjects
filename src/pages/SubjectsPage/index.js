import React, { useEffect, useTransition, useCallback } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { fetchSubject } from "../../redux/slices/subjectThunk";
import { fetchTeachers } from "../../redux/slices/teachersThunk";
import { saveThunk } from "../../redux/slices/saveThunk";
import SubjectsCard from "../../components/SubjectsCard";
import "./style.css";

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    dispatch(fetchSubject());
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleSave = useCallback(() => {
    startTransition(async () => {
      const resultAction = await dispatch(saveThunk());
      if (saveThunk.fulfilled.match(resultAction)) {
        alert("Данные успешно сохранены!");
      } else {
        alert("Ошибка при сохранении данных.");
      }
    });
  }, [dispatch]);

  if (!subjects.length && !isPending) {
    return <p>Загрузка данных...</p>;
  }

  return (
    <div className="subjects-page">
      <div className="subjects">
        {subjects.map((subject) => (
          <SubjectsCard key={subject.uniqueId} subject={subject} />
        ))}
      </div>
      <Button type="primary" onClick={handleSave}>
        Сохранить
      </Button>
    </div>
  );
};

export default React.memo(SubjectsPage);
