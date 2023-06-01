import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, addStar} = props
  const {id, appointment, isStarred, slot} = appointmentDetails
  const makeItStarred = () => {
    addStar(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="appointmentItem">
      <div className="appointment-name-star-container">
        <p className="appointment-name">{appointment}</p>
        <button
          className="star-img-btn"
          data-testid="star"
          type="button"
          onClick={makeItStarred}
        >
          <img src={starImg} className="star-img" alt="star" />
        </button>
      </div>
      <p className="appointment-slot">{`Date: ${slot}`}</p>
    </li>
  )
}

export default AppointmentItem
