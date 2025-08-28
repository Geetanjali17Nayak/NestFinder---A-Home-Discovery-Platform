import express from "express"
import { addProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty, searchProperties,getOwnerProperties } from "../controllers/property.controller.js"
import { auth } from "../middlewares/auth.middleware.js";



const propertyRouter=express.Router();

propertyRouter.post("/addProperty",auth,addProperty);
propertyRouter.get("/getAllProperties",getAllProperties);
propertyRouter.get("/getPropertyById/:id",getPropertyById);
propertyRouter.patch("/updateProperty/:id",updateProperty);
propertyRouter.delete("/deleteProperty/:id",deleteProperty);
propertyRouter.get("/searchProperties",searchProperties);
propertyRouter.get("/getOwnerProperties",auth,getOwnerProperties);


export default propertyRouter;