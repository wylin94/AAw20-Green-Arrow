from app.models import db, Portfolio


def seed_portfolios():
    portfolio1 = Portfolio(
        user_id=1, ticker='appl', share=10, purchase_price=150.93)

    db.session.add(portfolio1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_portfolios():
    db.session.execute('TRUNCATE portfolios RESTART IDENTITY CASCADE;')
    db.session.commit()
