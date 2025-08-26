import Property from "../models/property.model.js";

// Add new property
export const addProperty = async (req, res) => {
  try {
    const newProperty = new Property({ ...req.body, owner: req.user._id });
    await newProperty.save();
    return res.status(201).json(newProperty);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get all properties

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

//Get property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

//Update property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(property);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//Delete property

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//serach properties

export const searchProperties = async (req, res) => {
  try {
    const {
      location,
      priceMin,
      priceMax,
      type,
      page = 1,
      limit = 10,
    } = req.query;
    let filter = {};
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (type) {
      filter.type = type;
    }
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) {
        filter.price = { $gte: parseInt(priceMin) };
      }
      if (priceMax) {
        filter.price = { $lte: parseInt(priceMax) };
      }
    }
    //pagination
    const skip = (Number(page) - 1) * Number(limit);
    const properties = await Property.find(filter).skip(skip).limit(limit);

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
