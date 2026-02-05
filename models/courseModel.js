import { pool } from "../config/database.js";

async function getAllCours() {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = "SELECT * FROM cours";
    const rows = await conn.query(query);
    return rows;
  } catch (err) {
    throw new Error(`Erreur lors de la récupération des cours: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function insertCours(courseData) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `INSERT INTO cours 
        (cours_numero_semaine, cours_thematique, cours_taux_horaire, 
        cours_total_heures_semaine, discipline_Id, intervenant_siret, salle_Id) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result = await conn.query(query, [
      courseData.cours_numero_semaine || null,
      courseData.cours_thematique || null,
      courseData.cours_taux_horaire || null,
      courseData.cours_total_heures_semaine || null,
      courseData.discipline_Id,
      courseData.intervenant_siret,
      courseData.salle_Id,
    ]);
    return {
      id: Number(result.insertId),
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    throw new Error(`Erreur lors de l'insertion du cours: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function getCoursById(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = "SELECT * FROM cours WHERE cours_Id = ?";
    const rows = await conn.query(query, [id]);
  } catch (err) {
    throw new Error(`Erreur lors de la récupération du cours: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

async function updateCours(id, courseData) {
  let conn;
  try {
    conn = await pool.getConnection();
    const query = `UPDATE cours SET 
        cours_numero_semaine = ?, 
        cours_thematique = ?, 
        cours_taux_horaire = ?, 
        cours_total_heures_semaine = ?,
        discipline_Id = ?,
        intervenant_siret = ?,
        salle_Id = ?
        WHERE cours_Id = ?`;

    const result = await conn.query(query, [
      courseData.cours_numero_semaine || null,
      courseData.cours_thematique || null,
      courseData.cours_taux_horaire || null,
      courseData.cours_total_heures_semaine || null,
      courseData.discipline_Id,
      courseData.intervenant_siret,
      courseData.salle_Id,
      id,
    ]);
    return {
      affectedRows: result.affectedRows,
    };
  } catch (err) {
    throw new Error(`Erreur lors de la mise à jour du cours: ${err.message}`);
  } finally {
    if (conn) conn.release();
  }
}

export { getAllCours, insertCours, getCoursById, updateCours };
