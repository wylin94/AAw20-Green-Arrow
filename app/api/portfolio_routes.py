from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Portfolio

portfolio_routes = Blueprint('portfolios', __name__)


@portfolio_routes.route('/')
def portfolios():
	portfolios = Portfolio.query.all()
	return {'portfolios': [portfolio.to_dict() for portfolio in portfolios]}


