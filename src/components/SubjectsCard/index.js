import {Card, Button, Select, Input} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { BookOutlined } from '@ant-design/icons';
import "./style.css"

const { TextArea } = Input;

const SubjectsCard=({subject})=>{

    const rows = [
    { key: "lectures", title: "Лекции", hours: subject.lecturesHours },
    { key: "laboratory", title: "Лабораторные работы", hours: subject.laboratoryHours },
    { key: "practic", title: "Практические", hours: subject.practicHours },
    { key: "seminar", title: "Семинарские", hours: subject.seminarHours },
  ];

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
                                    defaultValue="vacancy"
                                    options={[
                                        {value:"vacancy", label:"Вакансия"}
                                    ]}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="subjectCard__note">
                        <label>Примечание<br/><span>для составления расписания</span></label>
                        <span></span>
                        <TextArea  rows="2"/>
                    </div>
                </div>
        </Card>
    )
}

export default SubjectsCard