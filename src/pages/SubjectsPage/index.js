import { useDispatch, useSelector } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"
import SubjectsCard from "../../components/SubjectsCard"

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
        <div>
        {subjects.map(subject=>(
            <SubjectsCard subject={subject}/>
        ))}
        </div>
    )
}

export default SubjectsPage