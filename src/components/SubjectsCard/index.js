const SubjectsCard=({subject})=>{

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
                </div>
        </div>
    )
}

export default SubjectsCard