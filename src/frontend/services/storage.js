import { z } from "zod";

const keySchema = z.string();
const stoarageObjectSchema = z.object();
const valueSchema = z.any();

function getFromStorage(storageObject, key) {
  try {
    stoarageObjectSchema.parse(storageObject);
    keySchema.parse(key);
  } catch (error) {
    console.error(error);
    return;
  }

  const rawValue = storageObject.getItem?.(key);

  try {
    return JSON.parse(rawValue);
  } catch {
    return rawValue;
  }
}

function sendToStorage(storageObject, key, value) {
  try {
    stoarageObjectSchema.parse(storageObject);
    keySchema.parse(key);
    valueSchema.parse(value);
  } catch (error) {
    console.error(error);
    return false;
  }

  const encodedValue = JSON.stringify(value);

  storageObject.setItem?.(key, encodedValue);
  return true;
}

function deleteFromStorage(storageObject, key) {
  try {
    stoarageObjectSchema.parse(storageObject);
    keySchema.parse(key);
  } catch (error) {
    console.error(error);
    return false;
  }

  storageObject.removeItem(key);
  return true;
}

function buildStorageProxy(storageObject) {
  return new Proxy({}, {
    get(_, property) {
      return getFromStorage(storageObject, property);
    },
    set(_, property, value) {
      return sendToStorage(storageObject, property, value);
    },
    deleteProperty(_, property) {
      return deleteFromStorage(storageObject, property);
    }
  });
}

export const LocalStorage = buildStorageProxy(window.localStorage);
export const SessionStorage = buildStorageProxy(window.sessionStorage);