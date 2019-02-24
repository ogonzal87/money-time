import React from 'react'
import { DSButton } from "oskrhq-design-system";


class CalculatorForm extends React.Component {
	state = {
		calculatedAmount: 0
	}

	meetingDurationRef = React.createRef()
	amountPrincipalDesignersRef = React.createRef()
	amountStaffDesignersRef = React.createRef()
	amountSeniorDesignersRef = React.createRef()
	amountDesignersRef = React.createRef()
	amountAssociateDesignersRef = React.createRef()

	salaries = {
		principalDesigner: 190000,
		staffDesigner: 180000,
		seniorDesigner: 160000,
		designer: 130000,
		associateDesigner: 90000
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
			amountPrincipalDesignersRef = 0,
			amountStaffDesignersRef = 0,
			amountSeniorDesignersRef = 0,
			amountDesignersRef = 0,
			amountAssociateDesignersRef = 0 } = this

		const meeting = {
			meetingDurationRef: meetingDurationRef.current.value,
			amountPrincipalDesigners: amountPrincipalDesignersRef.current.value,
			amountStaffDesigners: amountStaffDesignersRef.current.value,
			amountSeniorDesigners: amountSeniorDesignersRef.current.value,
			amountDesigners: amountDesignersRef.current.value,
			amountAssociateDesigners: amountAssociateDesignersRef.current.value,
		}

		let salaryInMinutesPrincipalDesigner = this.calculateSalaryInMinutes(this.salaries.principalDesigner)
		let salaryInMinutesStaffDesigner = this.calculateSalaryInMinutes(this.salaries.staffDesigner)
		let salaryInMinutesSeniorDesigner = this.calculateSalaryInMinutes(this.salaries.seniorDesigner)
		let salaryInMinutesDesigner = this.calculateSalaryInMinutes(this.salaries.designer)
		let salaryInMinutesAssociateDesigner = this.calculateSalaryInMinutes(this.salaries.associateDesigner)
		let costPerMeetingPerPrincipalDesigner = salaryInMinutesPrincipalDesigner * meeting.meetingDurationRef
		let costPerMeetingPerStaffDesigner = salaryInMinutesStaffDesigner * meeting.meetingDurationRef
		let costPerMeetingPerSeniorDesigner = salaryInMinutesSeniorDesigner * meeting.meetingDurationRef
		let costPerMeetingPerDesigner = salaryInMinutesDesigner * meeting.meetingDurationRef
		let costPerMeetingPerAssociateDesigner = salaryInMinutesAssociateDesigner * meeting.meetingDurationRef


		let principalDesignersCost = (costPerMeetingPerPrincipalDesigner * meeting.amountPrincipalDesigners)
		let staffDesignersCost = (costPerMeetingPerStaffDesigner * meeting.amountStaffDesigners)
		let seniorDesignersCost = (costPerMeetingPerSeniorDesigner * meeting.amountSeniorDesigners)
		let designersCost = (costPerMeetingPerDesigner * meeting.amountDesigners)
		let associateDesignersCost = (costPerMeetingPerAssociateDesigner * meeting.amountAssociateDesigners)

		this.setState({
			calculatedAmount: principalDesignersCost +
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
					margin: `40px 0 0 0 `,
					float: `right`
				}}>
					<DSButton
						type="primary"
						size="fluid">
						Calculate
          </DSButton>
				</div>

			</form>
		)
	}
}

export default CalculatorForm