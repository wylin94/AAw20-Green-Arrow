from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Portfolio, db
from app.forms.Portfolio_Form import NewPortfolioForm


portfolio_routes = Blueprint('portfolios', __name__)


def validation_errors_to_error_messages(validation_errors):
	"""
	Simple function that turns the WTForms validation errors into a simple list
	"""
	errorMessages = []
	for field in validation_errors:
			for error in validation_errors[field]:
					errorMessages.append(f'{field} : {error}')
	return errorMessages


@portfolio_routes.route('/')
def getPortfolios():
	portfolios = Portfolio.query.all()
	return {'portfolios': [portfolio.to_dict() for portfolio in portfolios]}


@portfolio_routes.route('/', methods=['POST'])
def createPortfolio():
	print(1)
	print(request)
	form = NewPortfolioForm()
	print(form)
	print(2)
	form["csrf_token"].data = request.cookies["csrf_token"]
    # Reserve for add Spot form/modal
	print(3)
	if form.validate_on_submit():
		print(4)
		# newPortfolio = Portfolio(
		# 	user_id = request.json['user_id'],
		# 	ticker = form.data['ticker'],
		# 	share = form.data['share'],
		# 	purchase_price = form.data['purchase_price']
		# )
		data = Portfolio()
		form.populate_obj(data)
		db.session.add(data)
		db.session.commit()

		return data.to_dict()

	# else:
		# return form.errors
	return {"errors": validation_errors_to_error_messages(form.errors)}