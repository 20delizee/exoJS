import { pool } from '../config/database.js';

async function getAllStudents() {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'SELECT * FROM etudiant';
    const rows = await conn.query(query);
    return rows;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des étudiants: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function insertStudent(studentData) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      INSERT INTO etudiant 
      (etudiant_num_carte_identite, etudiant_nom, etudiant_prenom, etudiant_email, 
       etudiant_annees_experience, etudiant_telephone, etudiant_adresse_ligne_1, 
       etudiant_adresse_ligne_2, etudiant_code_postal, etudiant_ville, 
       etudiant_niveau_etudes, tuteur_Id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await conn.query(query, [
      studentData.etudiant_num_carte_identite,
      studentData.etudiant_nom,
      studentData.etudiant_prenom,
      studentData.etudiant_email,
      studentData.etudiant_annees_experience || null,
      studentData.etudiant_telephone || null,
      studentData.etudiant_adresse_ligne_1 || null,
      studentData.etudiant_adresse_ligne_2 || null,
      studentData.etudiant_code_postal || null,
      studentData.etudiant_ville || null,
      studentData.etudiant_niveau_etudes || null,
      studentData.tuteur_Id
    ]);

    return {
      id: Number(result.insertId),
      affectedRows: result.affectedRows
    };
  } catch (err) {
    throw new Error(`Erreur lors de l'insertion de l'étudiant: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function getStudentById(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = 'SELECT * FROM etudiant WHERE etudiant_Id = ?';
    const rows = await conn.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération de l'étudiant: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function updateStudent(id, studentData) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      UPDATE etudiant SET 
      etudiant_num_carte_identite = ?, 
      etudiant_nom = ?, 
      etudiant_prenom = ?, 
      etudiant_email = ?,
      etudiant_annees_experience = ?,
      etudiant_telephone = ?,
      etudiant_adresse_ligne_1 = ?,
      etudiant_adresse_ligne_2 = ?,
      etudiant_code_postal = ?,
      etudiant_ville = ?,
      etudiant_niveau_etudes = ?,
      tuteur_Id = ?
      WHERE etudiant_Id = ?
    `;

    const result = await conn.query(query, [
      studentData.etudiant_num_carte_identite,
      studentData.etudiant_nom,
      studentData.etudiant_prenom,
      studentData.etudiant_email,
      studentData.etudiant_annees_experience || null,
      studentData.etudiant_telephone || null,
      studentData.etudiant_adresse_ligne_1 || null,
      studentData.etudiant_adresse_ligne_2 || null,
      studentData.etudiant_code_postal || null,
      studentData.etudiant_ville || null,
      studentData.etudiant_niveau_etudes || null,
      studentData.tuteur_Id,
      id
    ]);

    return {
      affectedRows: result.affectedRows
    };
  } catch (err) {
    throw new Error(`Erreur lors de la mise à jour de l'étudiant: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function getStudentsInCours() {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `
      SELECT 
        e.etudiant_Id,
        e.etudiant_nom,
        e.etudiant_prenom,
        e.etudiant_email,
        c.cours_Id,
        c.cours_thematique,
        c.cours_numero_semaine,
        c.cours_total_heures_semaine,
        a.assister_present,
        a.assister_date,
        d.discipline_libelle
      FROM etudiant e
      INNER JOIN assister a ON e.etudiant_Id = a.etudiant_Id
      INNER JOIN cours c ON a.cours_Id = c.cours_Id
      LEFT JOIN discipline d ON c.discipline_Id = d.discipline_Id
      ORDER BY e.etudiant_nom, e.etudiant_prenom, c.cours_numero_semaine
    `;
    const rows = await conn.query(query);
    return rows;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des étudiants inscrits: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

export {
  getAllStudents,
  insertStudent,
  getStudentById,
  updateStudent,
  getStudentsInCours
};