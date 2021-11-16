from app.models import db, Transaction
from datetime import datetime


def seed_transactions():
    transaction1 = Transaction(
        user_id=1, ticker='appl', type='buy', share=10, price=150.93, created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(transaction1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
