import { useDispatch, useSelector } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"
import SubjectsCard from "../../components/SubjectsCard"
import { useEffect } from "react"
import "./style.css"

const SubjectsPage=()=>{
    const dispatch = useDispatch()
    
        useEffect(()=>{
            dispatch(fetchSubject())
        },[dispatch])
        const subjects = useSelector((state)=>state.subjects)
        console.log("предметы:", subjects)
    
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