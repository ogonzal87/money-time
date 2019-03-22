import React from 'react'
import { DSButton } from "oskrhq-design-system";

class CalculatorForm extends React.Component {
	state = {
		calculatedAmount: 0
	}

	meetingDurationRef = React.createRef()
	amountDesignDirectorsRef = React.createRef()
	amountPrincipalDesignersRef = React.createRef()
	amountStaffDesignersRef = React.createRef()
	amountSeniorDesignersRef = React.createRef()
	amountDesignersRef = React.createRef()
	amountAssociateDesignersRef = React.createRef()

	salaries = {
		directorDesigner: 250000,
		principalDesigner: 200000,
		staffDesigner: 185000,
		seniorDesigner: 160000,
		designer: 145000,
		associateDesigner: 122500
	}

	calculateSalaryInMinutes = (sal) => {
		let month = sal / 12
		let week = month / 4
		let day = week / 5
		let hour = day / 8
		let minute = hour / 60
		return minute
	}

	calculate = (e) => {
		// 1. Prevent the form from submitting 
		e.preventDefault()

		const {
			meetingDurationRef,
			amountDesignDirectorsRef = 0,
			amountPrincipalDesignersRef = 0,
			amountStaffDesignersRef = 0,
			amountSeniorDesignersRef = 0,
			amountDesignersRef = 0,
			amountAssociateDesignersRef = 0,
			salaries,
			calculateSalaryInMinutes
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

		let salaryInMinutesDirectorDesigner = calculateSalaryInMinutes(salaries.directorDesigner)
		let salaryInMinutesPrincipalDesigner = calculateSalaryInMinutes(salaries.principalDesigner)
		let salaryInMinutesStaffDesigner = calculateSalaryInMinutes(salaries.staffDesigner)
		let salaryInMinutesSeniorDesigner = calculateSalaryInMinutes(salaries.seniorDesigner)
		let salaryInMinutesDesigner = calculateSalaryInMinutes(salaries.designer)
		let salaryInMinutesAssociateDesigner = calculateSalaryInMinutes(salaries.associateDesigner)

		let costPerMeetingPerDirectorDesigner = salaryInMinutesDirectorDesigner * meeting.meetingDurationRef
		let costPerMeetingPerPrincipalDesigner = salaryInMinutesPrincipalDesigner * meeting.meetingDurationRef
		let costPerMeetingPerStaffDesigner = salaryInMinutesStaffDesigner * meeting.meetingDurationRef
		let costPerMeetingPerSeniorDesigner = salaryInMinutesSeniorDesigner * meeting.meetingDurationRef
		let costPerMeetingPerDesigner = salaryInMinutesDesigner * meeting.meetingDurationRef
		let costPerMeetingPerAssociateDesigner = salaryInMinutesAssociateDesigner * meeting.meetingDurationRef

		let diretorDesignersCost = (costPerMeetingPerDirectorDesigner * meeting.amountDirectorDesigners)
		let principalDesignersCost = (costPerMeetingPerPrincipalDesigner * meeting.amountPrincipalDesigners)
		let staffDesignersCost = (costPerMeetingPerStaffDesigner * meeting.amountStaffDesigners)
		let seniorDesignersCost = (costPerMeetingPerSeniorDesigner * meeting.amountSeniorDesigners)
		let designersCost = (costPerMeetingPerDesigner * meeting.amountDesigners)
		let associateDesignersCost = (costPerMeetingPerAssociateDesigner * meeting.amountAssociateDesigners)

		this.setState({
			calculatedAmount:
				diretorDesignersCost +
				principalDesignersCost +
				staffDesignersCost +
				seniorDesignersCost +
				designersCost +
				associateDesignersCost
		})
	}

	formatDollarAmount = (val) => {
		return val.toLocaleString("en-US", {
			style: "currency",
			currency: "USD"
		})
	}

	// TODO: Componetize the elements below...

	render() {
		let calculatedCostPerOccurance = this.state.calculatedAmount

		return (
			<form className="app-container" onSubmit={this.calculate}>

				<div className="amounts-container">
					<label className="ds-overline-text-style">Meeting Cost</label>
					<h1>{this.formatDollarAmount(calculatedCostPerOccurance)}</h1>
				</div>

				<div className="supporting-amounts-container">
					<div className="supporting-amounts-row">
						<label className="ds-caption-text-style">Weekly Meeting</label>
						<p className="ds-caption-text-style">{this.formatDollarAmount(calculatedCostPerOccurance * 52)} / year</p>
					</div>

					<div className="supporting-amounts-row">
						<label className="ds-caption-text-style">Biweekly Meeting</label>
						<p className="ds-caption-text-style">{this.formatDollarAmount(calculatedCostPerOccurance * 26)} / year</p>
					</div>
				</div>

				<div className="participant-row">
					<div className="ds-input-select-container">
						<label className="ds-input-label ds-body2-text-style">Meeting Duration</label>
						<select
							label="Meeting Duration"
							ref={this.meetingDurationRef}
							name="meetingDuration"
							className="ds-input-field ds-body1-text-style"
						>
							<option defaultValue>Select...</option>
							<option value="15">15 minutes</option>
							<option value="30">30 minutes</option>
							<option value="60">1 hour</option>
							<option value="90">1.5 hours</option>
							<option value="120">2 hours</option>
						</select>
						<span>
							<i className="material-icons ds-icon-small ds-select-chevron-down">keyboard_arrow_down</i>
						</span>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Design Director/Manager</p>
					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							placeholder="Number"
							type="number"
							ref={this.amountDesignDirectorsRef}
						/>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Principal Designers</p>
					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							placeholder="Number"
							type="number"
							ref={this.amountPrincipalDesignersRef}
						/>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Staff Designers</p>

					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							type="number"
							placeholder="Number"
							ref={this.amountStaffDesignersRef}
						/>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Senior Designers</p>

					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							type="number"
							placeholder="Number"
							ref={this.amountSeniorDesignersRef}
						/>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Designers</p>

					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							type="number"
							placeholder="Number"
							ref={this.amountDesignersRef}
						/>
					</div>
				</div>

				<div className="participant-row">
					<p className="ds-overline-text-style">Associate Designers</p>

					<div className="ds-input-text-container">
						<input
							className="ds-input-field "
							name="participantAmount"
							type="number"
							placeholder="Number"
							ref={this.amountAssociateDesignersRef}
						/>
					</div>
				</div>

				<div style={{
					width: `100%`,
					margin: `40px 0 `,
					float: `right`
				}}>
					<DSButton
						type="primary"
						size="fluid">
						Calculate
          </DSButton>
				</div>

				<p className="calculator-disclaimer-text">* These are estimates based on average salaries in the Bay Area and do not reflect the opportunity costs incurred by attending each meeting or other variables. For recreational purposes only and should not be used to discourage meetings but rather to be mindful of their purpose and other people’s time. Time = <span role="img" aria-labelledby="money">💵</span> and the users we design for end up paying for it one way or another.</p>

				<p className="calculator-disclaimer-text">Built using <a href="https://oskrhq-ds.surge.sh" target="_blank" rel="noopener noreferrer">OSKRHQ.DS</a>.</p>

			</form >
		)
	}
}

export default CalculatorForm