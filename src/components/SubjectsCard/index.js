import {Card, Button, Select, Input} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BookOutlined } from '@ant-design/icons';
import "./style.css"
import { useState} from "react";
import { DownCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const SubjectsCard=({subject, teachers})=>{

    const rows = [
    { key: "lectures", title: "Лекции", hours: subject.lecturesHours },
    { key: "laboratory", title: "Лабораторные работы", hours: subject.laboratoryHours },
    { key: "practic", title: "Практические", hours: subject.practicHours },
    { key: "seminar", title: "Семинарские", hours: subject.seminarHours },
  ];

  const [teachersState, setTeachersState]=useState({
    lecturesTeacher:"vacancy",
    laboratoryTeacher:"vacancy",
    practic:"vacancy",
    seminar:"vacancy",
    control:"vacancy",
    additionalInfo:""
  })

  const handleTeachersChoice=(key,value)=>{
    setTeachersState(prev=>({...prev, [key]:value}))
  }

  const handleAdditionalInfo=(key,value)=>{
    setTeachersState(prev=>({...prev, additionalInfo:value}))
  }
const applyToAll = () => {
  const selected = teachersState.lectures; 
  setTeachersState(prev => {
    const newState = { ...prev };
    rows.forEach(r => {
      if (subject[`${r.key}Hours`] !== "0") {
        newState[r.key] = selected;
      }
    });
    if (subject.exam || subject.offset) {
      newState.control = selected;
    }
    return newState;
  });
};

    return (
        <Card 
        className="subjectCard"
        title={<h2 className="subjectCard__title"><BookOutlined/>{subject.subjectName}</h2>}>
                <div>
                    <div className="subjectCard__info">
                        <p>Группа: {subject.groupName}</p>
                        <p>Курс: {subject.course}</p>
                        <p>Количество курсантов: {subject.studentsNumber}</p>
                        <p>Семестр: {subject.semestr}</p>
                    </div>
                    <div className="subjectCard__header">
                        <div>Занятие</div>
                        <div>Часы</div>
                        <div><span>Преподаватель</span><Button icon={<PlusOutlined />}/></div>
                    </div>
                    {rows.map(it=>(
                        <div className="subjectCard__rows">
                            <div>{it.title}</div>
                            <div>{it.hours}</div>
                            <div>
                                <Select
                                defaultValue={"vacancy"}
                                    disabled={it.hours==='0'}
                                    style={{ width: 250}}
                                    value={teachersState[it.key]}
                                    onChange={(value)=>handleTeachersChoice(it.key, value)}
                                    options={[
                                        {value:"vacancy", label:"Вакансия"},
                                        ...teachers.map(t=>({value:`${t.id}`, label:`${t.name}`}))
                                    ]}
                                />
                                {it.key==="lectures" && (
                                    <Button 
                                        icon={<DownCircleOutlined />}
                                        onClick={applyToAll} />)}
                            </div>
                        </div>
                    ))}
                    <div className="subjectCard__control">
                        <div>
                        {subject.exam&&<p>Экзамен</p>}
                        {subject.offset&&<p>Зачет</p>}
                        </div>
                        <span></span>
                        <div>
                            <Select
                                style={{ width: 250 }}
                                value={teachersState.control}
                                onChange={(value) => handleTeachersChoice("control", value)}
                                options={[
                                    {value:"vacancy", label:"Вакансия"},
                                    ...teachers.map(t=>({value:`${t.id}`, label:`${t.name}`}))
                                ]}
                            />
                        </div>
                    </div>
                    <div className="subjectCard__note">
                        <label>Примечание<br/><span>для составления расписания</span></label>
                        <span></span>
                        <TextArea
                            value={teachersState.additionalInfo}
                            onChange={(e) => handleAdditionalInfo(e.target.value)}
                            rows="2"/>
                    </div>
                </div>
        </Card>
    )
}

export default SubjectsCard