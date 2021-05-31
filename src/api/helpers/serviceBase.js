import api from "../api";
import getAuthToken from "./getAuthToken";

export const getAll = async (entityType) => {
  try {
    const res = await api.get(`/${entityType}/`, {
      headers: getAuthToken(),
    });
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const get = async (entityType, entityId) => {
  try {
    const res = await api.get(`/${entityType}/${entityId}`, {
      headers: getAuthToken(),
    });
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const create = async (entityType, entity) => {
  try {
    const res = await api.post(`/${entityType}`, entity, {
      headers: getAuthToken(),
    });
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const update = async (entityType, entity) => {
  try {
    const res = await api.put(`/${entityType}`, entity, {
      headers: getAuthToken(),
    });
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const remove = async (entityType, entityId) => {
  try {
    const res = await api.delete(`/${entityType}/${entityId}`, {
      headers: getAuthToken(),
    });
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
