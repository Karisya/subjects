import { useDispatch, useSelector } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"
import SubjectsCard from "../../components/SubjectsCard"
import { useEffect } from "react"
import "./style.css"
import { fetchTeachers } from "../../redux/slices/teachersThunk"

const SubjectsPage=()=>{
    const dispatch = useDispatch()
    
        useEffect(()=>{
            dispatch(fetchSubject())
            dispatch(fetchTeachers())
        },[dispatch])
        const subjects = useSelector((state)=>state.subjects)
        const teachers = useSelector((state)=>state.teachers)
        console.log("предметы:", subjects)
        console.log("преподаватели:", teachers)
    
        if(!subjects.length){
            return <p>Загрузка данных...</p>
        }

    return(
        <div className="subjects">
        {subjects.map(subject=>(
            <SubjectsCard key={subject.uniqueId} subject={subject}/>
        ))}
        </div>
    )
}

export default SubjectsPage