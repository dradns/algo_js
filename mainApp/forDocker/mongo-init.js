db.createUser(
    {
        user: "specAdmin",
        pwd: "specPassword",
        roles: [
            {
                role: "readWrite",
                db: "myDatabase"
            }
        ]
    }
);