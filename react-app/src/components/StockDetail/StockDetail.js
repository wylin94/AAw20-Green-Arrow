import './StockDetail.css'

function StockDetail() {
	return(
		<div className='sdWrapper'>
			<div className='sdContainer'>


				<div className='sdStockFeed'>

					<div className='sdGraphSection'>
						<div className='sdGraphBalance'>
							<div>Stock Name</div>
							<div>Stock Price</div>
							<div>today's change</div>
						</div>
						<div className='sdStockGraph'>
							{/* <Graph /> */}
						</div>
					</div>
					
					<div className='sdNewsSection'>
					</div>

				</div>


				<div className='sdOrder'>

				</div>







			</div>
		</div>

	)
}

export default StockDetail;