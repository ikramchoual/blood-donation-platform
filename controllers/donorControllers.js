const db=require('../config/db');


const addDonor = (req, res) => {
    const {
        first_name,
        last_name,
        blood_type,
        telephon,
        email,
        password,
        location,
        date_of_birth,
        available
    } = req.body;

    const query = `
        INSERT INTO donors
        (first_name, last_name, blood_type, telephon, email, password, location, date_of_birth, available)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query,
        [first_name, last_name, blood_type, telephon, email, password, location, date_of_birth, available],
        (err, result) => {
           if (err) {
    return res.status(500).json({
        message: "Error adding donor",
    });
}
            res.status(201).json({ message: 'Donor added successfully', id: result.insertId });
        }
    );
};

const updateDonor = (req, res) => {
    const { id } = req.params;

    const {
        first_name,
        last_name,
        blood_type,
        telephon,
        email,
        password,
        location,
        date_of_birth,
        available
    } = req.body;

    const query = `
        UPDATE donors 
        SET first_name=?, last_name=?, blood_type=?, telephon=?, email=?, password=?, location=?, date_of_birth=?,
        available=? 
         WHERE id=?
    `;

    db.query(query,
        [first_name, last_name, blood_type, telephon, email, password, location, date_of_birth, available, id],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error updating donor" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Donor not found" });
            }

            res.json({ message: "Donor updated successfully" });
        }
    );
};

function deleteDonor(req, res) {
    const donorId = req.params.id;

    const sql = "DELETE FROM donors WHERE id = ?";

    db.query(sql, [donorId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Server error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Donor not found" });
        }

        return res.json({ message: "Account deleted successfully" });
    });
}

module.exports = { deleteDonor, addDonor, updateDonor };