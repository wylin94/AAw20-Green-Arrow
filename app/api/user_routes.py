from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db
from app.s3_helpers import (
	upload_file_to_s3, allowed_file, get_unique_filename)

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


@user_routes.route("/<int:user_id>/profile_image", methods=["PATCH"])
@login_required
def upload_image(user_id):
	if "image" not in request.files:
		return {"errors": "image required"}, 400
	image = request.files["image"]
	if not allowed_file(image.filename):
		return {"errors": "file type not permitted"}, 400
	image.filename = get_unique_filename(image.filename)
	upload = upload_file_to_s3(image)
	if "url" not in upload:
		return upload, 400
	url = upload["url"]
	editUser = User.query.get(user_id)
	editUser.profile_image = url
	db.session.commit()
	return editUser.to_dict()
