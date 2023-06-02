import React from 'react'
import './index.css'
import {v4 as uuid} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends React.Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentLists: localStorage.getItem('appointmentsLists')
      ? JSON.parse(localStorage.getItem('appointmentsLists'))
      : [],
    isStarredButtonActive: false,
  }

  setTitle = event => this.setState({titleInput: event.target.value})

  setDate = event => this.setState({dateInput: event.target.value})

  toggleStarItem = id => {
    this.setState(prevState => {
      const updatedAppointmentStarredList = prevState.appointmentLists.map(
        obj => {
          if (obj.id === id) {
            return {...obj, isStarred: !obj.isStarred}
          }
          return obj
        },
      )
      return {appointmentLists: updatedAppointmentStarredList}
    })
  }

  toggleDisplayStarredItems = () =>
    this.setState(prevState => ({
      isStarredButtonActive: !prevState.isStarredButtonActive,
    }))

  onSubmit = () => {
    const {titleInput, dateInput} = this.state
    this.setState(prevState => {
      const appointmentList = {
        id: uuid(),
        AppointmentTitle: titleInput,
        AppointmentDate: dateInput,
        isStarred: false,
      }

      const updatedAppointmentsList = [
        ...prevState.appointmentLists,
        appointmentList,
      ]
      return {appointmentLists: updatedAppointmentsList}
    })
  }

  render() {
    const {appointmentLists, isStarredButtonActive} = this.state
    localStorage.setItem('appointmentsLists', JSON.stringify(appointmentLists))
    const filteredStarredItem = appointmentLists.filter(obj => obj.isStarred)
    const displayItems = isStarredButtonActive
      ? filteredStarredItem
      : appointmentLists

    return (
      <div className="container">
        <div className="appointments-container">
          <div className="form-img-container">
            <div className="form-container">
              <h1 className="heading  heading-color">Add Appointment</h1>

              <div className="title-container">
                <label htmlFor="titleInput">Title</label>
                <input
                  type="text"
                  id="titleInput"
                  className="title-input"
                  placeholder="Title"
                  onChange={this.setTitle}
                />
              </div>

              <div className="date-container">
                <label htmlFor="dateInput">DATE</label>
                <input
                  className="date-input"
                  type="date"
                  id="dateInput"
                  onChange={this.setDate}
                />
              </div>
              <button className="addBtn" type="button" onClick={this.onSubmit}>
                Add
              </button>
            </div>
            <div className="img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointments-img"
              />
            </div>
          </div>
          <div className="display-appointments">
            <div className="appointment-title-container">
              <p className="heading-color">Appointments</p>
              <button
                className={`starred-btn ${
                  isStarredButtonActive && 'active-starred-btn'
                }`}
                type="button"
                onClick={this.toggleDisplayStarredItems}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-items">
              {displayItems.map(obj => (
                <AppointmentItem
                  key={obj.id}
                  appointmentItem={obj}
                  toggleStarItem={this.toggleStarItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
