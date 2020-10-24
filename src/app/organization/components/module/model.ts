export class modelForModules{
    modules : string[] = ['E Fees', 'E Exam', 'E Library', 'E Organization']
    constructor(){
        
    }

    postModules(id, module){
    
        this.modules[id] = module
        
    }
    
    getModules(){
       
        return this.modules
    }
}