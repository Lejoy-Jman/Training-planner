import Localhost from '../../Http/http';

const adminApiService = {
  createTraining: async (trainingData) => {
    try {
      const response = await Localhost.post(
        `admin/admin`,
        trainingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchDeletedTrainings: async () => {
    try {
      const response = await Localhost.get(`admin/deleted_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  restoreTraining: async (trainingId) => {
    try {
      const response = await Localhost.post(`admin/restore`, { id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
  fetchUpcomingTrainings: async () => {
    try {
      const response = await Localhost.get(`admin/get_trainings`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTraining: async (trainingId) => {
    try {
      const response = await Localhost.post(`admin/dtrain`, { training_id: trainingId });
      return response;
    } catch (error) {
      throw error;
    }
  },
  requestList:async()=>{
    try{
      const response=await Localhost.get('/admin/view_request')
      return response
    }
    catch(e){
      throw(e)
    }
  }
};

export default adminApiService;
