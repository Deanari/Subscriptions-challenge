import axios from 'axios'
import { useState } from 'react'

export default function SubscriptionCard ({data}) {
  const [edit, setEdit] = useState(false)
  const [info, setInfo] = useState(data)

  function formatDate(raw) {
    let date = new Date(raw)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}` // TODO fix timezone offset 
  }

  const handleEdit = (element) => {
    setEdit(element)
  }

  const handleChange = (e) => {
    let newData = data
    newData[e.target.name] = e.target.value
    setInfo(newData)
  }

  const handleSave = async (type) => {
    const body = {}
    body[type] = info[type]
    try {
      await axios.patch(`http://localhost:3000/api/subscription/${info.id_subscription}`, body)
      const response = await axios.get(`http://localhost:3000/api/subscription/${info.id_subscription}`)
      setInfo(response.data)
      window.alert('updated')
    } catch (error) {
      window.alert(error.response.data.errorMsg)
    }
    setEdit(false)
  }


  return (
    <div className='drop-shadow-lg rounded-md grid grid-cols-2 p-5 my-4 bg-white gap-3'>
      <div>Amount: </div>
        { edit === 'amount' ?
          <div className='flex'>
            <input className='w-5/12 mr-3 h-8' type="number" placeholder={info.amount} id="amount" name='amount' onChange={handleChange} />
            <button onClick={()=> handleSave('amount')}>Save</button>
          </div>
          :
          <div>{info.amount} <span className='text-blue-400 cursor-pointer underline' onClick={()=> handleEdit('amount')}>Edit</span></div>
        }
      <div>Interval: </div>
        { edit === 'interval' ?
          <div className='flex'>
            <select className='w-5/12 mr-3 h-8' name="interval" id="interval" onChange={handleChange} placeholder={info.interval}>
              <option value="monthly">monthly</option>
              <option value="quarterly">quarterly</option>
              <option value="annualy">annualy</option>
            </select>
            <button onClick={()=> handleSave('interval')}>Save</button>
          </div>
          :
          <div>{info.interval} <span className='text-blue-400 cursor-pointer underline' onClick={()=> handleEdit('interval')}>Edit</span></div>
        }
      <div>Next donation: </div>
        { edit === 'next_charge_date' ?
          <div className='flex'>
            <input className='w-5/12 mr-3 h-8' type="datetime-local" placeholder={formatDate(info.next_charge_date)} id="amount" name='next_charge_date' onChange={handleChange} />
            <button onClick={()=> handleSave('next_charge_date')}>Save</button>
          </div>
          :
          <div>{formatDate(info.next_charge_date)} <span className='text-blue-400 cursor-pointer underline' onClick={()=> handleEdit('next_charge_date')}>Edit</span></div>
        }
      <div>Payment method: </div><div>{info.payment_type} ****{info.payment_numbers}</div>
      <div>Total donated: </div><div>${info.total_donated}</div>
    </div>
  )
}
