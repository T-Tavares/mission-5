# Initialize the database
# If DB does not exist this will create our admin user

# Safety clause, will exit the script if the db is set
set -e 

mongosh <<EOF 

use admin
db.auth("$MONGO_INITDB_ROOT_USERNAME" , "$MONGO_INITDB_ROOT_PASSWORD")

use $MONGO_INITDB_DB

db.createUser({
    user: "$MONGO_USER",
    pwd: "$MONGO_PASS",
    roles: [{
        role: "readWrite",
        db: "$MONGO_INITDB_DB"
    }]
})

db.auth($MONGO_USER , $MONGO_PASS)

)
db.createCollection(reports)
db.createCollection(locations)

db.reports.insertOne({
    "report": "Init Data added to report collection. Please delete me."
})

db.locations.insertOne({
    "report": "Init Data added to report collection. Please delete me."
})

EOF

