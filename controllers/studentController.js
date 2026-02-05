import * as studentModel from "../models/studentModel.js";

async function getAllStudents(req, res) {
  try {
    const students = await studentModel.getAllStudents();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


async function createStudent(req, res) {
  try {
    const {
      etudiant_num_carte_identite,
      etudiant_nom,
      etudiant_prenom,
      etudiant_email,
      etudiant_annees_experience,
      etudiant_telephone,
      etudiant_adresse_ligne_1,
      etudiant_adresse_ligne_2,
      etudiant_code_postal,
      etudiant_ville,
      etudiant_niveau_etudes,
      tuteur_Id,
    } = req.body;


    const result = await studentModel.insertStudent({
      etudiant_num_carte_identite,
      etudiant_nom,
      etudiant_prenom,
      etudiant_email,
      etudiant_annees_experience,
      etudiant_telephone,
      etudiant_adresse_ligne_1,
      etudiant_adresse_ligne_2,
      etudiant_code_postal,
      etudiant_ville,
      etudiant_niveau_etudes,
      tuteur_Id,
    });

    res.status(201).json({
      success: true,
      message: "Étudiant créé avec succès",
      data: {
        etudiant_Id: result.id,
        etudiant_num_carte_identite,
        etudiant_nom,
        etudiant_prenom,
        etudiant_email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


async function getStudentById(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const student = await studentModel.getStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Étudiant non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateStudent(req, res) {
  try {
    const id = parseInt(req.params.id);
    const {
      etudiant_num_carte_identite,
      etudiant_nom,
      etudiant_prenom,
      etudiant_email,
      etudiant_annees_experience,
      etudiant_telephone,
      etudiant_adresse_ligne_1,
      etudiant_adresse_ligne_2,
      etudiant_code_postal,
      etudiant_ville,
      etudiant_niveau_etudes,
      tuteur_Id,
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    if (
      !etudiant_num_carte_identite ||
      !etudiant_nom ||
      !etudiant_prenom ||
      !etudiant_email ||
      !tuteur_Id
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Les champs etudiant_num_carte_identite, etudiant_nom, etudiant_prenom, etudiant_email et tuteur_Id sont obligatoires",
      });
    }

    const result = await studentModel.updateStudent(id, {
      etudiant_num_carte_identite,
      etudiant_nom,
      etudiant_prenom,
      etudiant_email,
      etudiant_annees_experience,
      etudiant_telephone,
      etudiant_adresse_ligne_1,
      etudiant_adresse_ligne_2,
      etudiant_code_postal,
      etudiant_ville,
      etudiant_niveau_etudes,
      tuteur_Id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Étudiant non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      message: "Étudiant mis à jour avec succès",
      data: {
        etudiant_Id: id,
        etudiant_nom,
        etudiant_prenom,
        etudiant_email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


async function getStudentsInCours(req, res) {
  try {
    const students = await studentModel.getStudentsInCours();
    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  getStudentsInCours,
};
