// Write your code here
// Write your code here
import React from 'react'
import './index.css'

class AppointmentItem extends React.Component {
  toggleStar = () => {
    const {toggleStarItem, appointmentItem} = this.props
    const {id} = appointmentItem
    toggleStarItem(id)
  }

  formatDate = formatdate => {
    const d = new Date(formatdate)
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const date = d.getDate()
    const month = months[d.getMonth()]
    const year = d.getFullYear()
    const day = days[d.getDay()]

    return `${date} ${month} ${year},${day}`
  }

  render() {
    const {appointmentItem} = this.props
    const {AppointmentTitle, AppointmentDate, isStarred} = appointmentItem
    const imgUrl = isStarred
      ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

    return (
      <li className="appointment-item">
        <div className="appointment-title-date-container">
          <p className="appointment-title">{AppointmentTitle}</p>
          <button
            data-testid="star"
            className="starred-icon-btn"
            type="button"
            onClick={this.toggleStar}
          >
            <img className="starred-icon" src={imgUrl} alt="star" />
          </button>
        </div>
        <p className="appointment-date">
          Date: {this.formatDate(AppointmentDate)}
        </p>
      </li>
    )
  }
}

export default AppointmentItem
