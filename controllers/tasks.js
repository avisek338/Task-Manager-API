const Task = require('../models/Task.js');
const getAllTasks = async(req,res)=>{
     try{
       const tasks = await Task.find({});
       res.status(200).json({tasks});
     }catch(e){
       res.status(500).json({msg:e});    
     }
}

const createTask = async(req,res)=>{
    try{
    const task = await Task.create(req.body);
    res.status(201).json({task}); 
    }catch(e){
        res.status(500).json({message:e});
    }
}

const getTask = async(req,res)=>{
   try{
      const taskID = req.params.id;
      const task = await Task.findOne({_id:taskID});
      if(!task){
        return  res.status(404).json({msg:'No task found with given id'})
      }
      res.status(200).json({task});
   }catch(e){
      res.status(500).json({msg:e}); 
   }
}

const updateTask = async(req,res)=>{
    try{
         const taskID = req.params.id;
         const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
         });
         if(!task){
            return res.satus(404).json({msg:'No task found with the given id'});
         }
        res.status(200).json({task}); 
    }catch(e){
        res.status(500).json({msg:e}); 
    }
}

const deleteTask = async(req,res)=>{
        try{
        const taskID = req.params.id
        const task =await Task.findOneAndDelete({_id:taskID}); 
        if(!task){
            return res.status(404).json({msg:'No task found with given id'})
        }
        res.status(200).json({task});
        }catch(e){
         res.status(500).json({msg:e});  
        }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}