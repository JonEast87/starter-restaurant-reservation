import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { listTables, updateTable, readReservation } from '../../utils/api'
import ErrorAlert from '../../layout/ErrorAlert'

function Seat() {
	const { reservation_id } = useParams()
	const history = useHistory()
	const [assignTableError, setAssignTableError] = useState(null)

	const [allTables, setAllTables] = useState([])
	const [allTablesError, setAllTablesError] = useState(null)

	const [formData, setFormData] = useState({ table_id: null })

	const [reservationDetails, setReservationDetails] = useState([])
	const [reservationError, setReservationError] = useState(null)

	useEffect(() => {
		const abortController = new AbortController()
		setAllTablesError(null)

		listTables(abortController.signal)
			.then(setAllTables)
			.catch(setAllTablesError)

		return () => abortController.abort()
	}, [])

	useEffect(() => {
		const abortController = new AbortController()
		setReservationError(null)

		readReservation(reservation_id, abortController.signal)
			.then(setReservationDetails)
			.catch(setAssignTableError)

		return () => abortController.abort()
	}, [reservation_id])

	const handleSubmit = (event) => {
		event.preventDefault()
		const abortController = new AbortController()

		setAssignTableError(null)
		console.log(formData.table_id)
		updateTable(reservation_id, formData.table_id, abortController.signal)
			.then(() => history.push('/dashboard'))
			.catch(setAssignTableError)

		return () => abortController.abort()
	}

	const handleCancel = (event) => {
		event.preventDefault()
		history.goBack()
	}

	return (
		<section>
			<h1>Assign Party of {reservationDetails.people} to a Table </h1>
			<ErrorAlert error={allTablesError} />
			<ErrorAlert error={reservationError} />
			<form onSubmit={handleSubmit}>
				<label htmlFor='table_id'>Table: </label>
				<select
					name='table_id'
					onChange={(e) => setFormData({ [e.target.name]: e.target.value })}
					required={true}>
					<option defaultValue>Table - Capacity</option>
					{allTables.map(({ table_id, table_name, capacity }) => (
						<option key={table_id} value={table_id}>
							{table_name} - {capacity}
						</option>
					))}
				</select>

				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
				<button
					type='button'
					className='btn btn-light'
					value='Cancel'
					onClick={handleCancel}>
					Cancel
				</button>
			</form>
			<ErrorAlert error={assignTableError} />
		</section>
	)
}

export default Seat
