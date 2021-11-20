from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError


class WatchlistForm(FlaskForm):
	user_id = IntegerField('user_id', validators=[DataRequired()])
	ticker = StringField('ticker', validators=[DataRequired()])
