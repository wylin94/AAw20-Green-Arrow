from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    # demo = User(
    #     username='Demo', 
    #     email='demo@aa.io', 
    #     password='password', 
    #     buying_power=100000)

    bernieMadoff = User(
        username='Bernie Madoff',
        email='bernieMadoff@berniemadoffinvestmentsecurities.com',
        password='password',
        buying_power=2,
        profile_image='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-BernieMadoff.jpeg',
        motto='The whole government is a Ponzi scheme!',
    )

    elonMusk = User(
        username='Elon Musk',
        email='elonmusk@tesla.com',
        password='password',
        buying_power=87013452,
        profile_image='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-ElonMusk.jpg',
        motto='Am considering taking Tesla private at $420. Funding secured.',
    )

    jordanBelfort = User(
        username='Jordan Belfort', 
        email='jordanbelfort@wolfofwallstreet.com', 
        password='password', 
        buying_power=75315345, 
        profile_image='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-JordanBelfort.jpeg',
        motto='Sell me this pen',
    )

    warrentBuffett = User(
        username='Warren Buffett', 
        email='warrenbuffett@berkshirehathaway.com', 
        password='password', 
        buying_power=95450664,
        profile_image='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WarrenBuffett.jpeg',
        motto='It’s far better to buy a wonderful company at a fair price, than a fair company at a wonderful price.',
    )

    wallStreetBets = User(
        username='WallStreetBets',
        email='WallStreetBets@reddit.com',
        password='password',
        buying_power=11273993,
        profile_image='https://wyl-greenarrow.s3.us-west-1.amazonaws.com/profile-WallStreetBets.jpg',
        motto='Send Robinhood to the ground and GME to the moon!',
    )
    
    # db.session.add(demo)
    db.session.add(bernieMadoff)
    db.session.add(elonMusk)
    db.session.add(jordanBelfort)
    db.session.add(warrentBuffett)
    db.session.add(wallStreetBets)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


# file_template = % % (year)d % %(month).2d % %(day).2d_ % %(hour).2d % %(minute).2d % %(second).2d_ % %(slug)s
