import * as categoryService from "../services/categories.service.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Categoría no encontrada.",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.create(req.body.name);

    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body.name);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await categoryService.remove(req.params.id);

    res.status(200).json({
      message: "Categoría eliminada correctamente.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
