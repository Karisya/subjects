import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchSubject } from "../../redux/slices/subjectThunk"

const SubjectsCard=()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchSubject())
    },[dispatch])
    


    return (
        <>
        </>
    )
}

export default SubjectsCard