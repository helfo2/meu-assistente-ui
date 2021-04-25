import api from "../API";
import getAuthToken from "./useAccessTokenInHeader";

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
    const res = await api.post(
      `/${entityType}`,
      {
        headers: getAuthToken(),
      },
      entity
    );
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const update = async (entityType, entity) => {
  try {
    const res = await api.put(
      `/${entityType}/${entity.id}`,
      {
        headers: getAuthToken(),
      },
      entity
    );
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};

export const remove = async (entityType, entityId) => {
  try {
    const res = await api.remove(`/${entityType}/${entityId}, {
      headers: useAccessTokenInHeader(),
    }`);
    return res.data;
  } catch (ex) {
    console.log(ex);
    throw ex;
  }
};
