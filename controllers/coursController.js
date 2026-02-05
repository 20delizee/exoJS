import * as courseModel from "../models/courseModel.js";

async function getAllCours(req, res) {
  try {
    const courses = await courseModel.getAllCours();
    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function createCours(req, res) {
  try {
    const {
      cours_numero_semaine,
      cours_thematique,
      cours_taux_horaire,
      cours_total_heures_semaine,
      discipline_Id,
      intervenant_siret,
      salle_Id,
    } = req.body;

    if (!discipline_Id || !intervenant_siret || !salle_Id) {
      return res.status(400).json({
        success: false,
        message:
          "Les champs discipline_Id, intervenant_siret et salle_Id sont obligatoires",
      });
    }

    const result = await courseModel.insertCours({
      cours_numero_semaine,
      cours_thematique,
      cours_taux_horaire,
      cours_total_heures_semaine,
      discipline_Id,
      intervenant_siret,
      salle_Id,
    });

    res.status(201).json({
      success: true,
      message: "Cours créé avec succès",
      data: {
        cours_Id: result.id,
        cours_thematique,
        cours_numero_semaine,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getCoursById(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    const course = await courseModel.getCoursById(id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function updateCours(req, res) {
  try {
    const id = parseInt(req.params.id);
    const {
      cours_numero_semaine,
      cours_thematique,
      cours_taux_horaire,
      cours_total_heures_semaine,
      discipline_Id,
      intervenant_siret,
      salle_Id,
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "ID invalide",
      });
    }

    if (!discipline_Id || !intervenant_siret || !salle_Id) {
      return res.status(400).json({
        success: false,
        message:
          "Les champs discipline_Id, intervenant_siret et salle_Id sont obligatoires",
      });
    }

    const result = await courseModel.updateCours(id, {
      cours_numero_semaine,
      cours_thematique,
      cours_taux_horaire,
      cours_total_heures_semaine,
      discipline_Id,
      intervenant_siret,
      salle_Id,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Cours non trouvé",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cours mis à jour avec succès",
      data: {
        cours_Id: id,
        cours_thematique,
        cours_numero_semaine,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export { getAllCours, createCours, getCoursById, updateCours};