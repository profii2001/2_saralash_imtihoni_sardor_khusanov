

const getServices = async () => {
  try {
    const services = await Service.find();
    return services;
  } catch (error) {
    throw new Error('Error while fetching services');
  }
};

const createService = async (name, description, price) => {
  try {
    if (!name || !description || !price) {
      throw new Error('All fields are mandatory');
    }

    const service = await Service.create({
      name,
      description,
      price,
    });

    return service;
  } catch (error) {
    throw new Error('Error while creating service');
  }
};

const getServiceById = async (serviceId) => {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    return service;
  } catch (error) {
    throw new Error('Error while fetching service');
  }
};

const deleteService = async (serviceId) => {
  try {
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    await Service.deleteOne({ _id: serviceId });
  } catch (error) {
    throw new Error('Error while deleting service');
  }
};

module.exports = {
  getServices,
  createService,
  getServiceById,
  deleteService,
};
