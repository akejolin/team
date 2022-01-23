import react, {ChangeEvent, useEffect} from 'react'

interface Iprops {
  target: string,
  value: string,
  handleChange: Function,
  data: {key: string, value: string}[],
}

const Picker = (props: Iprops) => {

  const handleChange = (e) => {
    props.handleChange(e.target.value);
  };


  return (
    <div>
      <select
        id={`picker-${props.target}`}
        value={props.value}
        onChange={handleChange}
      >
        {props.data.map((item) => {
          return (
            <option key={`picker-${props.target}-${item.value}`} value={item.value}>{item.key}</option>
          )
        })}
      </select>
    </div>
  ) 
}

Picker.defaultProps = {
  target: 'employee',
  data: [{key:'foo', value: 'bar'}],
  handleChange: () => {},
  value: ''
}

export default Picker