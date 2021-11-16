from .db import db


class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    ticker = db.Column(db.String(5), nullable=False)
    share = db.Column(db.Integer, nullable=False)
    purchase_price = db.Column(db.Float, nullable=False)

    user = db.relationship("User", back_populates="portfolios")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'ticker': self.ticker,
            'share': self.share,
            'purchase_price': self.purchase_price,
        }
