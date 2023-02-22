import { useRef } from "react"

export default function VisitID() {
    const initialID = '0'
    const reference = useRef(initialID)

    const pullVisitID = () => {
        const visitIDValue = reference.current
        // reference.current = newValue
    }
}