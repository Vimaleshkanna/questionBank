const express = require('express')
const Resource = require('../model/resourcemodel')

const route = express.Router()

// get all based on page

route.get('/getResources/:page', async(req,res)=>{
 try {
    const page = parseInt(req.params.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const resources = await Resource.find().skip(skip).limit(limit);
    const totalCount = await Resource.countDocuments(); // ✅ await here

    res.status(200).json({ data: resources, totalCount });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: error.message });
  }
})


// create

route.post('/', async(req,res)=>{
    try {
        const resource = new Resource(req.body)
        const newResource = await resource.save()
        res.status(201).json(newResource)
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
})

//delete

route.delete("/:id", async (req, res) => {
    try {
      await Resource.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

//update

route.put("/:id", async (req, res) => {
    try {
      const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
module.exports = route