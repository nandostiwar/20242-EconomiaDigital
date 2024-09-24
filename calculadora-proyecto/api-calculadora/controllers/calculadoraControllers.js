 

function fascendente(req, res) {
    const { body } = req;
    const { ...selectedValues } = body;

    console.log(typeof selectedValues)
   const objecArray = Object.values(selectedValues);

   console.log(objecArray)
    const orden = objecArray.sort((a,b) => parseInt(a) - parseInt(b));
    const resultado = orden.join(', ');
    console.log("ascendente"+""+orden)
    
    res.json(resultado);
}

function fdescendente(req, res) {
    const { body } = req;
    const { ...selectedValues  } = body;

    const objecArray1 = Object.values(selectedValues);

 
     const orden1 = objecArray1.sort((a,b) => parseInt(b) - parseInt(a));

     const resultado = orden1.join(', ');
     console.log("descendente"+" "+orden1)

    res.json(resultado);
}



module.exports = {
    fascendente,
    fdescendente
}