from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String(5), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    share = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime(), nullable=False)
    updated_at = db.Column(db.DateTime(), nullable=False)

    user = db.relationship("User", back_populates="transactions")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'ticker': self.ticker,
            'type': self.type,
            'share': self.share,
            'price': self.price,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
