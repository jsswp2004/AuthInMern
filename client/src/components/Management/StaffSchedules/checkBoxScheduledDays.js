import { useState } from "react"




export const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      <label htmlFor={`checkbox-${index}`}>{label}</label>
    </div>
  )
}

function CheckBox(props) {

  const allDays = () => [
    { name: "Monday", checked: props.preValueMonday.toString() === 'true' ? true : false },
    { name: "Tuesday", checked: props.preValueTuesday },
    { name: "Wednesday", checked: props.preValueWednesday },
    { name: "Thursday", checked: props.preValueThursday },
    { name: "Friday", checked: props.preValueFriday },
    
  ]
  console.log(props.preValueMonday)

  const [schedDays, setSchedDays] = useState(allDays)

  const updateCheckStatus = index => {
    setSchedDays(
        schedDays.map((schedDay, currentIndex) =>
        currentIndex === index ? { ...schedDay, checked: !schedDay.checked }: schedDay,
        
      )
    )
// console.log(updateCheckStatus())
    // or
    // setToppings([
    //   ...toppings.slice(0, index),
    //   { ...toppings[index], checked: !toppings[index].checked },
    //   ...toppings.slice(index + 1),
    // ]);
  }

  console.log(schedDays)

  return (
    <div className="App">
      {schedDays.map((schedDay, index) => (
        <Checkbox
          key={schedDay.name}
          isChecked={schedDay.checked}

          checkHandler={() => updateCheckStatus(index)}
          label={schedDay.name}
          index={index}
        />
      ))}
      {/* <p>
        <pre>{JSON.stringify(schedDays, null, 2)}</pre>
      </p> */}
    </div>
  )
}

export default CheckBox