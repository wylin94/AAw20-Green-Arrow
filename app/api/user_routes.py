from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:user_id>/buyingpower', methods=['PATCH'])
def editBuyingPower(user_id):
    editUser = User.query.get(user_id)
    editUser.buying_power = request.json
    db.session.commit()
    return editUser.to_dict()