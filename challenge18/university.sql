CREATE TABLE login(
    nim VARCHAR(10) NOT NULL PRIMARY KEY,
    username VARCHAR(12) NOT NULL,
    password VARCHAR(12) NOT NULL,
    access_level VARCHAR (8) NULL,
    FOREIGN KEY (nim)
        REFERENCES mahasiswa (nim)
);

INSERT INTO login (
    nim, username, password, access_level
)
VALUES (
    'M111', 'mulkyasa', 'yasamulky', 'ADMIN'
),
(
    'M112', 'romiagung', 'agungromi', 'USER'
),
(
    'M113', 'ekoprasetyo', 'setyoeko', 'USER'
);