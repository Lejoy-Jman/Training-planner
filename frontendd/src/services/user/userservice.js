import Localhost from '../../Http/http';

const userapiService = {
  fetchUserData: async (user_id) => {
    try {
      const response = await Localhost.get(`users/get/${user_id}`);
      console.log("fetch userdata",response)
      return response;
    } catch (error) {
      throw error;
    }
  },

  fetchRegisteredUserData: async (user_id) => {
    try {
      console.log(user_id)
      const response = await Localhost.get(`users/view_trainings/${user_id}`);
      return response;
    } catch (error) {
      console.log(error)
      throw error;
    }
  },
  registerTraining:async (data)=>{
    try{
      debugger
      const response=await Localhost.post('users/register',data);
      console.log("asddfddf",response)
      return response
    }
    catch(error){
      throw(error)
    }
  },
  unregisterTraining: async(data)=>{
    try{
      const response=await Localhost.put('users/unregister',data)
      
      return response
    }
    catch(e)
    {
      throw(e)
    }
  },
  feedback:async(data)=>{
    try{
     
      const feedback=await Localhost.post('users/request',data)
      return feedback
    }
    catch(e)
    {
      throw(e)
    }
  }
};

export default userapiService;
