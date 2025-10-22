const SubjectsCard=({subject})=>{

    const rows = [
    { key: "lectures", title: "Лекции", hours: subject.lecturesHours },
    { key: "laboratory", title: "Лабораторные работы", hours: subject.laboratoryHours },
    { key: "practic", title: "Практические", hours: subject.practicHours },
    { key: "seminar", title: "Семинарские", hours: subject.seminarHours },
  ];

    return (
        <div className="subjectCard">
                <div>
                    <h2>{subject.subjectName}</h2>
                    <div>
                        <p>Группа: {subject.groupName}</p>
                        <p>Количество курсантов: {subject.studentsNumber}</p>
                        <p>Курс: {subject.course}</p>
                        <p>Семестр: {subject.semestr}</p>
                    </div>
                    <div>
                        <div>Занятие</div>
                        <div>Часы</div>
                        <div><span>Преподаватель</span><button>+</button></div>
                    </div>
                    {rows.map(it=>(
                        <div>
                            <div>{it.title}</div>
                            <div>{it.hours}</div>
                            <div>
                                <select>
                                    <option>Вакансия</option>
                                </select>
                            </div>
                            <div>
                                <label>Примечание<br/><span>для составления расписания</span></label>
                                <textarea  rows="2"/>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}

export default SubjectsCard