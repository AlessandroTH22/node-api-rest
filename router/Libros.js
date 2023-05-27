const express = require("express");
const libro = require("../models/libro");

const router = express.Router();


/*Obtener todos los documentos directamente de la base de datos de mongo */
router.get("/", async(req, res) =>{

    try {
        const arrayLibrosDB = await libro.find();
        /* console.log(arrayLibrosDB); */
        res.json(arrayLibrosDB)
        
    } catch (error) {
        console.log(error);
    }
});


/* Para obtener un solo libro de la base de datos*/
router.get("/:id", async(req, res) => {
    const id = req.params.id;

    try{
        const arrayLibrosDB = await libro.find({isbn:id});
        console.log(arrayLibrosDB);
        res.json(arrayLibrosDB)

    } catch (error){
        console.log(error);
    }
});

/* Para insertar un documento en la base de datos de Mongo*/

router.post("/", async(req, res) => {
    const body = req.body;

    try {
        await libro.create(body);
        res.json({estado: "Libro creado exitosamente" });
    } catch (error) {
        console.log(error);
    }

});

/* Para eliminar un documento de la base de datos de mongo*/
router.delete ("/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        const libroDB = await libro.findOneAndDelete({isbn:id});
        if(libroDB){
            res.json({
                estado:true,
                mensaje: "libro eliminado"
            })
        } else{
            res.json({
                estado:false,
                mensaje: "No se pudo eliminar el libro solicitado"
    
            })
        }
        
    } catch (error) {
        console.log(error);    
        
    }

});
router.put("/:id", async(req,res)=>{
    const id = req.params.id;
    const body = req.body;

    try {
        const libroDB = await libro.findOneAndUpdate({isbn:id}, body, {useFindAndModify:false});

        res.json({
            estado:true,
            mensaje: "El libro ha sido actualizado con exito"
        })
        
    } catch (error) {
        console.log(error)

        res.json({
            estado:false,
            mensaje: "Los datos del libro no fueron actualizados"
        })
        
    }
});


module.exports = router;