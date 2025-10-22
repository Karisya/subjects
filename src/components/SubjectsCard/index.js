import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"

const SubjectsCard=()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchSubject())
    },[dispatch])
    const subjects = useSelector((state)=>state.subjects)
    console.log("предметы:", subjects)

    if(!subjects.length){
        return <p>Загрузка данных...</p>
    }

    return (
        <div>
        </div>
    )
}

export default SubjectsCard