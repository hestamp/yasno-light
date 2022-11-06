import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // useEffect(async() => {
  //   if(navigator.serviceWorker) {
  //     try {
  //       const reg = await navigator.serviceWorker.register('/sw.js')
  //       console.log('s w success')
  //     } catch (error) {
  //       console.log('service worker fail')
  //     }
  //   }
  // }, [])
  
  const [input, setInput] = useState('')
  const [soDisable, setSoDisable] = useState(true)
  const [input2, setInput2] = useState('')
  const [streets, setStreets] = useState([])
  const [houses, setHouses] = useState([])
  const [cursor, setCursor] = useState('closedCur')
  const [selectStreet, setSelectStreet] = useState(null)
  const [selectHouse, setSelectHouse] = useState('')
  const [group, setGroup] = useState(null)
  const [groupSch, setGroupSch] = useState(null)
 


  const URL_CITY = 'https://yasno.com.ua/api/v1/electricity-outages-schedule/street?region=kiev&query='

  const URL_HOUSE = `https://yasno.com.ua/api/v1/electricity-outages-schedule/house?region=kiev&street_id=${selectStreet}&query=`


useEffect(() => {
  fetchCity()
}, [input])

  useEffect(() => {
  fetchHouse()
}, [input2,selectHouse])
 
  async function fetchCity() {
    try {
      if(input.length>2) {
        const res = await fetch(URL_CITY + input)
        const data = await res.json()
        setStreets(data)
      }
      if(streets.length === 1) {
        setSelectStreet(streets[0].id)
        setSelectHouse('')
        setSoDisable(false)
        setCursor('activeCur')
        setInput2('')
      } else {
        setSoDisable(true)
        setInput2('')
        setSelectStreet(null)
      }
    } catch (error) {
      console.log('Error',error.message)
    }
  }

  async function fetchHouse() {
    try {
      
      if(selectStreet) {
        const resHouse = await fetch(URL_HOUSE + input2)
        const dataHouse = await resHouse.json()
        setHouses(dataHouse)
        if(dataHouse.length === 1) {
          setSelectHouse(dataHouse[0].name)
          setGroup(dataHouse[0].group)
          setGroupSch(groups[group-1])
        } else {
          setSelectHouse('')
        }
      }
      
    } catch (error) {
      console.log('Error',error.message)
    }
  }

  const groups = [
    {
      group: 1,
      monday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      thuesday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 01:00',
      wednesday: '06:00 - 10:00 / 15:00 - 19:00',
      thursday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      friday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 01:00',
      saturday: '06:00 - 10:00 / 15:00 - 19:00',
      sunday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00'
    },
    {
      group: 2,
      monday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 01:00',
      thuesday: '06:00 - 10:00 / 15:00 - 19:00',
      wednesday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      thursday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 00:00',
      friday: '06:00 - 10:00 / 15:00 - 19:00',
      saturday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      sunday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 00:00'
    },
    {
      group: 3,
      monday: '06:00 - 10:00 / 15:00 - 19:00',
      thuesday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      wednesday: '03:00 - 07:00 / 12:00 - 16:00/ 21:00 - 01:00',
      thursday: '06:00 - 10:00 / 15:00 - 19:00',
      friday: '00:00 - 04:00 / 09:00 - 13:00 / 18:00 - 22:00',
      saturday: '03:00 - 07:00 / 12:00 - 16:00 / 21:00 - 01:00',
      sunday: '06:00 - 10:00 / 15:00 - 19:00'
    },
  ]

  return (
    <div className="App">
      <div >
      <hr/>
        <h5>Введіть вулицю</h5>
      <label>
       <input style={{width:'270px'}} placeholder={input} value={input} onChange={(e) => setInput(e.target.value)} list="streets" name="streets" />
       
       <datalist  id="streets">
          {streets.map(street => <option  key={street.id}  value={street.name}></option> )}
      </datalist>
      <hr/>
      <h5>Введіть будинок</h5>
       </label>
       <label>
       <input className={cursor} disabled={soDisable} style={{width:'50px'}} placeholder={input2} value={input2} onChange={(e) => setInput2(e.target.value)} list="house" name="house" />
       <datalist  id="house">
          {houses.map(house => <option  key={house.name}  value={house.name}></option> )}
      </datalist>
       </label>
       <br/>
       <hr/>
      {groupSch && <div>
        <h4>Група {group}</h4>
        <br/>
        <div>Графік по Вашому будинку</div>
        <br/>
        <div>Понеділок: {groupSch.monday}</div>
        <br/>
        <div>Вівторок: {groupSch.thuesday}</div>
        <br/>
        <div>Середа: {groupSch.wednesday}</div>
        <br/>
        <div>Четверг: {groupSch.thursday}</div>
        <br/>
        <div>П'ятниця: {groupSch.friday}</div>
        <br/>
        <div>Субота: {groupSch.saturday}</div>
        <br/>
        <div>Неділя: {groupSch.sunday}</div>
        </div>}
        
    </div>
    </div>
  );
}

export default App;
