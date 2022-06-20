import React from "react"
import Footer from "./Footer"

class CalculatorForm extends React.Component {
  state = {
    calculatedAmount: 0,
    invalidForm: false,
  }

  meetingDurationRef = React.createRef()
  amountDesignDirectorsRef = React.createRef()
  amountPrincipalDesignersRef = React.createRef()
  amountStaffDesignersRef = React.createRef()
  amountSeniorDesignersRef = React.createRef()
  amountDesignersRef = React.createRef()
  amountAssociateDesignersRef = React.createRef()

  salaries = {
    directorDesigner: 873500,
    principalDesigner: 545005,
    staffDesigner: 387410,
    seniorDesigner: 305154,
    designer: 214058,
    associateDesigner: 167811,
  }

  calculateSalaryInMinutes = sal => {
    const workingDays = 248 // According to: https://www.timeanddate.com/date/workdays.html?d1=01&m1=01&y1=2022&d2=31&m2=12&y2=2022&ti=on&
    const workingHoursInaDay = 8
    const workingMinutesInAnHour = 60

    let workingMinuteVal =
      sal / workingDays / workingHoursInaDay / workingMinutesInAnHour

    return workingMinuteVal
  }

  validateForm = e => {
    if (this.meetingDurationRef.current.value !== "Select...") {
      console.log(this.meetingDurationRef.current.value)
      console.log("⛔️ The form is valid!")
      e.preventDefault()
      this.calculate(e)
      this.setState({ invalidForm: false })
    } else {
      console.error("⛔️ The form is Invalid!")
      e.preventDefault()
      this.setState({ invalidForm: true })
    }
  }

  calculate = e => {
    // 1. Prevent the form from submitting

    const {
      meetingDurationRef,
      amountDesignDirectorsRef = 0,
      amountPrincipalDesignersRef = 0,
      amountStaffDesignersRef = 0,
      amountSeniorDesignersRef = 0,
      amountDesignersRef = 0,
      amountAssociateDesignersRef = 0,
      salaries,
      calculateSalaryInMinutes,
    } = this

    const meeting = {
      meetingDurationRef: meetingDurationRef.current.value,
      amountDirectorDesigners: amountDesignDirectorsRef.current.value,
      amountPrincipalDesigners: amountPrincipalDesignersRef.current.value,
      amountStaffDesigners: amountStaffDesignersRef.current.value,
      amountSeniorDesigners: amountSeniorDesignersRef.current.value,
      amountDesigners: amountDesignersRef.current.value,
      amountAssociateDesigners: amountAssociateDesignersRef.current.value,
    }

    let salaryInMinutesDirectorDesigner = calculateSalaryInMinutes(
      salaries.directorDesigner
    )
    let salaryInMinutesPrincipalDesigner = calculateSalaryInMinutes(
      salaries.principalDesigner
    )
    let salaryInMinutesStaffDesigner = calculateSalaryInMinutes(
      salaries.staffDesigner
    )
    let salaryInMinutesSeniorDesigner = calculateSalaryInMinutes(
      salaries.seniorDesigner
    )
    let salaryInMinutesDesigner = calculateSalaryInMinutes(salaries.designer)
    let salaryInMinutesAssociateDesigner = calculateSalaryInMinutes(
      salaries.associateDesigner
    )

    let costPerMeetingPerDirectorDesigner =
      salaryInMinutesDirectorDesigner * meeting.meetingDurationRef
    let costPerMeetingPerPrincipalDesigner =
      salaryInMinutesPrincipalDesigner * meeting.meetingDurationRef
    let costPerMeetingPerStaffDesigner =
      salaryInMinutesStaffDesigner * meeting.meetingDurationRef
    let costPerMeetingPerSeniorDesigner =
      salaryInMinutesSeniorDesigner * meeting.meetingDurationRef
    let costPerMeetingPerDesigner =
      salaryInMinutesDesigner * meeting.meetingDurationRef
    let costPerMeetingPerAssociateDesigner =
      salaryInMinutesAssociateDesigner * meeting.meetingDurationRef

    let diretorDesignersCost =
      costPerMeetingPerDirectorDesigner * meeting.amountDirectorDesigners
    let principalDesignersCost =
      costPerMeetingPerPrincipalDesigner * meeting.amountPrincipalDesigners
    let staffDesignersCost =
      costPerMeetingPerStaffDesigner * meeting.amountStaffDesigners
    let seniorDesignersCost =
      costPerMeetingPerSeniorDesigner * meeting.amountSeniorDesigners
    let designersCost = costPerMeetingPerDesigner * meeting.amountDesigners
    let associateDesignersCost =
      costPerMeetingPerAssociateDesigner * meeting.amountAssociateDesigners

    this.setState({
      calculatedAmount:
        diretorDesignersCost +
        principalDesignersCost +
        staffDesignersCost +
        seniorDesignersCost +
        designersCost +
        associateDesignersCost,
    })
  }

  formatDollarAmount = val => {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
  }

  // TODO: Componetize the elements below...

  render() {
    let calculatedCostPerOccurance = this.state.calculatedAmount

    return (
      <form className="app-container" onSubmit={this.validateForm}>
        <div className="amounts-container">
          <label className="og-overline-text-style" htmlFor="meetingCost">
            Meeting Cost
          </label>
          <h1 className="highlighted-offset" id="meetingCost">
            {this.formatDollarAmount(calculatedCostPerOccurance)}
          </h1>
        </div>

        <div className="supporting-amounts-container">
          <div className="supporting-amounts-row">
            <label className="og-caption-text-style" htmlFor="weeklyMeeting">
              Weekly Meeting
            </label>
            <p
              className="og-caption-text-style highlighted-offset"
              id="weeklyMeeting"
            >
              {this.formatDollarAmount(calculatedCostPerOccurance * 52)} / year
            </p>
          </div>

          <div className="supporting-amounts-row">
            <label className="og-caption-text-style" htmlFor="biWeeklyMeeting">
              Biweekly Meeting
            </label>
            <p
              className="og-caption-text-style highlighted-offset"
              id="biWeeklyMeeting"
            >
              {this.formatDollarAmount(calculatedCostPerOccurance * 26)} / year
            </p>
          </div>
        </div>

        <div
          className="participant-row"
          style={{ borderBottom: 0, padding: 0 }}
        >
          <div className="og-input-select-container">
            <label
              className="og-input-label og-body2-text-style"
              htmlFor="meetingDuration"
            >
              Meeting Duration
            </label>
            <div className="og-input-select-input-container">
              <select
                label="Meeting Duration"
                ref={this.meetingDurationRef}
                id="meetingDuration"
                className="og-input-field og-body1-text-style"
              >
                <option defaultValue>Select...</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
              <span>
                <i className="material-icons og-icon-small">
                  keyboard_arrow_down
                </i>
              </span>
            </div>
          </div>
        </div>

        {this.state.invalidForm ? (
          <p className="error-message">
            <span role="img" aria-label="">
              ⛔️
            </span>{" "}
            You forgot to choose the meeting duration...
          </p>
        ) : (
          ""
        )}

        <div className="participants-input-container">
          <div className="participant-row">
            <label
              className="og-overline-text-style "
              htmlFor="amountDesignDirectorsRef"
            >
              Design Director
            </label>
            <input
              className="og-input-field "
              id="amountDesignDirectorsRef"
              placeholder="Number"
              type="number"
              ref={this.amountDesignDirectorsRef}
            />
          </div>

          <div className="participant-row">
            <label
              className="og-overline-text-style"
              htmlFor="amountPrincipalDesignersRef"
            >
              Principal Designers
            </label>
            <input
              className="og-input-field"
              id="amountPrincipalDesignersRef"
              placeholder="Number"
              type="number"
              ref={this.amountPrincipalDesignersRef}
            />
          </div>

          <div className="participant-row">
            <label
              className="og-overline-text-style"
              htmlFor="amountStaffDesignersRef"
            >
              Staff Designers
            </label>

            <input
              className="og-input-field  "
              id="amountStaffDesignersRef"
              type="number"
              placeholder="Number"
              ref={this.amountStaffDesignersRef}
            />
          </div>

          <div className="participant-row">
            <label
              className="og-overline-text-style "
              htmlFor="amountSeniorDesignersRef"
            >
              Senior Designers
            </label>

            <input
              className="og-input-field  "
              id="amountSeniorDesignersRef"
              type="number"
              placeholder="Number"
              ref={this.amountSeniorDesignersRef}
            />
          </div>

          <div className="participant-row">
            <label
              className="og-overline-text-style "
              htmlFor="amountDesignersRef"
            >
              Designers
            </label>
            <input
              className="og-input-field"
              id="amountDesignersRef"
              type="number"
              placeholder="Number"
              ref={this.amountDesignersRef}
            />
          </div>

          <div className="participant-row" style={{ borderBottom: 0 }}>
            <label
              className="og-overline-text-style "
              htmlFor="amountAssociateDesignersRef"
            >
              Associate Designers
            </label>

            <input
              className="og-input-field "
              id="amountAssociateDesignersRef"
              type="number"
              placeholder="Number"
              ref={this.amountAssociateDesignersRef}
            />
          </div>
        </div>

        <button
          className="og-button--primary og-button--medium og-button og-button--fluid"
          style={{
            width: `100%`,
            margin: `40px 0 `,
            float: `right`,
          }}
          type="submit"
          value="Submit"
        >
          Calculate
        </button>

        <Footer />
      </form>
    )
  }
}

export default CalculatorForm
