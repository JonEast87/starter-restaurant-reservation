import React from 'react'
import Form from '../form/Form'

function New() {
	return (
		<section>
			<div className='d-md-flex mb-3'>
				<h1 className='mb-0'>Make a Reservation</h1>
			</div>
			<Form method={'POST'} />
		</section>
	)
}

export default New
