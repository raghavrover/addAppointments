import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointment: '',
    slot: '',
    appointmentsList: [],
    isStarBtnActive: false,
  }

  addAppointment = event => {
    event.preventDefault()
    const {appointment, slot, appointmentsList} = this.state
    if (appointment === '' || slot === '') {
      return
    }
    const dateSlot = new Date(slot)
    const formattedSlot = format(dateSlot, 'dd MMMM yyyy, EEEE')
    const appointmentObject = {
      id: uuidv4(),
      appointment,
      slot: formattedSlot,
      isStarred: false,
    }

    this.setState({
      appointmentsList: [...appointmentsList, appointmentObject],
    })

    this.setState({appointment: '', slot: ''})
  }

  getAppointment = event => {
    this.setState({appointment: event.target.value})
  }

  getAppointmentSlot = event => {
    this.setState({slot: event.target.value})
  }

  addStar = id => {
    const {appointmentsList} = this.state
    const newAppointmentsList = appointmentsList.map(eachAppointment => {
      if (eachAppointment.id === id) {
        return {...eachAppointment, isStarred: !eachAppointment.isStarred}
      }
      return eachAppointment
    })
    this.setState({
      appointmentsList: [...newAppointmentsList],
    })
  }

  toggleStarredBtn = () => {
    this.setState(prevState => ({
      isStarBtnActive: !prevState.isStarBtnActive,
    }))
  }

  getStarredAppointments = () => {
    const {appointmentsList} = this.state
    const newAppointmentsList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    return newAppointmentsList
  }

  render() {
    const {appointment, slot, appointmentsList, isStarBtnActive} = this.state
    const tempAppointmentObject = isStarBtnActive
      ? {
          currentAppointmentsList: this.getStarredAppointments(),
          starredBtn: 'active-starred-btn',
        }
      : {currentAppointmentsList: appointmentsList, starredBtn: ''}

    const {currentAppointmentsList, starredBtn} = tempAppointmentObject
    return (
      <div className="appointments-bg-container">
        <div className="appointments-card">
          <div className="add-appointment-container">
            <form
              className="add-appointments-card"
              onSubmit={this.addAppointment}
            >
              <h1 className="title">Add Appointment</h1>
              <div className="appointment-input-container">
                <label className="title-label" htmlFor="appointmentTitle">
                  TITLE
                </label>
                <input
                  type="text"
                  id="appointmentTitle"
                  placeholder="Title"
                  className="appointment-input"
                  onChange={this.getAppointment}
                  value={appointment}
                />
              </div>
              <div className="appointment-input-container">
                <label className="title-label" htmlFor="appointmentSlot">
                  Date
                </label>
                <input
                  type="date"
                  id="appointmentSlot"
                  className="date-input"
                  onChange={this.getAppointmentSlot}
                  value={slot}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-img"
              alt="appointments"
            />
          </div>
          <div className="appointments-header">
            <h1 className="appointments-title">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${starredBtn}`}
              onClick={this.toggleStarredBtn}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {currentAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                appointmentDetails={eachAppointment}
                key={eachAppointment.id}
                addStar={this.addStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
